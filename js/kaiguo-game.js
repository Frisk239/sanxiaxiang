// 开国大典模拟游戏逻辑
document.addEventListener('DOMContentLoaded', function() {
    const ceremonyScene = document.getElementById('ceremony-scene');
    const progressEl = document.getElementById('progress');
    const storyEl = document.querySelector('.game-story p');

    // 游戏状态
    const gameState = {
        progress: 0,
        steps: [
            { 
                name: '筹备工作',
                description: '布置天安门广场，准备升旗仪式...',
                action: 'prepare',
                progress: 30
            },
            {
                name: '开始典礼',
                description: '奏国歌，举行升旗仪式...',
                action: 'start', 
                progress: 60
            },
            {
                name: '主席讲话',
                description: '毛泽东主席宣布中华人民共和国成立...',
                action: 'speech',
                progress: 100
            }
        ],
        currentStep: 0
    };

    // 初始化游戏
    function initGame() {
        updateScene();
        
        // 事件监听
        document.getElementById('prepare').addEventListener('click', () => performAction('prepare'));
        document.getElementById('start').addEventListener('click', () => performAction('start'));
        document.getElementById('speech').addEventListener('click', () => performAction('speech'));
    }

    // 执行动作
    function performAction(action) {
        const step = gameState.steps[gameState.currentStep];
        if (step.action !== action) {
            alert('请按正确顺序完成典礼步骤！');
            return;
        }

        gameState.progress = step.progress;
        gameState.currentStep++;
        
        updateScene();
        updateProgress();
        
        if (gameState.currentStep >= gameState.steps.length) {
            endCeremony();
        } else {
            storyEl.textContent = `下一步：${gameState.steps[gameState.currentStep].name}`;
        }
    }

    // 更新场景
    function updateScene() {
        ceremonyScene.innerHTML = '';
        
        // 根据进度显示不同元素
        if (gameState.progress >= 30) {
            const flagpole = document.createElement('div');
            flagpole.className = 'flagpole';
            flagpole.style.left = '400px';
            flagpole.style.top = '100px';
            ceremonyScene.appendChild(flagpole);
        }
        
        if (gameState.progress >= 60) {
            const crowd = document.createElement('div');
            crowd.className = 'crowd';
            crowd.style.bottom = '0';
            crowd.style.left = '0';
            crowd.style.width = '100%';
            ceremonyScene.appendChild(crowd);
        }
    }

    // 更新进度
    function updateProgress() {
        progressEl.textContent = gameState.progress;
    }

    // 结束典礼
    function endCeremony() {
        storyEl.textContent = '开国大典圆满成功！中华人民共和国成立了！';
        alert('恭喜！成功完成开国大典模拟！');
    }

    initGame();
});
