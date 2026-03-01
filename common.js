// common.js — Shared functions for all train-english modules

// --- Utility functions ---

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function normalizeAnswer(str) {
    return str.toLowerCase()
        .replace(/[.,!?]/g, '')
        .replace(/\s+/g, ' ')
        .replace(/[\u2019]/g, "'")
        .trim();
}

function showFeedback(correct, message) {
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback show ' + (correct ? 'correct' : 'wrong');
    feedback.innerHTML = message;
}

function celebrate() {
    const emojis = ['\u{1F389}', '\u2B50', '\u{1F3C6}', '\u{1F4AA}', '\u{1F31F}'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.textContent = emoji;
    document.body.appendChild(celebration);
    setTimeout(() => celebration.remove(), 500);
}

// --- Score / progress ---

function updateScore(score, streak, correctlyAnswered, getQuestions) {
    document.getElementById('correct-score').textContent = score.correct;
    document.getElementById('wrong-score').textContent = score.wrong;
    document.getElementById('total-questions').textContent = score.total;

    const totalCount = getQuestions().length;
    const progress = totalCount > 0 ? (correctlyAnswered.size / totalCount * 100) : 0;
    document.getElementById('progress-fill').style.width = progress + '%';

    const streakEl = document.getElementById('streak');
    if (streak >= 3) {
        streakEl.textContent = '\u{1F525} ' + streak + ' richtig in Folge!';
    } else {
        streakEl.textContent = '';
    }
}

// --- Completion modal ---

var _commonConfig = {};

function initCommon(config) {
    _commonConfig = config;

    const style = document.createElement('style');
    style.textContent = `
        .celebration {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            animation: pop 0.5s ease;
            pointer-events: none;
            z-index: 1000;
        }

        @keyframes pop {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }

        .completion-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .completion-modal {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 420px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .completion-modal .trophy {
            font-size: 4rem;
            margin-bottom: 15px;
        }

        .completion-modal h2 {
            color: #333;
            margin-bottom: 10px;
            font-size: 1.6rem;
        }

        .completion-modal p {
            color: #666;
            font-size: 1.05rem;
            line-height: 1.5;
            margin-bottom: 25px;
        }

        .completion-modal .stats {
            display: flex;
            justify-content: center;
            gap: 25px;
            margin-bottom: 25px;
        }

        .completion-modal .stat {
            text-align: center;
        }

        .completion-modal .stat strong {
            display: block;
            font-size: 1.8rem;
            color: ${config.accentColor1};
        }

        .completion-modal .stat span {
            font-size: 0.85rem;
            color: #999;
        }

        .completion-modal .btn-restart {
            padding: 14px 35px;
            background: linear-gradient(135deg, ${config.accentColor1}, ${config.accentColor2});
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .completion-modal .btn-restart:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
}

function showCompletion(totalCount, score) {
    const overlay = document.createElement('div');
    overlay.className = 'completion-overlay';
    overlay.innerHTML = `
        <div class="completion-modal">
            <div class="trophy">\u{1F3C6}</div>
            <h2>Geschafft!</h2>
            <p>Du hast alle ${totalCount} Fragen in dieser Kategorie richtig beantwortet!</p>
            <div class="stats">
                <div class="stat">
                    <strong>${score.correct}</strong>
                    <span>Richtig</span>
                </div>
                <div class="stat">
                    <strong>${score.wrong}</strong>
                    <span>Falsch</span>
                </div>
            </div>
            <button class="btn-restart" onclick="restartCategory()">Nochmal \u00FCben</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

function restartCategory() {
    const overlay = document.querySelector('.completion-overlay');
    if (overlay) overlay.remove();
    if (_commonConfig.onRestart) {
        _commonConfig.onRestart();
    }
}
