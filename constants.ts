export const EXPORT_FILENAME = "bai-kiem-tra-game.html";

// Template HTML mới với giao diện Game Show, màu sắc rực rỡ và hiệu ứng vinh danh
export const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thử Thách Kiến Thức</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    
    <!-- MathJax Configuration -->
    <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
        processEscapes: true
      },
      options: {
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
      },
      chtml: {
        scale: 1.1
      }
    };
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;800&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body { 
            font-family: 'Nunito', sans-serif; 
            /* Gentle Teal Gradient (Xanh ngọc nhẹ nhàng) */
            background: linear-gradient(135deg, #2dd4bf 0%, #0f766e 100%);
            color: white;
            overflow-x: hidden;
            min-height: 100vh;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        h1, h2, h3, .font-game {
            font-family: 'Baloo 2', cursive;
        }
        
        /* Hiệu ứng sấm sét nền (giả lập) - Giảm độ đậm để nhẹ nhàng hơn */
        .lightning-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L10 40 L35 40 L20 100 L70 30 L45 30 L60 0 Z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E");
            background-size: 300px 300px;
            z-index: -1;
            pointer-events: none;
            opacity: 0.5; 
        }

        /* Buttons 3D style */
        .btn-game {
            transition: all 0.1s;
            border-bottom: 6px solid;
            position: relative;
            top: 0;
        }
        .btn-game:active {
            top: 4px;
            border-bottom-width: 2px;
        }

        /* Màu sắc đáp án */
        .opt-A { background-color: #22c55e; border-color: #15803d; } /* Green */
        .opt-B { background-color: #f59e0b; border-color: #b45309; } /* Orange */
        .opt-C { background-color: #ef4444; border-color: #b91c1c; } /* Red */
        .opt-D { background-color: #a855f7; border-color: #7e22ce; } /* Purple */
        
        .opt-A:hover { background-color: #4ade80; }
        .opt-B:hover { background-color: #fbbf24; }
        .opt-C:hover { background-color: #f87171; }
        .opt-D:hover { background-color: #c084fc; }

        .correct-glow { box-shadow: 0 0 20px #4ade80; border-color: #ffffff; transform: scale(1.02); z-index: 10; }
        .wrong-shake { animation: shake 0.5s; opacity: 0.6; }

        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }

        .glass-panel {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px 0 rgba(15, 118, 110, 0.2);
        }

        .math-display { font-size: 1.25em !important; }
        
        /* Gold Text Effect for Result */
        .text-gold {
            background: linear-gradient(to bottom, #fef08a 0%, #d97706 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0px 2px 0px rgba(0,0,0,0.5));
        }
        
        /* Confetti */
        .confetti {
            position: absolute;
            width: 10px; height: 10px;
            background-color: #f00;
            animation: fall linear forwards;
        }
        @keyframes fall {
            to { transform: translateY(100vh) rotate(720deg); }
        }
    </style>
</head>
<body class="flex flex-col items-center justify-center p-4">

    <div class="lightning-bg"></div>

    <!-- Main Game Container -->
    <div id="game-screen" class="w-full max-w-5xl flex flex-col items-center">
        
        <!-- Top Bar: Progress & Score -->
        <div class="w-full flex justify-between items-center mb-6 px-4">
            <!-- Progress Bar styled like energy bar -->
            <div class="flex-1 mr-6 relative h-8 bg-teal-900/50 rounded-full border-2 border-teal-200/30 shadow-inner overflow-hidden">
                <div id="progress-bar" class="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-yellow-300 transition-all duration-500 flex items-center justify-end px-2" style="width: 0%">
                    <i class="fas fa-bolt text-white animate-pulse text-xs"></i>
                </div>
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
                    Câu <span id="current-q">1</span> / <span id="total-q">0</span>
                </div>
            </div>

            <!-- Score -->
            <div class="glass-panel px-6 py-2 rounded-full flex items-center gap-2">
                <span class="text-teal-50 font-game text-2xl drop-shadow-sm">Điểm:</span>
                <span id="score" class="text-3xl font-game font-bold text-yellow-300 drop-shadow-md">0</span>
            </div>
        </div>

        <!-- Question Card -->
        <div class="glass-panel w-full rounded-3xl p-8 mb-8 relative animate-fade-in-up">
            <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-6 py-1 rounded-full font-bold shadow-lg border-2 border-white transform -rotate-1">
                <i class="fas fa-lightbulb mr-2"></i> <span id="q-topic">CHỦ ĐỀ</span>
            </div>

            <h2 class="text-2xl md:text-4xl font-bold text-center mt-4 mb-4 leading-tight math-display drop-shadow-sm" id="q-text">
                Đang tải dữ liệu...
            </h2>
        </div>

        <!-- Options Grid -->
        <div id="options-container" class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Buttons injected here -->
        </div>

        <!-- Explanation (Popup) -->
        <div id="explanation-modal" class="fixed inset-0 bg-teal-900/90 hidden z-50 flex items-center justify-center p-4">
            <div class="bg-white text-slate-800 rounded-3xl max-w-2xl w-full p-8 relative animate-bounce-in shadow-2xl border-4 border-teal-400">
                <div class="text-center mb-4">
                    <div id="feedback-icon" class="text-6xl mb-2"></div>
                    <h3 id="feedback-title" class="text-3xl font-game font-bold uppercase"></h3>
                </div>
                
                <div class="bg-teal-50 p-6 rounded-xl border border-teal-100 mb-6 text-lg">
                    <i class="fas fa-info-circle text-teal-600 mr-2"></i> <span id="explanation-text"></span>
                </div>

                <button onclick="nextQuestion()" class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl text-xl shadow-lg border-b-4 border-teal-800 active:border-b-0 active:translate-y-1 transition-all">
                    TIẾP THEO <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- HALL OF FAME (Result Screen) -->
    <div id="result-screen" class="hidden fixed inset-0 z-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-teal-900 flex flex-col items-center justify-center text-center p-4">
        <div id="confetti-container" class="absolute inset-0 overflow-hidden pointer-events-none"></div>
        
        <div class="relative z-10 animate-zoom-in">
            <div class="text-6xl md:text-8xl mb-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">🏆</div>
            <h1 id="result-title" class="text-5xl md:text-7xl font-game font-black text-gold mb-2 uppercase tracking-wide">
                XUẤT SẮC!
            </h1>
            <div class="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-md">
                <span id="final-score">0</span>/<span id="total-score-max">0</span>
            </div>

            <!-- Stats Box -->
            <div class="glass-panel p-8 rounded-2xl max-w-md mx-auto mb-10 text-left">
                <div class="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
                    <span class="text-teal-50">Tỷ lệ đúng:</span>
                    <span id="result-percent" class="text-2xl font-bold text-green-300">100%</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-teal-50">Đánh giá:</span>
                    <span id="result-msg" class="text-xl font-bold text-yellow-300">Tuyệt đỉnh!</span>
                </div>
            </div>

            <div class="flex gap-4 justify-center">
                <button onclick="location.reload()" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all shadow-xl">
                    <i class="fas fa-redo mr-2"></i> CHƠI LẠI
                </button>
                <button onclick="shareResult()" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all shadow-xl">
                    <i class="fas fa-share-alt mr-2"></i> CHIA SẺ
                </button>
            </div>
        </div>
    </div>

    <script>
        // DỮ LIỆU CÂU HỎI (AI SẼ ĐIỀN VÀO ĐÂY)
        const quizData = // {{DATA_PLACEHOLDER}};

        let currentIdx = 0;
        let score = 0;
        
        // Colors for buttons A, B, C, D
        const btnClasses = ['opt-A', 'opt-B', 'opt-C', 'opt-D'];
        const btnLabels = ['A', 'B', 'C', 'D'];

        function init() {
            document.getElementById('total-q').innerText = quizData.length;
            renderQuestion();
        }

        function renderQuestion() {
            const q = quizData[currentIdx];
            document.getElementById('current-q').innerText = currentIdx + 1;
            document.getElementById('q-topic').innerText = q.topic;
            
            // Update Progress Bar
            const percent = ((currentIdx) / quizData.length) * 100;
            document.getElementById('progress-bar').style.width = \`\${percent}%\`;

            document.getElementById('q-text').innerHTML = q.question;
            
            const container = document.getElementById('options-container');
            container.innerHTML = '';

            if (q.type === 'mcq') {
                q.options.forEach((opt, idx) => {
                    const btnClass = btnClasses[idx % 4];
                    const label = btnLabels[idx % 4];
                    const btn = document.createElement('button');
                    btn.className = \`btn-game \${btnClass} w-full text-white p-6 rounded-2xl text-xl font-bold text-left flex items-center gap-4 shadow-lg group\`;
                    btn.innerHTML = \`
                        <div class="w-12 h-12 rounded-lg bg-black/20 flex items-center justify-center text-2xl font-black shrink-0 group-hover:scale-110 transition-transform">\${label}</div>
                        <div class="math-opt flex-1">\${opt}</div>
                    \`;
                    btn.onclick = () => handleAnswer(idx, btn, 'mcq');
                    container.appendChild(btn);
                });
            } else if (q.type === 'tf') {
                ['Đúng', 'Sai'].forEach((opt, idx) => {
                    const isTrue = idx === 0;
                    const btnClass = isTrue ? 'opt-A' : 'opt-C'; // Green for True, Red for False
                    const icon = isTrue ? 'check' : 'times';
                    const btn = document.createElement('button');
                    btn.className = \`btn-game \${btnClass} w-full text-white p-8 rounded-2xl text-2xl font-bold flex flex-col items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform\`;
                    btn.innerHTML = \`<i class="fas fa-\${icon} text-4xl bg-black/20 p-4 rounded-full mb-2"></i> <span>\${opt}</span>\`;
                    btn.onclick = () => handleAnswer(isTrue, btn, 'tf');
                    container.appendChild(btn);
                });
            } else if (q.type === 'short') {
                container.innerHTML = \`
                    <div class="col-span-1 md:col-span-2 flex flex-col items-center gap-4">
                        <input type="number" id="num-input" class="w-full max-w-md p-6 text-4xl text-center font-bold text-teal-900 rounded-2xl border-4 border-teal-300 focus:border-yellow-400 outline-none shadow-xl" placeholder="?">
                        <button onclick="handleAnswer(parseFloat(document.getElementById('num-input').value), this, 'short')" class="bg-teal-600 text-white px-10 py-4 rounded-full text-xl font-bold btn-game border-b-teal-800">KIỂM TRA</button>
                    </div>
                \`;
            }

            if (window.MathJax) {
                 window.MathJax.typesetPromise([document.getElementById('q-text'), container]).catch(err => {});
            }
        }

        function handleAnswer(userAns, btnElement, type) {
            const q = quizData[currentIdx];
            let isCorrect = false;

            if (type === 'short') {
                isCorrect = Math.abs(userAns - q.correct) < 0.001;
            } else {
                isCorrect = (userAns === q.correct);
            }

            // Show feedback modal
            const modal = document.getElementById('explanation-modal');
            const icon = document.getElementById('feedback-icon');
            const title = document.getElementById('feedback-title');
            
            if (isCorrect) {
                score++;
                document.getElementById('score').innerText = score;
                icon.innerHTML = '🎉';
                title.innerText = "CHÍNH XÁC!";
                title.className = "text-4xl font-game font-black uppercase text-green-600";
                playSound('correct');
            } else {
                icon.innerHTML = '😢';
                title.innerText = "SAI RỒI...";
                title.className = "text-4xl font-game font-black uppercase text-red-600";
                playSound('wrong');
            }

            document.getElementById('explanation-text').innerHTML = q.explain;
            modal.classList.remove('hidden');
            
            if (window.MathJax) {
                window.MathJax.typesetPromise([document.getElementById('explanation-text')]);
            }
        }

        function nextQuestion() {
            document.getElementById('explanation-modal').classList.add('hidden');
            
            if (currentIdx < quizData.length - 1) {
                currentIdx++;
                renderQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            document.getElementById('game-screen').classList.add('hidden');
            const resultScreen = document.getElementById('result-screen');
            resultScreen.classList.remove('hidden');

            const total = quizData.length;
            const percent = Math.round((score / total) * 100);
            
            document.getElementById('final-score').innerText = score;
            document.getElementById('total-score-max').innerText = total;
            document.getElementById('result-percent').innerText = percent + "%";

            // Logic vinh danh
            const titleEl = document.getElementById('result-title');
            const msgEl = document.getElementById('result-msg');
            
            if (percent === 100) {
                titleEl.innerText = "XUẤT SẮC!";
                msgEl.innerText = "Bạn là thiên tài! Không sai câu nào!";
                startConfetti();
                playSound('win');
            } else if (percent >= 80) {
                titleEl.innerText = "QUÁ ĐỈNH!";
                msgEl.innerText = "Kiến thức rất vững vàng!";
                startConfetti();
                playSound('win');
            } else if (percent >= 50) {
                titleEl.innerText = "LÀM TỐT!";
                msgEl.innerText = "Cố gắng lên một chút nữa nhé!";
            } else {
                titleEl.innerText = "CỐ LÊN!";
                msgEl.innerText = "Hãy ôn lại bài và thử lại nhé.";
            }
        }

        // --- Effects ---
        function startConfetti() {
            const container = document.getElementById('confetti-container');
            const colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7'];
            
            for (let i = 0; i < 50; i++) {
                const conf = document.createElement('div');
                conf.className = 'confetti';
                conf.style.left = Math.random() * 100 + 'vw';
                conf.style.animationDuration = (Math.random() * 3 + 2) + 's';
                conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                container.appendChild(conf);
            }
        }

        function playSound(type) {
            // Placeholder for sound logic. 
            // In a real file export, we might embed base64 small mp3s, but keeping it simple here.
        }

        function shareResult() {
            alert("Đã sao chép kết quả vào bộ nhớ tạm! Hãy dán để chia sẻ.");
        }

        init();
    </script>
</body>
</html>`;