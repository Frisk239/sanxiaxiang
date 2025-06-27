// 南湖红船问答游戏逻辑
document.addEventListener('DOMContentLoaded', function() {
    const questionEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const accuracyEl = document.getElementById('accuracy');
    const awarenessEl = document.getElementById('awareness');

    // 游戏状态
    const gameState = {
        currentQuestion: 0,
        correctAnswers: 0,
        awareness: 0,
        questions: [
            {
                question: "中国共产党第一次全国代表大会最初在哪里召开？",
                options: ["北京", "上海", "广州", "武汉"],
                answer: 1
            },
            {
                question: "一大最后一天会议转移到哪里举行？",
                options: ["西湖游船", "南湖红船", "太湖渔船", "洞庭湖画舫"],
                answer: 1
            },
            {
                question: "一大召开的时间是？",
                options: ["1919年7月", "1921年7月", "1923年7月", "1925年7月"],
                answer: 1
            },
            {
                question: "一大选举产生的中央局书记是谁？",
                options: ["李大钊", "陈独秀", "毛泽东", "董必武"],
                answer: 1
            },
            {
                question: "一大通过了什么重要文件？",
                options: ["《中国共产党宣言》", "《中国共产党纲领》", "《中国共产党章程》", "《中国共产党决议》"],
                answer: 1
            }
        ]
    };

    // 初始化游戏
    function initGame() {
        showQuestion();
        updateProgress();
    }

    // 显示问题
    function showQuestion() {
        if (gameState.currentQuestion >= gameState.questions.length) {
            endGame();
            return;
        }

        const q = gameState.questions[gameState.currentQuestion];
        questionEl.textContent = q.question;
        
        optionsContainer.innerHTML = '';
        q.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => checkAnswer(index));
            optionsContainer.appendChild(btn);
        });
    }

    // 检查答案
    function checkAnswer(selectedIndex) {
        const q = gameState.questions[gameState.currentQuestion];
        const isCorrect = selectedIndex === q.answer;
        
        if (isCorrect) {
            gameState.correctAnswers++;
            gameState.awareness += 20;
            alert("回答正确！");
        } else {
            alert(`回答错误！正确答案是：${q.options[q.answer]}`);
        }

        gameState.currentQuestion++;
        updateProgress();
        showQuestion();
    }

    // 更新进度
    function updateProgress() {
        const accuracy = gameState.currentQuestion > 0 
            ? Math.round((gameState.correctAnswers / gameState.currentQuestion) * 100)
            : 0;
            
        accuracyEl.textContent = accuracy;
        awarenessEl.textContent = gameState.awareness;
    }

    // 结束游戏
    function endGame() {
        questionEl.textContent = "问答结束！";
        optionsContainer.innerHTML = '';
        
        if (gameState.awareness >= 80) {
            alert(`恭喜！您的觉悟值达到${gameState.awareness}，深刻理解了建党历史！`);
        } else {
            alert(`您的觉悟值为${gameState.awareness}，建议多学习党史知识。`);
        }
    }

    initGame();
});
