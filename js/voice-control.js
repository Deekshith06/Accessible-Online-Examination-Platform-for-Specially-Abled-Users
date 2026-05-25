// ============================================================
// AccessExam – Voice Control Engine  (Clean Definitive Build)
// ============================================================
//
// ARCHITECTURE:
//   • Recognition is NEVER aborted. It runs continuously.
//   • isSpeaking flag drops all mic results during TTS.
//   • Time-based echo guard (800 ms) blocks results just after TTS.
//   • Generation counter (_uttGen) fixes the speechSynthesis.cancel()
//     race: when speak() cancels the previous utterance, its onend
//     fires with a stale generation and is ignored.
//   • Safety timeout (per-utterance) forces-finishes TTS if Chrome
//     freezes and onend never fires (the "stops after Q2" bug).
//   • recognition.onend auto-restarts ONLY when not speaking;
//     speak().finish() restarts recognition after TTS ends.
// ============================================================

const VoiceControl = {
  recognition:     null,
  recognizing:     false,
  isSpeaking:      false,
  currentCallback: null,
  activeCategory:  'exam',
  pendingRestart:  false,
  ttsEndTime:      0,
  ECHO_MS:         50,   // ignore mic for this many ms after TTS ends (reduced to 50ms for no gaps)
  _uttGen:         0,     // increments each speak() call; stale onend ignored

  // ----------------------------------------------------------------
  initRecognition() {
    if (this.recognition) return true;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { console.warn('[VC] SpeechRecognition not supported'); return false; }

    this.recognition = new SR();
    this.recognition.continuous     = true;
    this.recognition.interimResults  = false;
    this.recognition.maxAlternatives = 5;
    this.recognition.lang            = 'en-US';

    // Grammar hint (ignored if not supported)
    try {
      const SGL = window.SpeechGrammarList || window.webkitSpeechGrammarList;
      if (SGL) {
        const g = '#JSGF V1.0; grammar cmd; public <cmd> = ' +
          'a | b | c | d | option a | option b | option c | option d | ' +
          'select a | select b | select c | select d | ' +
          'next | previous | back | repeat | submit | finish | done | ' +
          'yes | no | cancel ;';
        const list = new SGL();
        list.addFromString(g, 1);
        this.recognition.grammars = list;
      }
    } catch(e) {}

    // ---- recognition lifecycle ----

    this.recognition.onstart = () => {
      this.recognizing = true;
      this.pendingRestart = false;
      console.log('[VC] 🎤 Mic started');
      if (typeof playBeep === 'function') playBeep();
    };

    this.recognition.onresult = (e) => {
      const res  = e.results[e.results.length - 1];
      const alts = [];
      for (let i = 0; i < res.length; i++) alts.push(res[i].transcript.trim());
      const best = alts[0] || '';

      // Drop while TTS is actively speaking
      if (this.isSpeaking) {
        console.log('[VC] Dropped (speaking):', best);
        return;
      }

      // Drop if within post-TTS echo guard window
      const ms = Date.now() - this.ttsEndTime;
      if (ms < this.ECHO_MS) {
        console.log(`[VC] Dropped (echo ${ms}ms):`, best);
        return;
      }

      console.log('[VC] ✅ Heard:', alts);
      this.handleTranscripts(alts);
    };

    this.recognition.onerror = (e) => {
      console.log('[VC] Error:', e.error);
      if (e.error === 'not-allowed') {
        console.warn('[VC] Mic access denied');
        this.recognizing    = false;
        this.pendingRestart = false;
      }
      // no-speech / aborted / network → let onend handle restart
    };

    this.recognition.onend = () => {
      this.recognizing = false;
      console.log('[VC] Mic ended, isSpeaking=', this.isSpeaking);

      if (this.pendingRestart) return;

      // If TTS is playing, don't restart yet — speak().finish() will do it
      if (this.isSpeaking) {
        console.log('[VC] Skipping restart (TTS active)');
        return;
      }

      const dis    = localStorage.getItem('accessExam_disability') || 'none';

      if (dis === 'visual' && this.currentCallback) {
        this.pendingRestart = true;
        setTimeout(() => {
          this.pendingRestart = false;
          if (!this.recognizing && !this.isSpeaking) {
            console.log('[VC] 🔄 Auto-restarting mic...');
            try { this.recognition.start(); } catch(err) {}
          }
        }, 50); // reduced restart gap
      }
    };
  },

  // ----------------------------------------------------------------
  startListening(category, callback) {
    this.activeCategory  = category || this.activeCategory;
    this.currentCallback = callback;
    this.pendingRestart  = false;
    const ready = this.initRecognition();
    if (!ready) return false;

    if (!this.recognizing) {
      try {
        this.recognition.start();
      } catch(err) {
        console.warn('[VC] recognition.start() failed', err);
        try { this.recognition.stop(); } catch(e) {}
        setTimeout(() => {
          try { this.recognition.start(); } catch(err2) {
            console.warn('[VC] recognition retry failed', err2);
          }
        }, 250);
      }
    }
    return true;
  },

  stopListening() {
    this.currentCallback = null;
    this.pendingRestart = false;
    if (this.recognition && this.recognizing) {
      try { this.recognition.stop(); } catch(err) {
        console.warn('[VC] recognition.stop() failed', err);
      }
    }
  },

  // ----------------------------------------------------------------
  // speak() — TTS engine with generation counter and safety timeout.
  speak(text, onEnd) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Increment generation BEFORE cancel so stale onend is ignored
    this._uttGen++;
    const myGen = this._uttGen;

    this.isSpeaking = true;
    this._speakStartTime = Date.now();
    
    // Explicitly abort microphone to prevent Chrome from silently hanging
    // the recognizer after speech synthesis (a known Webkit bug).
    if (this.recognition && this.recognizing) {
      try { this.recognition.abort(); } catch(e) {}
    }

    speechSynthesis.cancel();   // stop any previous utterance

    const u  = new SpeechSynthesisUtterance(text);
    u.rate   = 1.00; // standard speed (1.00 instead of 0.88 for snappier experience)
    u.pitch  = 1.00;
    u.volume = 1.00;
    u.lang   = 'en-US';

    const ring = document.getElementById('tts-ring');

    // finish() is called by onend, onerror, OR the safety timeout.
    // The generation guard ensures only ONE of them actually runs.
    let finished = false;
    const finish = () => {
      if (this._uttGen !== myGen) return; // stale — another speak() started
      if (finished) return;               // already ran (double-call guard)
      finished = true;

      this.isSpeaking = false;
      this.ttsEndTime = Date.now();
      if (ring) ring.classList.remove('show');

      console.log('[VC] 🔊 TTS done, restarting mic in', this.ECHO_MS, 'ms');

      // Restart recognition after the echo guard window
      if (this.currentCallback && !this.pendingRestart) {
        this.pendingRestart = true;
        setTimeout(() => {
          this.pendingRestart = false;
          if (!this.recognizing) {
            try { this.recognition && this.recognition.start(); } catch(err) {}
          }
        }, this.ECHO_MS);
      }

      if (onEnd) onEnd();
    };

    // Safety timeout — Chrome sometimes never fires onend (the "freeze" bug).
    // Estimate: ~350ms per word + 5s buffer, minimum 8s.
    const wordCount = text.split(/\s+/).length;
    const safetyMs  = Math.max(8000, wordCount * 350 + 5000);
    const safetyTimerId = setTimeout(() => {
      if (this._uttGen === myGen && this.isSpeaking && !finished) {
        console.warn('[VC] ⚠️ TTS safety timeout fired! Forcing finish.');
        speechSynthesis.cancel();
        wrapperFinish();
      }
    }, safetyMs);

    // Chrome bug workaround: periodically resume to keep long utterances alive
    const resumeInterval = setInterval(() => {
      if (!finished && speechSynthesis.speaking) {
        speechSynthesis.resume();
      } else {
        clearInterval(resumeInterval);
      }
    }, 10000);

    const wrapperFinish = () => {
      clearTimeout(safetyTimerId);
      clearInterval(resumeInterval);
      finish();
    };

    u.onstart = () => { if (ring) ring.classList.add('show'); };
    u.onend   = wrapperFinish;
    u.onerror = (err) => { console.error('[VC] TTS error:', err.error); wrapperFinish(); };

    speechSynthesis.speak(u);
    console.log('[VC] 🔊 Speaking:', text.substring(0, 80) + (text.length > 80 ? '…' : ''));
  },

  cancelSpeech() {
    this._uttGen++;       // invalidate any running utterance
    this.isSpeaking  = false;
    this.ttsEndTime  = Date.now();
    speechSynthesis.cancel();
    const ring = document.getElementById('tts-ring');
    if (ring) ring.classList.remove('show');
    
    // Restart recognition immediately since we manually cancelled
    if (this.currentCallback && !this.pendingRestart) {
      this.pendingRestart = true;
      setTimeout(() => {
        this.pendingRestart = false;
        if (!this.recognizing) {
          try { this.recognition && this.recognition.start(); } catch(err) {}
        }
      }, 100);
    }
  },

  // ================================================================
  // COMMAND MATCHERS
  // ================================================================

  matchLetterOption(c) {
    c = ' ' + c.trim().toLowerCase() + ' ';
    if (/\b(option a|select a|choose a|answer a|first|one|1|apple|alpha)\b/.test(c) ||
        /\b(a|eh|ay|hey)\b/.test(c)) return 0;
    if (/\b(option b|select b|choose b|answer b|second|two|2|bravo|boy)\b/.test(c) ||
        /\b(b|be|bee)\b/.test(c)) return 1;
    if (/\b(option c|select c|choose c|answer c|third|three|3|charlie|cat)\b/.test(c) ||
        /\b(c|see|sea|she)\b/.test(c)) return 2;
    if (/\b(option d|select d|choose d|answer d|fourth|four|4|delta|dog)\b/.test(c) ||
        /\b(d|dee)\b/.test(c)) return 3;
    return -1;
  },

  matchNavigationCommand(c) {
    c = ' ' + c.trim().toLowerCase() + ' ';
    if (/\b(repeat|read|again|say again)\b/.test(c))                                return 'repeat';
    if (/\b(submit|finish|end|done|complete|confirm|submit exam)\b/.test(c))        return 'submit';
    if (/\b(next|forward|go next|continue|skip|next question)\b/.test(c))           return 'next';
    if (/\b(previous|prev|back|go back|previous question)\b/.test(c))               return 'previous';
    return null;
  },

  matchYesNoCommand(c) {
    c = ' ' + c.trim().toLowerCase() + ' ';
    if (/\b(yes|yeah|ok|okay|sure|yup|confirm|go ahead)\b/.test(c)) return 'yes';
    if (/\b(no|nah|cancel|stop|dont|don't)\b/.test(c))              return 'no';
    return null;
  },

  matchDisabilitySelection(c) {
    c = ' ' + c.trim().toLowerCase() + ' ';
    if (/\b(visual|eye|blind|low vision)\b/.test(c))    return 'visual';
    if (/\b(hearing|deaf|ear)\b/.test(c))               return 'hearing';
    if (/\b(motor|hand|wheelchair)\b/.test(c))          return 'motor';
    if (/\b(none|no disability|normal)\b/.test(c))      return 'none';
    return null;
  },

  matchDisabilityAction(c) {
    c = ' ' + c.trim().toLowerCase() + ' ';
    if (/\b(continue|login|next|proceed|go)\b/.test(c)) return 'continue';
    if (/\b(change|select|choose|edit)\b/.test(c))      return 'change';
    return null;
  },

  matchWelcomeCommand(c) {
    c = ' ' + c.trim().toLowerCase() + ' ';
    if (/\b(login|sign in|log in)\b/.test(c))           return 'login';
    if (/\b(register|create account|sign up)\b/.test(c)) return 'register';
    return null;
  },

  matchDashboardAction(c) {
    c = ' ' + c.trim().toLowerCase() + ' ';
    if (/\b(start|join|test|exam|take exam|start exam)\b/.test(c)) return 'start';
    if (/\b(logout|exit|log out|sign out)\b/.test(c))              return 'logout';
    return null;
  },

  matchResultAction(c) {
    c = ' ' + c.trim().toLowerCase() + ' ';
    if (/\b(dashboard|home|go to dashboard)\b/.test(c)) return 'dashboard';
    if (/\b(retake|again|restart)\b/.test(c))           return 'retake';
    if (/\b(logout|exit|sign out|log out)\b/.test(c))   return 'logout';
    if (/\b(repeat|read again|say again)\b/.test(c))    return 'repeat';
    return null;
  },

  // ================================================================
  // TRANSCRIPT PROCESSING
  // ================================================================
  handleTranscripts(alternatives) {
    let cmd = null, val = null, best = '';

    for (const raw of alternatives) {
      const c = raw.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '').trim();
      if (!c) continue;
      if (!best) best = c;

      const cat = this.activeCategory;

      if (cat === 'exam' || cat === 'all') {
        // Navigation FIRST (higher priority — avoids 'next' matching letter 'n')
        const nav = this.matchNavigationCommand(c);
        if (nav) { cmd = nav; break; }
        // Letter selection
        const opt = this.matchLetterOption(c);
        if (opt >= 0) { cmd = 'option'; val = opt; break; }
      }

      if (cat === 'yes_no' || cat === 'all') {
        const yn = this.matchYesNoCommand(c);
        if (yn) { cmd = yn; break; }
      }

      if (cat === 'disability' || cat === 'all') {
        const profile = this.matchDisabilitySelection(c);
        if (profile) { cmd = 'profile'; val = profile; break; }
        const action = this.matchDisabilityAction(c);
        if (action) { cmd = action; break; }
      }

      if (cat === 'welcome' || cat === 'all') {
        const auth = this.matchWelcomeCommand(c);
        if (auth) { cmd = auth; break; }
      }

      if (cat === 'dashboard' || cat === 'all') {
        const dash = this.matchDashboardAction(c);
        if (dash) { cmd = dash; break; }
      }

      if (cat === 'result' || cat === 'all') {
        const res = this.matchResultAction(c);
        if (res) { cmd = res; break; }
      }
    }

    if (!this.currentCallback) return;

    if (cmd === 'option')       this.currentCallback({ command: 'option',  value: val,  raw: best });
    else if (cmd === 'profile') this.currentCallback({ command: 'profile', value: val,  raw: best });
    else if (cmd)               this.currentCallback({ command: cmd,                    raw: best });
    else                        this.currentCallback({ command: 'raw',     value: best, raw: best });
  },

  // ================================================================
  // FIELD NORMALIZATION
  // ================================================================
  normalizeEmail(text) {
    const digits = {zero:'0',one:'1',two:'2',three:'3',four:'4',
                    five:'5',six:'6',seven:'7',eight:'8',nine:'9'};
    let c = text.toLowerCase()
      .replace(/\s*at\s*/g,'@').replace(/\s*dot\s*/g,'.')
      .replace(/\s*dash\s*/g,'-').replace(/\s*underscore\s*/g,'_');
    for (const [w,d] of Object.entries(digits))
      c = c.replace(new RegExp('\\b'+w+'\\b','g'), d);
    return c.replace(/\s+/g,'');
  },

  normalizePassword(text) {
    const digits = {zero:'0',one:'1',two:'2',three:'3',four:'4',
                    five:'5',six:'6',seven:'7',eight:'8',nine:'9'};
    let c = text;
    for (const [w,d] of Object.entries(digits))
      c = c.replace(new RegExp('\\b'+w+'\\b','g'), d);
    return c.replace(/\s+/g,'');
  },
};
