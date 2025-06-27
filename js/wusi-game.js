// 五四运动游戏逻辑
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const studentsEl = document.getElementById('students');
    const supportEl = document.getElementById('support');
    const storyEl = document.getElementById('story-text');

    // 游戏状态
    const gameState = {
        students: 500,
        support: 30,
        days: 0
    };

    // 初始化游戏
    function initGame() {
        updateResources();
        drawScene();
        
        // 事件监听
        document.getElementById('publish').addEventListener('click', publishManifesto);
        document.getElementById('protest').addEventListener('click', organizeProtest);
        document.getElementById('recruit').addEventListener('click', recruitStudents);
    }

    // 绘制场景
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制背景
        ctx.fillStyle = '#F8F1E5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制学生人群
        const studentCount = Math.min(50, Math.floor(gameState.students / 10));
        for (let i = 0; i < studentCount; i++) {
            ctx.fillStyle = '#9A1F1A';
            ctx.beginPath();
            ctx.arc(
                100 + Math.random() * 600,
                100 + Math.random() * 300,
                5 + Math.random() * 5,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }

    // 发表宣言
    function publishManifesto() {
        if (gameState.students < 100) {
            storyEl.textContent = "学生人数不足，无法发表宣言！";
            return;
        }
        
        gameState.support += 5 + Math.floor(Math.random() * 10);
        gameState.days++;
        storyEl.textContent = "宣言发表成功！民众支持度上升！";
        updateResources();
        drawScene();
        checkWinCondition();
    }

    // 组织游行
    function organizeProtest() {
        if (gameState.students < 200) {
            storyEl.textContent = "学生人数不足，无法组织游行！";
            return;
        }
        
        const success = Math.random() > 0.3;
        if (success) {
            gameState.support += 15 + Math.floor(Math.random() * 20);
            storyEl.textContent = "游行成功！全国响应！支持度大幅上升！";
        } else {
            gameState.students = Math.floor(gameState.students * 0.8);
            storyEl.textContent = "游行遭到镇压，学生被捕！";
        }
        
        gameState.days++;
        updateResources();
        drawScene();
        checkWinCondition();
    }

    // 招募学生
    function recruitStudents() {
        const newStudents = 50 + Math.floor(Math.random() * 100);
        gameState.students += newStudents;
        gameState.days++;
        storyEl.textContent = `成功招募${newStudents}名新学生！`;
        updateResources();
        drawScene();
    }

    // 更新资源显示
    function updateResources() {
        studentsEl.textContent = gameState.students;
        supportEl.textContent = gameState.support;
    }

    // 检查胜利条件
    function checkWinCondition() {
        if (gameState.support >= 80) {
            storyEl.textContent = "恭喜！五四运动取得成功，唤醒了国民意识！";
        } else if (gameState.days >= 10) {
            storyEl.textContent = "运动持续10天，政府被迫让步！";
        }
    }

    initGame();
});
