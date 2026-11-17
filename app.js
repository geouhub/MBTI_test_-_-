/**
 * 한국 고등학생을 위한 MBTI 검사기 - 메인 애플리케이션
 */

(function () {
    'use strict';

    // ================================================================
    // STATE MANAGEMENT
    // ================================================================
    const state = {
        currentIndex: 0,
        answers: {}, // { [questionId]: 1~7 }
        resultMBTI: null,
        dimensionScores: {
            EI: { score: 0, leftPercent: 50, rightPercent: 50, winner: 'E' },
            SN: { score: 0, leftPercent: 50, rightPercent: 50, winner: 'S' },
            TF: { score: 0, leftPercent: 50, rightPercent: 50, winner: 'T' },
            JP: { score: 0, leftPercent: 50, rightPercent: 50, winner: 'J' }
        }
    };

    // 차원 한글 명칭 메타데이터
    const dimensionMeta = {
        EI: {
            title: "에너지 방향",
            leftLetter: "E",
            leftName: "외향형 (Extraversion)",
            leftShort: "외향",
            rightLetter: "I",
            rightName: "내향형 (Introversion)",
            rightShort: "내향"
        },
        SN: {
            title: "인식 기능",
            leftLetter: "S",
            leftName: "감각형 (Sensing)",
            leftShort: "감각",
            rightLetter: "N",
            rightName: "직관형 (Intuition)",
            rightShort: "직관"
        },
        TF: {
            title: "판단 기능",
            leftLetter: "T",
            leftName: "사고형 (Thinking)",
            leftShort: "사고",
            rightLetter: "F",
            rightName: "감정형 (Feeling)",
            rightShort: "감정"
        },
        JP: {
            title: "생활 양식",
            leftLetter: "J",
            leftName: "판단형 (Judging)",
            leftShort: "판단",
            rightLetter: "P",
            rightName: "인식형 (Perceiving)",
            rightShort: "인식"
        }
    };

    // ================================================================
    // DOM ELEMENTS
    // ================================================================
    const screens = {
        intro: document.getElementById('intro'),
        quiz: document.getElementById('quiz'),
        loading: document.getElementById('loading'),
        result: document.getElementById('result')
    };

    // Intro Elements
    const btnStart = document.getElementById('btn-start');

    // Quiz Elements
    const progressFill = document.getElementById('progress-fill');
    const progressCurrent = document.getElementById('progress-current');
    const progressTotal = document.getElementById('progress-total');
    const dimensionBadge = document.getElementById('dimension-badge');
    const quizQuestion = document.getElementById('quiz-question');
    const likertButtons = document.querySelectorAll('.likert__btn');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const quizCard = document.getElementById('quiz-card');

    // Loading Elements
    const loadingText = document.getElementById('loading-text');

    // Result Elements
    const resultRoleGroup = document.getElementById('result-role-group');
    const resultEmoji = document.getElementById('result-emoji');
    const resultCode = document.getElementById('result-code');
    const resultName = document.getElementById('result-name');
    const resultSubtitle = document.getElementById('result-subtitle');
    const dimensionBarsContainer = document.getElementById('dimension-bars');
    const resultDescription = document.getElementById('result-description');
    const resultStrengths = document.getElementById('result-strengths');
    const resultWeaknesses = document.getElementById('result-weaknesses');
    const resultSchoolLife = document.getElementById('result-school-life');
    const resultStudyTip = document.getElementById('result-study-tip');
    const resultClubs = document.getElementById('result-clubs');
    const resultCareers = document.getElementById('result-careers');
    const resultCompat = document.getElementById('result-compat');
    const resultFamous = document.getElementById('result-famous');
    const btnRestart = document.getElementById('btn-restart');
    const btnCopyResult = document.getElementById('btn-copy-result');

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');

    // ================================================================
    // INITIALIZATION
    // ================================================================
    function init() {
        initTheme();
        initParticles();
        bindEvents();

        if (progressTotal) {
            progressTotal.textContent = questions.length;
        }
    }

    // ================================================================
    // SCREEN NAVIGATION
    // ================================================================
    function showScreen(screenKey) {
        Object.entries(screens).forEach(([key, element]) => {
            if (element) {
                if (key === screenKey) {
                    element.classList.add('screen--active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    element.classList.remove('screen--active');
                }
            }
        });
    }

    // ================================================================
    // THEME HANDLING
    // ================================================================
    function initTheme() {
        const savedTheme = localStorage.getItem('mbti-theme') || 
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        setTheme(savedTheme);
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('mbti-theme', theme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // ================================================================
    // BACKGROUND PARTICLES
    // ================================================================
    function initParticles() {
        const container = document.getElementById('particles-bg');
        if (!container) return;

        const count = 25;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 6 + 3;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                top: ${top}%;
                border-radius: 50%;
                background: rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1});
                filter: blur(1px);
                animation: particleFloat ${duration}s ease-in-out ${delay}s infinite alternate;
                pointer-events: none;
            `;
            container.appendChild(particle);
        }

        // Add float animation keyframes if not existing
        if (!document.getElementById('particle-style')) {
            const style = document.createElement('style');
            style.id = 'particle-style';
            style.textContent = `
                @keyframes particleFloat {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
                    50% { transform: translate(${Math.random() * 40 - 20}px, -40px) scale(1.3); opacity: 0.6; }
                    100% { transform: translate(${Math.random() * 40 - 20}px, 20px) scale(0.9); opacity: 0.3; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ================================================================
    // QUIZ LOGIC
    // ================================================================
    function startQuiz() {
        state.currentIndex = 0;
        state.answers = {};
        showScreen('quiz');
        renderQuestion(0);
    }

    function renderQuestion(index) {
        if (index < 0 || index >= questions.length) return;

        const q = questions[index];
        state.currentIndex = index;

        // Animate question card switch
        quizCard.classList.remove('slide-in-right', 'slide-in-left');
        void quizCard.offsetWidth; // trigger reflow
        quizCard.classList.add('slide-in-right');

        // Update Question text & badge
        quizQuestion.textContent = q.text;
        const meta = dimensionMeta[q.dimension];
        dimensionBadge.textContent = meta ? meta.title : q.dimension;

        // Update Progress
        const currentNum = index + 1;
        const totalNum = questions.length;
        progressCurrent.textContent = currentNum;
        const percent = (currentNum / totalNum) * 100;
        progressFill.style.width = `${percent}%`;

        // Update Likert buttons selection
        const savedAnswer = state.answers[q.id];
        likertButtons.forEach(btn => {
            const btnVal = parseInt(btn.getAttribute('data-value'), 10);
            if (savedAnswer && btnVal === savedAnswer) {
                btn.classList.add('likert__btn--selected');
            } else {
                btn.classList.remove('likert__btn--selected');
            }
        });

        // Navigation buttons state
        btnPrev.disabled = index === 0;
        btnNext.disabled = !savedAnswer; // Answer required before going next
        btnNext.innerHTML = index === questions.length - 1 
            ? `<span>결과 보기</span><svg class="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
            : `<span>다음</span><svg class="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    }

    function handleLikertSelect(val) {
        const currentQ = questions[state.currentIndex];
        state.answers[currentQ.id] = val;

        // Highlight selected button
        likertButtons.forEach(btn => {
            const btnVal = parseInt(btn.getAttribute('data-value'), 10);
            if (btnVal === val) {
                btn.classList.add('likert__btn--selected');
            } else {
                btn.classList.remove('likert__btn--selected');
            }
        });

        btnNext.disabled = false;

        // Auto advance after small delay for smooth feel
        setTimeout(() => {
            if (state.currentIndex < questions.length - 1) {
                renderQuestion(state.currentIndex + 1);
            } else {
                finishQuiz();
            }
        }, 280);
    }

    function goPrev() {
        if (state.currentIndex > 0) {
            renderQuestion(state.currentIndex - 1);
        }
    }

    function goNext() {
        if (state.currentIndex < questions.length - 1) {
            renderQuestion(state.currentIndex + 1);
        } else {
            finishQuiz();
        }
    }

    // ================================================================
    // MBTI CALCULATION
    // ================================================================
    function calculateMBTI() {
        // 차원별 점수 계산
        // 7점 척도: 1(매우 비동의), 2(비동의), 3(약간 비동의), 4(보통), 5(약간 동의), 6(동의), 7(매우 동의)
        // 편차: diff = (value - 4) -> -3 ~ +3
        // direction이 'E', 'S', 'T', 'J' (Left):
        //   diff > 0 이면 Left 증가, diff < 0 이면 Right 증가
        // direction이 'I', 'N', 'F', 'P' (Right):
        //   diff > 0 이면 Right 증가 (Left 감소), diff < 0 이면 Left 증가

        const rawScores = {
            EI: 0, // > 0이면 E, < 0이면 I
            SN: 0, // > 0이면 S, < 0이면 N
            TF: 0, // > 0이면 T, < 0이면 F
            JP: 0  // > 0이면 J, < 0이면 P
        };

        const leftKeys = { EI: 'E', SN: 'S', TF: 'T', JP: 'J' };

        questions.forEach(q => {
            const val = state.answers[q.id] || 4;
            const diff = val - 4; // -3 ~ +3

            if (q.direction === leftKeys[q.dimension]) {
                // 문항이 Left 방향
                rawScores[q.dimension] += diff;
            } else {
                // 문항이 Right 방향
                rawScores[q.dimension] -= diff;
            }
        });

        // 각 차원 10문항, diff는 -3 ~ +3 -> 최대 범위 -30 ~ +30
        const mbtiLetters = [];

        Object.keys(rawScores).forEach(dim => {
            const score = rawScores[dim];
            const meta = dimensionMeta[dim];
            const maxRange = 30; // 10문항 * 3점

            // 비율 환산 (0% ~ 100%)
            // score = 0 -> left 50%, right 50%
            let leftPercent = Math.round(((score + maxRange) / (maxRange * 2)) * 100);
            leftPercent = Math.max(0, Math.min(100, leftPercent));
            const rightPercent = 100 - leftPercent;

            let winner = score >= 0 ? meta.leftLetter : meta.rightLetter;

            // 50:50인 경우 기본값 처리
            if (leftPercent === 50) {
                winner = meta.leftLetter;
                leftPercent = 51;
            }

            mbtiLetters.push(winner);

            state.dimensionScores[dim] = {
                score,
                leftPercent,
                rightPercent: 100 - leftPercent,
                winner
            };
        });

        state.resultMBTI = mbtiLetters.join('');
        return state.resultMBTI;
    }

    // ================================================================
    // FINISH QUIZ & LOADING SCREEN
    // ================================================================
    function finishQuiz() {
        showScreen('loading');

        const messages = [
            "당신의 학교생활 패턴을 분석하고 있어요...",
            "친구들과의 소통 및 공부 성향을 계산 중...",
            "16가지 유형 중 당신과 꼭 맞는 유형을 매칭하는 중...",
            "나만의 맞춤 결과 리포트 생성 완료!"
        ];

        let step = 0;
        const interval = setInterval(() => {
            step++;
            if (step < messages.length && loadingText) {
                loadingText.textContent = messages[step];
            }
        }, 450);

        setTimeout(() => {
            clearInterval(interval);
            calculateMBTI();
            renderResult();
            showScreen('result');
        }, 1800);
    }

    // ================================================================
    // RESULT RENDERING
    // ================================================================
    function renderResult() {
        const typeCode = state.resultMBTI || 'INTJ';
        const typeData = personalityTypes[typeCode] || personalityTypes['INTJ'];

        // Hero Section
        if (resultRoleGroup) {
            resultRoleGroup.textContent = typeData.roleGroup;
            resultRoleGroup.style.background = typeData.roleColor ? `${typeData.roleColor}25` : 'rgba(139, 92, 246, 0.2)';
            resultRoleGroup.style.color = typeData.roleColor || 'var(--accent-purple)';
            resultRoleGroup.style.borderColor = typeData.roleColor || 'var(--accent-purple)';
        }

        if (resultEmoji) resultEmoji.textContent = typeData.emoji;
        if (resultCode) {
            resultCode.textContent = typeData.code;
            resultCode.style.background = `linear-gradient(135deg, ${typeData.color}, ${typeData.colorLight || typeData.color})`;
            resultCode.style.webkitBackgroundClip = 'text';
            resultCode.style.webkitTextFillColor = 'transparent';
        }
        if (resultName) resultName.textContent = typeData.name;
        if (resultSubtitle) resultSubtitle.textContent = typeData.subtitle;

        // Dimension Bars
        renderDimensionBars();

        // Description
        if (resultDescription) {
            resultDescription.innerHTML = typeData.description
                .split('\n\n')
                .map(para => `<p>${para.trim()}</p>`)
                .join('');
        }

        // Strengths & Weaknesses
        if (resultStrengths) {
            resultStrengths.innerHTML = (typeData.strengths || [])
                .map(item => `<li>${item}</li>`)
                .join('');
        }
        if (resultWeaknesses) {
            resultWeaknesses.innerHTML = (typeData.weaknesses || [])
                .map(item => `<li>${item}</li>`)
                .join('');
        }

        // School Life & Study Tip
        if (resultSchoolLife) resultSchoolLife.textContent = typeData.schoolLife;
        if (resultStudyTip) resultStudyTip.textContent = typeData.studyTip;

        // Recommendations (Clubs & Careers)
        if (resultClubs) {
            resultClubs.innerHTML = (typeData.recommendedClubs || [])
                .map(club => `<span class="tag">🏫 ${club}</span>`)
                .join('');
        }
        if (resultCareers) {
            resultCareers.innerHTML = (typeData.careerPaths || [])
                .map(career => `<span class="tag">💼 ${career}</span>`)
                .join('');
        }

        // Compatibility Cards
        renderCompatibility(typeData);

        // Famous People
        if (resultFamous) {
            resultFamous.innerHTML = (typeData.famousPeople || [])
                .map(name => `<span class="tag">⭐ ${name}</span>`)
                .join('');
        }
    }

    function renderDimensionBars() {
        if (!dimensionBarsContainer) return;
        dimensionBarsContainer.innerHTML = '';

        const dims = ['EI', 'SN', 'TF', 'JP'];

        dims.forEach(dim => {
            const data = state.dimensionScores[dim];
            const meta = dimensionMeta[dim];
            const isLeftWinner = data.winner === meta.leftLetter;
            const winningPercent = isLeftWinner ? data.leftPercent : data.rightPercent;

            const barElement = document.createElement('div');
            barElement.className = 'dimension-bar';

            barElement.innerHTML = `
                <div class="dimension-bar__labels">
                    <div class="dimension-bar__left ${isLeftWinner ? 'dimension-bar__winner' : ''}">
                        <span>${meta.leftLetter} (${data.leftPercent}%)</span>
                        <span class="dimension-bar__label-name">${meta.leftShort}</span>
                    </div>
                    <div class="dimension-bar__right ${!isLeftWinner ? 'dimension-bar__winner' : ''}">
                        <span>(${data.rightPercent}%) ${meta.rightLetter}</span>
                        <span class="dimension-bar__label-name">${meta.rightShort}</span>
                    </div>
                </div>
                <div class="dimension-bar__track">
                    <div class="dimension-bar__fill" style="
                        width: ${winningPercent}%;
                        margin-left: ${isLeftWinner ? '0' : 'auto'};
                        background: ${isLeftWinner ? 'var(--gradient-primary)' : 'var(--gradient-warm)'};
                    "></div>
                </div>
                <div class="dimension-bar__percentage">
                    <strong>${data.winner}</strong> 성향이 <strong>${winningPercent}%</strong>로 우세합니다
                </div>
            `;

            dimensionBarsContainer.appendChild(barElement);
        });
    }

    function renderCompatibility(typeData) {
        if (!resultCompat) return;

        const best = personalityTypes[typeData.bestMatch];
        const growth = personalityTypes[typeData.growthMatch];

        resultCompat.innerHTML = `
            <div class="compat-card">
                <div class="compat-card__label">💖 환상의 꿀케미</div>
                <div class="compat-card__emoji">${best ? best.emoji : '✨'}</div>
                <div class="compat-card__type" style="color: ${best ? best.color : 'inherit'}">${typeData.bestMatch}</div>
                <div class="compat-card__name">${best ? best.name : ''}</div>
                <p class="compat-card__reason">${typeData.bestMatchReason || '서로의 장점을 극대화해주는 최고의 단짝!'}</p>
            </div>
            <div class="compat-card">
                <div class="compat-card__label">🌱 함께 성장하는 케미</div>
                <div class="compat-card__emoji">${growth ? growth.emoji : '🤝'}</div>
                <div class="compat-card__type" style="color: ${growth ? growth.color : 'inherit'}">${typeData.growthMatch}</div>
                <div class="compat-card__name">${growth ? growth.name : ''}</div>
                <p class="compat-card__reason">${typeData.growthMatchReason || '서로 다른 관점으로 시야를 넓혀주는 든든한 친구!'}</p>
            </div>
        `;
    }

    // ================================================================
    // TOAST NOTIFICATION
    // ================================================================
    function showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add('toast--show');

        setTimeout(() => {
            toast.classList.remove('toast--show');
        }, 2500);
    }

    // ================================================================
    // SHARE / COPY RESULT
    // ================================================================
    function copyResult() {
        const typeCode = state.resultMBTI || 'INTJ';
        const typeData = personalityTypes[typeCode];
        const textToCopy = `[한국 고등학생 MBTI 검사 결과]\n나의 유형은 "${typeCode} - ${typeData ? typeData.name : ''}"입니다!\n${typeData ? typeData.subtitle : ''}\n지금 당신의 MBTI도 확인해보세요!`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast("결과 요약이 클립보드에 복사되었습니다! 📋");
            }).catch(() => {
                fallbackCopy(textToCopy);
            });
        } else {
            fallbackCopy(textToCopy);
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast("결과 요약이 클립보드에 복사되었습니다! 📋");
        } catch (e) {
            showToast("복사에 실패했습니다. 직접 복사해주세요.");
        }
        document.body.removeChild(textarea);
    }

    // ================================================================
    // EVENT BINDINGS
    // ================================================================
    function bindEvents() {
        // Start Quiz
        if (btnStart) {
            btnStart.addEventListener('click', startQuiz);
        }

        // Likert Buttons
        likertButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const val = parseInt(btn.getAttribute('data-value'), 10);
                handleLikertSelect(val);
            });
        });

        // Navigation
        if (btnPrev) btnPrev.addEventListener('click', goPrev);
        if (btnNext) btnNext.addEventListener('click', goNext);

        // Restart Quiz
        if (btnRestart) {
            btnRestart.addEventListener('click', () => {
                showScreen('intro');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Copy Result
        if (btnCopyResult) {
            btnCopyResult.addEventListener('click', copyResult);
        }

        // Theme Toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Keyboard Shortcuts (Arrow keys for Likert / Navigation)
        document.addEventListener('keydown', (e) => {
            const isQuizActive = screens.quiz && screens.quiz.classList.contains('screen--active');
            if (!isQuizActive) return;

            if (e.key === 'ArrowLeft') {
                goPrev();
            } else if (e.key === 'ArrowRight' && !btnNext.disabled) {
                goNext();
            } else if (e.key >= '1' && e.key <= '7') {
                // Number keys 1~7 mapped to Likert values
                const keyNum = parseInt(e.key, 10);
                // 1 -> 7 (동의), 7 -> 1 (비동의) or 1 -> 1?
                // Visual layout is left=7(매우동의) down to right=1(매우비동의)
                const valMap = { '1': 7, '2': 6, '3': 5, '4': 4, '5': 3, '6': 2, '7': 1 };
                handleLikertSelect(valMap[e.key]);
            }
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
