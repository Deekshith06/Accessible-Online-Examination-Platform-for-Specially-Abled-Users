// ===== DASHBOARD ACCESSIBILITY CONTROLS =====
const disability = localStorage.getItem('accessExam_disability') || 'none';
const isVisual   = disability === 'visual';

let dashTtsActive = isVisual;
let recognition = null;
let recognizing = false;

// ===== DYNAMIC BEEP GENERATOR =====
function playBeep() {
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
function dashSpeak(text, onEnd) {
  if (!dashTtsActive) {
    if (onEnd) onEnd();
    return;
  }
  VoiceControl.speak(text, onEnd);
}

function startListening(onResult, promptOnFail) {
  VoiceControl.startListening('dashboard', (res) => {
    let mockCmd = res.raw || "";
    if (res.command === 'start' || res.command === 'logout') {
      mockCmd = res.command;
    }
    onResult(mockCmd);
  });
}

// Apply visual mode badge and focus bindings
if (isVisual) {
  const header = document.querySelector('.dash-header-actions');
  if (header) {
    const badge = document.createElement('span');
    badge.textContent = '🔊 Visual Mode';
    badge.style.cssText = 'font-size:0.72rem;color:#c2cca6;background:var(--bg-card2);border:1px solid var(--primary);border-radius:8px;padding:4px 10px;';
    header.prepend(badge);
  }
  const ttsBtn = document.getElementById('dash-tts');
  if (ttsBtn) ttsBtn.style.background = 'var(--bg-card2)';

  // Announce dashboard on load
  window.addEventListener('load', () => {
    setTimeout(() => {
      dashSpeak(
        "Welcome to your student dashboard. Visual accessibility mode is active. You have three available exams. First: General Knowledge Test. Second: Mathematics Basics. Third: English Comprehension. Navigate using the Tab key, or say 'start' to begin the first exam, or 'logout' to exit.",
        () => runDashboardVoiceLoop()
      );
    }, 700);
  });

  // ===== DASHBOARD VOICE LOOP =====
  function runDashboardVoiceLoop() {
    if (!isVisual) return;
    VoiceControl.startListening('dashboard', (res) => {
      VoiceControl.stopListening();
      const cmd = res.command || res.raw.toLowerCase();
      if (cmd === 'start' || cmd.includes('start') || cmd.includes('begin')) {
        dashSpeak("Starting General Knowledge Test.", () => {
          window.location.href = 'exam.html';
        });
      } else if (cmd === 'logout' || cmd.includes('log out') || cmd.includes('exit')) {
        dashSpeak("Logging out.", () => {
          localStorage.removeItem('accessExam_disability');
          localStorage.removeItem('accessExam_voiceInput');
          window.location.href = 'index.html';
        });
      } else {
        dashSpeak("Command not recognized. Say start to begin the exam, or logout to exit.", () => runDashboardVoiceLoop());
      }
    });
  }

  // Bind focus event listeners for dashboard navigation
  window.addEventListener('DOMContentLoaded', () => {
    // Sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('focus', () => {
        dashSpeak(`${link.textContent.trim()} sidebar link.`);
      });
    });

    // Stat cards
    document.querySelectorAll('.dash-stat-card').forEach(card => {
      card.setAttribute('tabindex', '0'); // make focusable
      card.addEventListener('focus', () => {
        const val = card.querySelector('.dsc-value')?.textContent || '';
        const label = card.querySelector('.dsc-label')?.textContent || '';
        dashSpeak(`Statistic: ${label}, value is ${val}.`);
      });
    });

    // Available exam cards
    document.querySelectorAll('.exam-avail-card').forEach(card => {
      // Make the card parent focusable to give context before tabbing onto the link
      card.setAttribute('tabindex', '0');
      card.addEventListener('focus', (e) => {
        if (e.target !== card) return; // avoid duplicate triggers from child links
        const badge = card.querySelector('.eac-badge')?.textContent || '';
        const dur = card.querySelector('.eac-duration')?.textContent || '';
        const title = card.querySelector('.eac-title')?.textContent || '';
        const meta = card.querySelector('.eac-meta')?.textContent || '';
        dashSpeak(`Exam Card: ${title}. Status: ${badge}. Duration: ${dur}. Info: ${meta}. Tab to reach the start button.`);
      });
    });

    // Start Exam buttons
    document.querySelectorAll('.exam-avail-card .module-btn').forEach(btn => {
      btn.addEventListener('focus', () => {
        const cardTitle = btn.closest('.exam-avail-card').querySelector('.eac-title')?.textContent || '';
        dashSpeak(`Start exam button for ${cardTitle}. Press Enter to begin.`);
      });
    });

    // Toolbar icons
    const toolbar = [
      { id: 'dash-tts', msg: 'Toggle text to speech button.' },
      { id: 'dash-contrast', msg: 'Toggle high contrast button.' },
      { id: 'dash-font', msg: 'Toggle large font button.' }
    ];
    toolbar.forEach(({ id, msg }) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('focus', () => dashSpeak(msg));
    });
  });
}

// Show disability mode badge in sidebar
window.addEventListener('DOMContentLoaded', () => {
  const sidebarFooter = document.querySelector('.sidebar-footer');
  if (sidebarFooter && disability !== 'none') {
    const modeLabels = { visual:'👁️ Visual Mode', hearing:'🧏 Hearing Mode', motor:'🧑‍🦽 Motor Mode', multiple:'♿ Multi Mode' };
    const badge = document.createElement('div');
    badge.style.cssText = 'margin-bottom:12px;font-size:0.72rem;color:#c2cca6;background:var(--bg-card2);border:1px solid var(--primary);border-radius:8px;padding:6px 10px;text-align:center;';
    badge.textContent = modeLabels[disability] || '♿ Accessible Mode';
    sidebarFooter.before(badge);
  }

  // Set today's date
  const dateEl = document.querySelector('.dash-date');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  }

  // Update logout link
  const logoutLink = document.querySelector('.sidebar-link.logout');
  if (logoutLink) {
    logoutLink.href = 'disability-selection.html';
    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('accessExam_disability');
      localStorage.removeItem('accessExam_voiceInput');
    });
  }
});

// ===== TOOLBAR BUTTONS =====
const dashContrast = document.getElementById('dash-contrast');
const dashFont     = document.getElementById('dash-font');
const dashTTS      = document.getElementById('dash-tts');

if (dashContrast) dashContrast.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
  dashContrast.classList.toggle('active');
  dashSpeak(document.body.classList.contains('high-contrast') ? 'High contrast mode on' : 'High contrast mode off');
});

if (dashFont) dashFont.addEventListener('click', () => {
  document.body.classList.toggle('large-text');
  dashFont.classList.toggle('active');
  dashSpeak(document.body.classList.contains('large-text') ? 'Large text on' : 'Large text off');
});

if (dashTTS) {
  dashTTS.addEventListener('click', () => {
    dashTtsActive = !dashTtsActive;
    dashTTS.style.background = dashTtsActive ? 'var(--bg-card2)' : '';
    dashTTS.classList.toggle('active', dashTtsActive);
    dashSpeak(dashTtsActive ? 'Text to speech enabled' : 'Text to speech disabled');
  });
}

// ===== FETCH DASHBOARD DATA =====
async function loadDashboardData() {
  try {
    // 1. Fetch Exams
    const exams = await apiFetch('/exams');
    const examCardsContainer = document.querySelector('.exam-cards');
    if (examCardsContainer && exams) {
      examCardsContainer.innerHTML = '';
      exams.forEach(exam => {
        const badgeClass = exam.status === 'ACTIVE' ? 'live' : 'upcoming';
        const badgeColor = exam.status === 'ACTIVE' ? '#00d4aa' : 'var(--accent)';
        const btnText = exam.status === 'ACTIVE' ? 'Start Exam →' : 'View Details →';
        const cardHtml = `
          <div class="exam-avail-card" tabindex="0">
            <div class="eac-header">
              <span class="eac-badge ${badgeClass}" style="background:var(--bg-card2); border: 1px solid ${badgeColor}; color:${badgeColor}">${exam.status}</span>
              <span class="eac-duration">⏱ ${exam.durationMinutes} min</span>
            </div>
            <h3 class="eac-title">${exam.title}</h3>
            <p class="eac-meta">📅 ${new Date(exam.scheduledAt).toLocaleDateString()} &nbsp;|&nbsp; ${exam.marksPerQuestion} Marks/Q</p>
            <div class="eac-access-tags">
              <span class="access-tag">🔊 TTS</span>
              <span class="access-tag">⌨️ Keyboard</span>
            </div>
            <a href="#" onclick="startExamHandler(${exam.id}); return false;" class="module-btn">${btnText}</a>
          </div>
        `;
        examCardsContainer.insertAdjacentHTML('beforeend', cardHtml);
      });
    }

    // 2. Fetch Submissions
    const submissions = await apiFetch('/submissions/my');
    const tbody = document.querySelector('.results-table tbody');
    if (tbody && submissions) {
      tbody.innerHTML = '';
      let totalScore = 0;
      let maxScore = 0;
      submissions.forEach(sub => {
        totalScore += sub.score;
        maxScore += sub.totalMarks;
        
        // Ensure totalMarks is > 0 to avoid division by zero
        const safeTotal = sub.totalMarks > 0 ? sub.totalMarks : 1; 
        const pass = sub.score >= (safeTotal * 0.4);
        const statusClass = pass ? 'pass' : 'fail';
        const statusText = pass ? 'Passed' : 'Failed';
        const scoreClass = sub.score >= (safeTotal * 0.8) ? 'high' : 'mid';
        
        const row = `
          <tr>
            <td>${sub.examTitle}</td>
            <td>${new Date(sub.attemptedAt).toLocaleDateString()}</td>
            <td><span class="score-badge ${scoreClass}">${sub.score}/${sub.totalMarks}</span></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
          </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
      });
      
      // Update Stats
      const statValues = document.querySelectorAll('.dsc-value');
      if (statValues.length >= 3) {
        statValues[0].textContent = exams ? exams.length : 0;
        statValues[1].textContent = submissions.length;
        const avg = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
        statValues[2].textContent = avg + '%';
      }
    }
  } catch (err) {
    console.error("Failed to load dashboard data:", err);
  }
}

window.startExamHandler = function(examId) {
  localStorage.setItem('accessExam_currentExam', examId);
  window.location.href = `exam.html?id=${examId}`;
};

window.addEventListener('DOMContentLoaded', () => {
  loadDashboardData();
  
  // Set username
  const username = localStorage.getItem('accessExam_username');
  if (username) {
    const welcomeName = document.querySelector('.dash-welcome .gradient-text');
    if (welcomeName) welcomeName.textContent = username;
  }
});
