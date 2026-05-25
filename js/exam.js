// ===== DISABILITY MODE =====
const disability   = localStorage.getItem('accessExam_disability') || 'none';
const isVisual     = disability === 'visual';
const isMotor      = disability === 'motor';
const voiceEnabled = localStorage.getItem('accessExam_voiceInput') === 'true';

// ===== EXAM DATA SETS =====
const examsData = {
  gk: {
    title: "General Knowledge Test",
    baseTime: 3600, // 60 minutes
    questions: [
      { id:1,  text:"What is the capital city of India?",               options:["New Delhi","Mumbai","Chennai","Kolkata"] },
      { id:2,  text:"Which planet is known as the Red Planet?",         options:["Venus","Mars","Jupiter","Saturn"] },
      { id:3,  text:"Who wrote the Indian national anthem?",            options:["Rabindranath Tagore","Bankim Chandra","Mahatma Gandhi","Sarojini Naidu"] },
      { id:4,  text:"What is the chemical formula for water?",          options:["H2O","CO2","NaCl","O2"] },
      { id:5,  text:"How many states are there in India (as of 2024)?", options:["28","29","30","27"] },
      { id:6,  text:"What is the largest ocean on Earth?",              options:["Atlantic","Indian","Arctic","Pacific"] },
      { id:7,  text:"Who is known as the Father of the Nation in India?", options:["Jawaharlal Nehru","B.R. Ambedkar","Mahatma Gandhi","Sardar Patel"] },
      { id:8,  text:"Which is the longest river in the world?",         options:["Amazon","Nile","Yangtze","Mississippi"] },
      { id:9,  text:"What is the speed of light (approx)?",             options:["3×10⁸ m/s","3×10⁶ m/s","1.5×10⁸ m/s","9×10⁸ m/s"] },
      { id:10, text:"In which year did India gain independence?",       options:["1947","1950","1945","1942"] },
      { id:11, text:"Which is the smallest continent?",                 options:["Europe","Antarctica","Australia","South America"] },
      { id:12, text:"What does CPU stand for?",                         options:["Central Processing Unit","Computer Power Unit","Core Processing Unit","Central Program Utility"] },
      { id:13, text:"How many bones are in the adult human body?",      options:["206","208","196","210"] },
      { id:14, text:"What is the national animal of India?",            options:["Lion","Elephant","Tiger","Peacock"] },
      { id:15, text:"Which gas do plants absorb during photosynthesis?",options:["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"] },
      { id:16, text:"Who invented the telephone?",                      options:["Thomas Edison","Alexander Graham Bell","Nikola Tesla","James Watt"] },
      { id:17, text:"What is the square root of 144?",                  options:["11","12","13","14"] },
      { id:18, text:"Which is the currency of Japan?",                  options:["Yuan","Won","Yen","Ringgit"] },
      { id:19, text:"How many primary colors are there?",               options:["2","3","4","5"] },
      { id:20, text:"What is the hardest natural substance on Earth?",  options:["Gold","Iron","Diamond","Quartz"] }
    ],
    correctAnswers: [0,1,0,0,0,3,2,1,0,0,2,0,0,2,2,1,1,2,1,2]
  },
  math: {
    title: "Mathematics Basics",
    baseTime: 2700, // 45 minutes
    questions: [
      { id:1,  text:"What is 5 + 7?", options: ["12", "10", "11", "13"] },
      { id:2,  text:"What is 12 multiplied by 8?", options: ["96", "84", "88", "104"] },
      { id:3,  text:"Solve: 15 - (6 + 3)", options: ["6", "9", "8", "5"] },
      { id:4,  text:"What is the square of 15?", options: ["225", "200", "150", "250"] },
      { id:5,  text:"What is the approximate value of Pi?", options: ["3.14", "2.71", "1.62", "1.41"] },
      { id:6,  text:"What is the square root of 64?", options: ["8", "6", "7", "9"] },
      { id:7,  text:"What is 100 divided by 4?", options: ["25", "20", "30", "15"] },
      { id:8,  text:"If a triangle has sides of length 3, 4, and 5, what type of triangle is it?", options: ["Right-angled", "Equilateral", "Isosceles", "Obtuse"] },
      { id:9,  text:"Solve for x: 2x + 5 = 15", options: ["5", "10", "8", "3"] },
      { id:10, text:"What is 9 multiplied by 9?", options: ["81", "72", "90", "89"] },
      { id:11, text:"What is the first prime number after 7?", options: ["11", "9", "8", "13"] },
      { id:12, text:"What is 50% of 250?", options: ["125", "100", "150", "75"] },
      { id:13, text:"If a circle has a radius of 7 cm, what is its approximate circumference?", options: ["44 cm", "22 cm", "14 cm", "88 cm"] },
      { id:14, text:"What is the sum of angles in a triangle?", options: ["180 degrees", "90 degrees", "360 degrees", "270 degrees"] },
      { id:15, text:"What is 2 to the power of 5?", options: ["32", "16", "64", "8"] }
    ],
    correctAnswers: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  },
  english: {
    title: "English Comprehension",
    baseTime: 5400, // 90 minutes
    questions: [
      { id:1,  text:"Select the antonym of the word 'Happy'.", options: ["Sad", "Joyful", "Excited", "Cheerful"] },
      { id:2,  text:"Select the synonym of the word 'Quick'.", options: ["Fast", "Slow", "Heavy", "Dark"] },
      { id:3,  text:"Choose the correct spelling:", options: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"] },
      { id:4,  text:"Fill in the blank: She ___ to school every day.", options: ["goes", "go", "going", "gone"] },
      { id:5,  text:"Identify the noun in the sentence: 'The dog barked loudly.'", options: ["dog", "barked", "loudly", "The"] },
      { id:6,  text:"What is the past tense of the verb 'run'?", options: ["ran", "runned", "running", "runs"] },
      { id:7,  text:"Choose the sentence with correct punctuation:", options: ["Wow! That is beautiful.", "Wow, that is beautiful!", "Wow that is beautiful!", "Wow, that is beautiful?"] },
      { id:8,  text:"Identify the adjective in the sentence: 'He wore a blue shirt.'", options: ["blue", "shirt", "wore", "He"] },
      { id:9,  text:"Fill in the blank: Neither of the boys ___ present.", options: ["was", "were", "are", "been"] },
      { id:10, text:"What is a person who writes books called?", options: ["Author", "Painter", "Actor", "Sculptor"] },
      { id:11, text:"Select the synonym of 'Difficult'.", options: ["Hard", "Easy", "Simple", "Soft"] },
      { id:12, text:"Select the antonym of 'Brave'.", options: ["Cowardly", "Strong", "Fearless", "Bold"] },
      { id:13, text:"Choose the correct spelling:", options: ["Receive", "Recieve", "Receve", "Recive"] },
      { id:14, text:"Fill in the blank: They ___ playing football yesterday.", options: ["were", "was", "are", "is"] },
      { id:15, text:"Identify the verb in: 'The bird sings in the morning.'", options: ["sings", "bird", "morning", "bird sings"] },
      { id:16, text:"What is the plural of 'child'?", options: ["children", "childs", "childrens", "childes"] },
      { id:17, text:"Choose the correct prefix to make 'happy' negative:", options: ["un", "im", "in", "dis"] },
      { id:18, text:"Identify the adverb in: 'She walked slowly.'", options: ["slowly", "walked", "She", "walked slowly"] },
      { id:19, text:"Fill in the blank: I have been waiting here ___ two hours.", options: ["for", "since", "from", "during"] },
      { id:20, text:"What does the idiom 'piece of cake' mean?", options: ["Very easy", "Delicious food", "A birthday celebration", "Very hard"] }
    ],
    correctAnswers: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  }
};

// Load selected exam
const currentExam   = localStorage.getItem('accessExam_currentExam') || 'gk';
const examData      = examsData[currentExam] || examsData.gk;
const questions     = examData.questions;
const correctAnswers = examData.correctAnswers;
const examTitle     = examData.title;

let currentQ       = 0;
let answers        = new Array(questions.length).fill(-1);
let ttsEnabled     = isVisual;

let timerSeconds = examData.baseTime;
if (isVisual) {
  timerSeconds += 1800; // Extra 30 minutes for visually impaired
}

let timerInterval;
let paused         = false;
let voiceAnswerRecognition = null;
let voiceRecognizing       = false;
let inSubmitModal          = false;

// ===== DYNAMIC BEEP GENERATOR =====
function playBeep() {
  if (disability === 'hearing') return; // no sound for hearing profile
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {}
}

// ===== TTS ENGINE =====
function speakText(text, onEnd) {
  if (!ttsEnabled) {
    if (onEnd) onEnd();
    return;
  }
  VoiceControl.speak(text, onEnd);
}

// ===== INIT =====
function init() {
  document.title = `${examTitle} – AccessExam`;
  const titleBar = document.querySelector('.exam-title-bar');
  if (titleBar) titleBar.textContent = examTitle;
  const topbarInfo = document.querySelector('.exam-topbar div div:last-child');
  if (topbarInfo) topbarInfo.textContent = `${questions.length} Questions • MCQ`;

  applyDisabilityMode();
  buildQNav();
  renderQuestion(0);
  startTimer();

  if (isVisual) {
    injectBlindOverlay();         // add the full-screen blind HUD
    bindVisualVoiceGestureStart();
    
    // We shouldn't start voice recognition or TTS until the user interacts.
    // However, to prompt them, we'll try a short standard beep and visually update the UI.
    updateBlindOverlay('listening', 'Press any key or tap to start exam');
    const startMsg = 'Press spacebar or any key to begin the exam and activate voice control.';
    
    // Try to speak the prompt (Chrome allows TTS without gesture sometimes)
    try {
      const u = new SpeechSynthesisUtterance(startMsg);
      speechSynthesis.speak(u);
    } catch(e) {}
    
    // The actual start of the exam loop (mic + question 1) happens in the gesture handler
  }
}

// ===== APPLY DISABILITY MODE =====
function applyDisabilityMode() {
  document.body.classList.remove('visual-mode', 'motor-mode', 'hearing-mode', 'high-contrast');

  if (isVisual) {
    ttsEnabled = true;
    const ttsBtn = document.getElementById('ex-tts');
    if (ttsBtn) ttsBtn.style.background = 'var(--bg-card2)';
    
    // Inject visual mode badge
    const topbar = document.querySelector('.exam-topbar');
    if (topbar) {
      const badge = document.createElement('div');
      badge.id = 'visual-mode-badge';
      badge.style.cssText = 'font-size:0.72rem;color:#c2cca6;background:var(--bg-card2);border:1px solid var(--primary);border-radius:8px;padding:3px 10px;display:flex;align-items:center;gap:5px;';
      badge.innerHTML = '🔊 Visual Mode';
      badge.setAttribute('aria-label', 'Visual accessibility mode is active');
      topbar.querySelector('.exam-controls-bar')?.prepend(badge);
    }
    document.body.classList.add('visual-mode');
  }
  if (disability === 'motor') {
    document.body.classList.add('motor-mode');
  } else if (disability === 'hearing') {
    document.body.classList.add('hearing-mode');
  }
  if (disability === 'high-contrast') {
    document.body.classList.add('high-contrast');
  }
}

// ===== QUESTION NAV =====
function buildQNav() {
  const grid = document.getElementById('qnav-grid');
  if (!grid) return;
  grid.innerHTML = '';
  questions.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'qnav-btn' + (i===0?' current':'') + (answers[i]>=0?' answered':'');
    btn.textContent = i+1;
    btn.setAttribute('aria-label', `Go to question ${i+1}`);
    btn.addEventListener('click', () => renderQuestion(i));
    grid.appendChild(btn);
  });
}

// ===== UPDATE QUESTION NAV STATE =====
function updateQNav() {
  const btns = document.querySelectorAll('.qnav-btn');
  btns.forEach((btn, i) => {
    btn.className = 'qnav-btn';
    if (i === currentQ)  btn.classList.add('current');
    if (answers[i] >= 0) btn.classList.add('answered');
  });
}

// ===== RENDER QUESTION =====
function renderQuestion(idx) {
  currentQ = idx;
  const q = questions[idx];
  const total = questions.length;
  const pct = Math.round(((idx+1)/total)*100);

  document.getElementById('q-progress-text').textContent = `Question ${idx+1} of ${total}`;
  document.getElementById('progress-fill').style.width = pct+'%';
  document.getElementById('progress-fill').parentElement.setAttribute('aria-valuenow', pct);

  const showVoice = voiceEnabled || isVisual || isMotor;

  const block = document.getElementById('question-block');
  block.innerHTML = `
    <div class="q-number-tag">Question ${idx+1}</div>
    <p class="q-text-main" id="q-main-text">${q.text}</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;">
      <button class="q-tts-btn" id="btn-read-q" onclick="speakQuestion(${idx})" aria-label="Read question aloud">
        🔊 Read Question
      </button>
      ${showVoice ? `
      <button class="q-tts-btn voice-ans-btn" id="btn-voice-answer" onclick="startVoiceAnswer(${idx})"
              aria-label="Speak your answer — say A, B, C or D" style="background:var(--bg-card2);border-color:var(--border);">
        🎤 Speak Answer
      </button>` : ''}
    </div>
    ${showVoice ? `<div id="voice-feedback" aria-live="polite" style="font-size:0.82rem;color:#c2cca6;min-height:20px;margin-bottom:8px;"></div>` : ''}
    <div class="options-list" role="radiogroup" aria-label="Answer options" id="options-list-${idx}">
      ${q.options.map((opt, oi) => `
        <label class="option-item${answers[idx]===oi?' selected':''}" tabindex="0"
          onkeydown="if(event.key==='Enter'||event.key===' '){selectAnswer(${idx},${oi})}">
          <input type="radio" name="q${idx}" value="${oi}"
            ${answers[idx]===oi?'checked':''} onchange="selectAnswer(${idx},${oi})"
            aria-label="Option ${String.fromCharCode(65+oi)}: ${opt}"/>
          <span class="option-label"><strong>${String.fromCharCode(65+oi)}.</strong> ${opt}</span>
        </label>
      `).join('')}
    </div>
  `;

  // Prev/Next buttons
  const prev = document.getElementById('btn-prev');
  const next = document.getElementById('btn-next');
  prev.disabled = idx === 0;
  prev.style.opacity = idx===0?'0.4':'1';

  next.textContent = 'Submit Exam ✓';
  next.className = 'btn-exam-nav btn-exam-submit';
  next.onclick = showSubmitModal;
  
  if (idx < total - 1) {
    next.textContent = 'Next →';
    next.className = 'btn-exam-nav btn-exam-next';
    next.onclick = () => renderQuestion(currentQ+1);
  }
  
  prev.onclick = () => renderQuestion(currentQ-1);
  updateQNav();

  if (isVisual) {
    updateBlindOverlay('speaking', `Q${idx+1}: ${q.text}`);
    speakQuestion(idx);
  }
}

// ===== OPTION TEXT MATCHING HELPER =====
function matchOptionText(transcript, options) {
  if (!transcript) return -1;
  
  const digitMap = { 
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4', 
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10' 
  };
  
  function normalize(str) {
    let s = str.toLowerCase();
    for (const [word, val] of Object.entries(digitMap)) {
      s = s.replace(new RegExp('\\b' + word + '\\b', 'g'), val);
    }
    return s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").replace(/\s+/g, ' ').trim();
  }

  const cleanTranscript = normalize(transcript);
  if (!cleanTranscript) return -1;

  let bestScore = 0;
  let bestIdx = -1;

  for (let i = 0; i < options.length; i++) {
    const cleanOption = normalize(options[i]);
    if (!cleanOption) continue;
    
    let score = 0;
    
    // Direct matches or containment matches have the highest priority
    if (cleanTranscript === cleanOption) {
      score = 100;
    } else if (cleanOption.includes(cleanTranscript) && cleanTranscript.length >= 3) {
      score = 50 + cleanTranscript.length;
    } else if (cleanTranscript.includes(cleanOption) && cleanOption.length >= 3) {
      score = 50 + cleanOption.length;
    } else {
      // Meaningful word overlap score (excluding common stop words to avoid false positive collisions)
      const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'from', 'out', 'and', 'or', 'but', 'very']);
      const tWords = cleanTranscript.split(' ').filter(w => w.length > 1 && !stopWords.has(w));
      const oWords = cleanOption.split(' ').filter(w => w.length > 1 && !stopWords.has(w));
      
      let matches = 0;
      for (const tw of tWords) {
        if (oWords.includes(tw)) {
          matches++;
        }
      }
      if (matches > 0) {
        score = matches;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }

  return bestIdx;
}

// Build the full read-aloud text for a question
function speakQuestion(idx) {
  const q = questions[idx];
  const optLetters = ['A','B','C','D'];
  const ansLabel = answers[idx] >= 0
    ? ` Your current answer is option ${optLetters[answers[idx]]}: ${q.options[answers[idx]]}.`
    : ' No answer selected yet.';
  const navHint = buildNavHint(idx);
  const fullText =
    `Question ${idx+1} of ${questions.length}. ${q.text}. ` +
    `Option A: ${q.options[0]}. ` +
    `Option B: ${q.options[1]}. ` +
    `Option C: ${q.options[2]}. ` +
    `Option D: ${q.options[3]}.` +
    `${ansLabel} ` +
    `Say A, B, C, or D to answer. ${navHint}`;

  updateBlindOverlay('speaking', `Q${idx+1}: ${q.text}`);

  if (isVisual) {
    speakText(fullText, () => updateBlindOverlay('listening'));
  } else {
    speakText(fullText);
  }
}

// Context-aware navigation hint for blind users
function buildNavHint(idx) {
  const isLast  = idx === questions.length - 1;
  const isFirst = idx === 0;
  if (isLast && isFirst) return "Say 'submit' to finish the exam.";
  if (isLast)  return "Say 'previous' to go back, or 'submit' to finish.";
  if (isFirst) return "Say 'next' for the next question.";
  return "Say 'next' or 'previous' to navigate, or 'submit' to finish.";
}

function selectAnswer(qIdx, optIdx) {
  answers[qIdx] = optIdx;
  const optLetters = ['A','B','C','D'];

  if (isVisual) {
    const navHint = buildNavHint(qIdx);
    updateBlindOverlay('speaking', `Selected: Option ${optLetters[optIdx]}`);
    speakText(
      `Option ${optLetters[optIdx]} selected. ${navHint}`,
      () => updateBlindOverlay('listening')
    );
  } else if (ttsEnabled) {
    speakText(`Option ${optLetters[optIdx]} selected.`);
  }

  // Re-render UI
  const options = document.querySelectorAll('.option-item');
  options.forEach((opt, oi) => {
    if (oi === optIdx) {
      opt.classList.add('selected');
      opt.querySelector('input').checked = true;
    } else {
      opt.classList.remove('selected');
    }
  });
  updateQNav();
}

// ===== PERSISTENT SINGLE VOICE DISPATCH LOOP (Visual Mode) =====
// Started ONCE at exam init. Recognition stays alive the whole exam.
// voiceDispatch() always reads the live `currentQ` global — no stale closures.

let voiceLoopActive     = false;
let voiceWatchdogId     = null;
let voiceGestureBound   = false;

function bindVisualVoiceGestureStart() {
  if (!isVisual || voiceGestureBound) return;
  voiceGestureBound = true;
  const startHandler = () => {
    if (!voiceLoopActive) {
      // Cancel the initial prompt if it's playing
      speechSynthesis.cancel();
      startVisualVoiceLoop();
      
      setTimeout(() => {
        speakText(
          `Welcome to ${examTitle}. You have ${questions.length} questions. ` +
          `Say A, B, C, or D to choose an answer. Say 'next' to go to the next question. ` +
          `Say 'previous' to go back. Say 'repeat' to hear the question again. ` +
          `Say 'submit' when you are done. Let's begin.`,
          () => speakQuestion(0)
        );
      }, 600);
    }
  };

  window.addEventListener('click', startHandler, { once: true });
  window.addEventListener('keydown', startHandler, { once: true });
}

function startVisualVoiceLoop() {
  if (!isVisual) return;
  updateBlindOverlay('speaking', 'Activating voice controls...');

  const started = VoiceControl.startListening('exam', (res) => {
    if (!voiceLoopActive) return;
    console.log('[Exam] Voice result:', res);
    updateBlindOverlay('heard', res.raw || '');
    voiceDispatch(res);
  });

  if (!started) {
    voiceLoopActive = false;
    updateBlindOverlay('speaking', 'Click or press any key to enable voice commands');
    speakText('Please click or press any key to activate microphone access for voice commands.');
    bindVisualVoiceGestureStart();
    return;
  }

  voiceLoopActive = true;
  updateBlindOverlay('listening');

  // ---- WATCHDOG ----
  // Every 4s, if we should be listening but aren't (and not speaking),
  // revive the recognizer. This covers any silent recognition death.
  if (voiceWatchdogId) clearInterval(voiceWatchdogId);
  voiceWatchdogId = setInterval(() => {
    if (!voiceLoopActive) return;
    const vc = VoiceControl;

    // 1. Revive recognition if it died silently
    if (!vc.recognizing && !vc.isSpeaking && !vc.pendingRestart && vc.currentCallback) {
      console.warn('[Watchdog] Recognition dead — restarting...');
      updateBlindOverlay('listening');
      try { vc.recognition && vc.recognition.start(); } catch(e) {}
    }

    // 2. Force-reset isSpeaking if stuck > 15s (Chrome TTS freeze safety net)
    if (vc.isSpeaking) {
      const speakingForMs = Date.now() - (vc._speakStartTime || Date.now());
      if (speakingForMs > 15000) {
        console.warn('[Watchdog] isSpeaking stuck for', speakingForMs, 'ms — force-resetting!');
        vc.cancelSpeech();
        if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
      }
    }
  }, 4000);

}

function stopVisualVoiceLoop() {
  voiceLoopActive = false;
  if (voiceWatchdogId) { clearInterval(voiceWatchdogId); voiceWatchdogId = null; }
  VoiceControl.stopListening();
}


// ===== BLIND HUD OVERLAY =====
function injectBlindOverlay() {
  if (document.getElementById('blind-overlay')) return;
  const el = document.createElement('div');
  el.id = 'blind-overlay';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'assertive');
  el.innerHTML = `
    <div id="bo-status">🎤 Starting...</div>
    <div id="bo-q">Loading question...</div>
    <div id="bo-heard"></div>
    <div id="bo-hint">Say A, B, C, D • next • previous • repeat • submit</div>
  `;
  document.body.appendChild(el);

  // Inject HUD styles
  const s = document.createElement('style');
  s.textContent = `
    #blind-overlay{
      position:fixed;bottom:0;left:0;right:0;
      background:rgba(0,0,0,0.92);
      border-top:3px solid #7c3aed;
      padding:14px 24px 18px;
      z-index:9000;
      display:flex;flex-direction:column;gap:4px;
      font-family:'Inter',sans-serif;
    }
    #bo-status{
      font-size:1.1rem;font-weight:700;
      color:#34d399;
      animation: boFade 1.5s ease-in-out infinite;
    }
    #bo-status.speaking{ color:#fbbf24; animation:none; }
    #bo-status.heard{ color:#a78bfa; animation:none; }
    #bo-q{ font-size:0.82rem;color:#e2e8f0;margin-top:2px;}
    #bo-heard{ font-size:0.78rem;color:#94a3b8;min-height:18px;}
    #bo-hint{ font-size:0.72rem;color:#475569;margin-top:4px;}
    @keyframes boFade{0%,100%{opacity:1;}50%{opacity:0.5;}}
  `;
  document.head.appendChild(s);
}

function updateBlindOverlay(state, extra) {
  const status = document.getElementById('bo-status');
  const heard  = document.getElementById('bo-heard');
  const q      = document.getElementById('bo-q');
  if (!status) return;

  status.className = state;
  if (state === 'listening') {
    status.textContent = '🎤 Listening — speak now';
    if (heard) heard.textContent = '';
  } else if (state === 'speaking') {
    status.textContent = '🔊 Speaking...';
  } else if (state === 'heard') {
    status.textContent = '✅ Heard!';
    if (heard) heard.textContent = `You said: "${extra}"`;
    setTimeout(() => {
      if (status.className === 'heard') status.className = 'listening';
    }, 1500);
  }
  // Update question label
  if (q) {
    const optLetters = ['A','B','C','D'];
    const ans = answers[currentQ];
    const ansText = ans >= 0 ? ` | Answer: ${optLetters[ans]}` : ' | No answer yet';
    q.textContent = `Q${currentQ+1}/${questions.length}${ansText}`;
  }
}

// ===== VOICE FEEDBACK (small in-question banner) =====
function setVoiceFeedback(state, extra) {
  const fb = document.getElementById('voice-feedback');
  if (!fb || !isVisual) return;
  if (state === 'speaking') {
    fb.innerHTML = '<span style="color:#fbbf24;font-weight:bold;">🔊 Speaking...</span>';
  } else if (state === 'listening') {
    fb.innerHTML = '<span style="color:#34d399;font-weight:bold;">🎤 Listening...</span>';
  } else if (state === 'heard') {
    fb.innerHTML = `<span style="color:#a78bfa;">Heard: "${extra || ''}"</span>`;
  }
}

// ===== CENTRAL VOICE DISPATCHER =====
// Reads res.command (already parsed by VoiceControl) and the live global currentQ.
function voiceDispatch(res) {
  const idx = currentQ;
  const cmd = res.command || 'raw';
  const raw = res.raw || '';
  console.log(`[Exam Q${idx+1}] cmd=${cmd} raw="${raw}"`);

  // ----- Submit modal -----
  if (inSubmitModal) {
    if (cmd === 'yes' || raw.includes('yes') || raw.includes('confirm')) {
      confirmSubmit();
    } else if (cmd === 'no' || raw.includes('no') || raw.includes('cancel')) {
      cancelSubmit();
    } else {
      speakText("Say 'yes' to confirm submit, or 'no' to go back.");
    }
    return;
  }

  // ----- Navigation -----
  if (cmd === 'next') {
    if (idx < questions.length - 1) {
      renderQuestion(idx + 1);
    } else {
      speakText("This is the last question. Say 'submit' to finish the exam.");
    }
    return;
  }
  if (cmd === 'previous') {
    if (idx > 0) {
      renderQuestion(idx - 1);
    } else {
      speakText("This is the first question. Say 'next' to go forward.");
    }
    return;
  }
  if (cmd === 'repeat') {
    speakQuestion(idx);
    return;
  }
  if (cmd === 'submit') {
    showSubmitModal();
    return;
  }

  // ----- Option selection -----
  if (cmd === 'option') {
    selectAnswer(idx, res.value);
    return;
  }

  // ----- Fallback raw text matching -----
  const matchedOptIdx = matchOptionText(raw, questions[idx].options);
  if (matchedOptIdx >= 0) {
    selectAnswer(idx, matchedOptIdx);
    return;
  }

  // ----- Nothing matched -----
  speakText(`I heard "${raw}". Please say A, B, C, or D to answer. Or say next, previous, repeat, or submit.`);
}

// ===== STANDARD VOICE INPUT (FOR MOTOR/NON-VISUAL) =====
function startVoiceAnswer(qIdx) {
  const feedbackEl = document.getElementById('voice-feedback');
  const voiceBtn   = document.getElementById('btn-voice-answer');

  speakText('Listening now. Please say A, B, C, or D.', () => {
    if (voiceBtn) { voiceBtn.textContent = '🔴 Listening…'; voiceBtn.classList.add('listening'); }

    const started = VoiceControl.startListening('exam', (res) => {
      VoiceControl.stopListening();
      if (voiceBtn) { voiceBtn.textContent = '🎙 Speak Answer'; voiceBtn.classList.remove('listening'); }

      if (res.command === 'option') {
        selectAnswer(qIdx, res.value);
      } else {
        speakText('I didn\'t catch that option. Please try again.');
      }
    });

    if (!started) {
      if (voiceBtn) { voiceBtn.textContent = '🎙 Speak Answer'; voiceBtn.classList.remove('listening'); }
      speakText('Voice recognition is not available. Please allow microphone access or refresh the page.');
    }
  });
}

// ===== TIMER =====
function startTimer() {
  timerInterval = setInterval(() => {
    if (paused) return;
    timerSeconds--;
    const m = Math.floor(timerSeconds/60).toString().padStart(2,'0');
    const s = (timerSeconds%60).toString().padStart(2,'0');
    const timerEl = document.getElementById('exam-timer');
    timerEl.textContent = `⏱ ${m}:${s}`;
    if (timerSeconds <= 300) {
      timerEl.className = 'exam-timer warning';
      if (timerSeconds === 300) {
        if (ttsEnabled) speakText('Warning! 5 minutes remaining in the exam.');
        showVisualNotification('Warning! 5 minutes remaining in the exam.');
      }
    }
    if (timerSeconds <= 60) {
      timerEl.className = 'exam-timer danger';
      if (timerSeconds === 60) {
        if (ttsEnabled) speakText('One minute remaining! Please submit your exam.');
        showVisualNotification('One minute remaining! Please submit your exam.');
      }
    }
    if (timerSeconds <= 0) { clearInterval(timerInterval); autoSubmit(); }
  }, 1000);
}

function showVisualNotification(text) {
  const container = document.getElementById('exam-content');
  if (!container) return;
  const alertDiv = document.createElement('div');
  alertDiv.style.cssText = 'background:#c0392b; color:#fff; border-radius:8px; padding:12px 20px; font-weight:700; margin-bottom:16px; border:1px solid #ff6b6b; box-shadow: 0 4px 15px rgba(0,0,0,0.5);';
  alertDiv.textContent = `🚨 ${text}`;
  container.prepend(alertDiv);
  setTimeout(() => alertDiv.remove(), 6000);
}

// ===== SUBMIT =====
function showSubmitModal() {
  inSubmitModal = true;
  const count = answers.filter(a=>a>=0).length;
  document.getElementById('answered-count').textContent = count;
  document.getElementById('submit-modal').style.display='flex';
  if (isVisual) {
    updateBlindOverlay('speaking', 'Submit confirmation');
  }
  speakText(
    `Submit exam? You have answered ${count} out of ${questions.length} questions. Say 'yes' to confirm, or 'no' to cancel and return.`,
    () => {
      if (isVisual) updateBlindOverlay('listening');
    }
  );
}

function cancelSubmit() {
  inSubmitModal = false;
  document.getElementById('submit-modal').style.display='none';
  if (isVisual) updateBlindOverlay('listening');
  speakText('Cancelled. Returning to question ' + (currentQ + 1) + '. ' + buildNavHint(currentQ));
}

function confirmSubmit() {
  stopVisualVoiceLoop(); // halt voice dispatcher before navigating
  clearInterval(timerInterval);
  const score = answers.reduce((acc,a,i)=>acc+(a===correctAnswers[i]?1:0),0);
  localStorage.setItem('examScore', JSON.stringify({ score, total:questions.length }));
  speakText(`Exam submitted! Your score is ${score} out of ${questions.length}. Redirecting to results.`, () => {
    window.location.href = 'result.html';
  });
}

document.getElementById('modal-cancel')?.addEventListener('click', cancelSubmit);
document.getElementById('modal-confirm')?.addEventListener('click', confirmSubmit);

function autoSubmit() {
  document.getElementById('submit-modal').style.display='flex';
  speakText('Time is up! Your exam has been automatically submitted.', () => {
    confirmSubmit();
  });
}

// ===== TOOLBAR BUTTONS =====
document.getElementById('ex-tts')?.addEventListener('click', () => {
  ttsEnabled = !ttsEnabled;
  document.getElementById('ex-tts').style.background = ttsEnabled ? 'var(--bg-card2)' : '';
  speakText(ttsEnabled ? 'Text to speech enabled' : 'Text to speech disabled');
});
document.getElementById('ex-contrast')?.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
  if (ttsEnabled) speakText(document.body.classList.contains('high-contrast') ? 'High contrast mode enabled' : 'High contrast mode disabled');
});
document.getElementById('ex-font')?.addEventListener('click', () => {
  document.body.classList.toggle('large-text');
  if (ttsEnabled) speakText(document.body.classList.contains('large-text') ? 'Large text enabled' : 'Large text disabled');
});
document.getElementById('ex-pause')?.addEventListener('click', () => {
  paused = !paused;
  document.getElementById('ex-pause').textContent = paused ? '▶' : '⏸';
  document.getElementById('ex-pause').setAttribute('aria-label', paused ? 'Resume Exam' : 'Pause Exam');
  if (ttsEnabled) speakText(paused ? 'Exam paused' : 'Exam resumed');
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' && currentQ < questions.length-1) renderQuestion(currentQ+1);
  if (e.key === 'ArrowLeft'  && currentQ > 0) renderQuestion(currentQ-1);
  if (e.key >= '1' && e.key <= '4') selectAnswer(currentQ, parseInt(e.key)-1);
  if (e.key === 'v' || e.key === 'V') startVoiceAnswer(currentQ);
  if (e.key === 'r' || e.key === 'R') speakQuestion(currentQ);
});

// ===== START =====
init();

// Modal styles injection
const style = document.createElement('style');
style.textContent = `
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;}
.modal-card{background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:36px;max-width:420px;width:90%;text-align:center;}
.modal-title{font-family:'Outfit',sans-serif;font-size:1.4rem;font-weight:800;color:#fff;margin-bottom:12px;}
.modal-body{color:var(--text-muted);margin-bottom:24px;line-height:1.6;}
.modal-actions{display:flex;gap:12px;justify-content:center;}
.q-tts-btn{padding:7px 16px;background:var(--bg-card2);border:1px solid var(--primary);border-radius:8px;color:#c2cca6;font-size:0.82rem;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;}
.q-tts-btn:hover{background:var(--bg-card2);border-color:var(--primary);}
.voice-ans-btn.listening{background:#ef4444!important;border-color:#ef4444!important;color:#fff!important;animation:vPulse 0.8s infinite;}
@keyframes vPulse{0%,100%{opacity:1;}50%{opacity:0.6;}}
body.visual-mode .option-item{padding:18px 20px;font-size:1rem;}
body.visual-mode .q-text-main{font-size:1.2rem;line-height:1.8;}
`;
document.head.appendChild(style);
