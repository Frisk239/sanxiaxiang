// 抗日战争战役游戏逻辑
document.addEventListener('DOMContentLoaded', function() {
    const warMap = document.getElementById('war-map');
    const ourTroopsEl = document.getElementById('our-troops');
    const enemyTroopsEl = document.getElementById('enemy-troops');
    const wonBattlesEl = document.getElementById('won-battles');
    const storyEl = document.querySelector('.game-story p');

    // 游戏状态
    const gameState = {
        ourTroops: 50000,
        enemyTroops: 80000,
        wonBattles: 0,
        currentBattle: 0,
        battles: [
            { name: "平型关大捷", difficulty: 1 },
            { name: "台儿庄战役", difficulty: 2 },
            { name: "百团大战", difficulty: 3 }
        ]
    };

    // 初始化游戏
    function initGame() {
        updateStatus();
        startBattle();
        
        // 事件监听
        document.getElementById('defend').addEventListener('click', () => battleAction('defend'));
        document.getElementById('attack').addEventListener('click', () => battleAction('attack'));
        document.getElementById('retreat').addEventListener('click', () => battleAction('retreat'));
    }

    // 开始战役
    function startBattle() {
        if (gameState.currentBattle >= gameState.battles.length) {
            endGame();
            return;
        }

        const battle = gameState.battles[gameState.currentBattle];
        storyEl.textContent = `当前战役：${battle.name} - 选择你的战术...`;
    }

    // 战斗行动
    function battleAction(action) {
        const battle = gameState.battles[gameState.currentBattle];
        let resultText = "";
        let isVictory = false;

        // 根据行动类型计算结果
        switch(action) {
            case 'defend':
                if (Math.random() > 0.3) {
                    const loss = Math.floor(gameState.ourTroops * 0.1);
                    const enemyLoss = Math.floor(gameState.enemyTroops * 0.15);
                    gameState.ourTroops -= loss;
                    gameState.enemyTroops -= enemyLoss;
                    resultText = `防御成功！我军损失${loss}人，敌军损失${enemyLoss}人`;
                    isVictory = Math.random() > 0.6;
                } else {
                    const loss = Math.floor(gameState.ourTroops * 0.2);
                    gameState.ourTroops -= loss;
                    resultText = `防御失利！我军损失${loss}人`;
                }
                break;
                
            case 'attack':
                if (Math.random() > 0.4) {
                    const loss = Math.floor(gameState.ourTroops * 0.15);
                    const enemyLoss = Math.floor(gameState.enemyTroops * 0.2);
                    gameState.ourTroops -= loss;
                    gameState.enemyTroops -= enemyLoss;
                    resultText = `进攻成功！我军损失${loss}人，敌军损失${enemyLoss}人`;
                    isVictory = Math.random() > 0.5;
                } else {
                    const loss = Math.floor(gameState.ourTroops * 0.25);
                    gameState.ourTroops -= loss;
                    resultText = `进攻受挫！我军损失${loss}人`;
                }
                break;
                
            case 'retreat':
                const loss = Math.floor(gameState.ourTroops * 0.05);
                gameState.ourTroops -= loss;
                resultText = `战略转移保存实力，我军损失${loss}人`;
                break;
        }

        // 检查战役结果
        if (isVictory) {
            gameState.wonBattles++;
            gameState.currentBattle++;
            resultText += `\n${battle.name}取得胜利！`;
        }

        updateStatus();
        storyEl.textContent = resultText;
        checkWinCondition();
    }

    // 更新状态
    function updateStatus() {
        ourTroopsEl.textContent = gameState.ourTroops;
        enemyTroopsEl.textContent = gameState.enemyTroops;
        wonBattlesEl.textContent = gameState.wonBattles;
    }

    // 检查胜利条件
    function checkWinCondition() {
        if (gameState.wonBattles >= 3) {
            endGame(true);
        } else if (gameState.ourTroops <= 0) {
            endGame(false);
        } else if (gameState.currentBattle < gameState.battles.length) {
            startBattle();
        }
    }

    // 结束游戏
    function endGame(isVictory) {
        if (isVictory) {
            alert("恭喜！成功指挥三大战役，取得抗日战争胜利！");
        } else {
            alert("我军伤亡惨重，未能完成战役目标...");
        }
    }

    initGame();
});
