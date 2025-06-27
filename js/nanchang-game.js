// 南昌起义指挥游戏逻辑
document.addEventListener('DOMContentLoaded', function() {
    const battleMap = document.getElementById('battle-map');
    const troopsEl = document.getElementById('troops');
    const controlEl = document.getElementById('control');
    const roundsEl = document.getElementById('rounds');
    const storyEl = document.querySelector('.game-story p');

    // 游戏状态
    const gameState = {
        troops: 2000,
        control: 30,
        rounds: 0,
        keyLocations: [
            { name: '南昌火车站', x: 150, y: 100, controlled: false },
            { name: '江西省政府', x: 400, y: 200, controlled: false },
            { name: '南昌卫戍司令部', x: 600, y: 300, controlled: false }
        ]
    };

    // 初始化游戏
    function initGame() {
        updateStatus();
        drawMap();
        
        // 事件监听
        document.getElementById('deploy-infantry').addEventListener('click', () => deployTroops('infantry'));
        document.getElementById('deploy-artillery').addEventListener('click', () => deployTroops('artillery'));
        document.getElementById('attack').addEventListener('click', launchAttack);
    }

    // 绘制地图
    function drawMap() {
        battleMap.innerHTML = '';
        
        // 绘制关键地点
        gameState.keyLocations.forEach(loc => {
            const marker = document.createElement('div');
            marker.className = 'location-marker';
            marker.style.left = `${loc.x - 15}px`;
            marker.style.top = `${loc.y - 15}px`;
            marker.style.backgroundColor = loc.controlled ? '#9A1F1A' : '#2A363B';
            marker.title = loc.name;
            battleMap.appendChild(marker);
        });
    }

    // 部署部队
    function deployTroops(type) {
        if (gameState.troops < 100) {
            alert('兵力不足！');
            return;
        }

        const cost = type === 'infantry' ? 100 : 150;
        gameState.troops -= cost;
        
        // 随机增加控制区域
        gameState.control += Math.floor(Math.random() * 5) + 5;
        if (gameState.control > 100) gameState.control = 100;
        
        updateStatus();
        storyEl.textContent = `成功部署${type === 'infantry' ? '步兵' : '炮兵'}部队！`;
    }

    // 发起进攻
    function launchAttack() {
        if (gameState.troops < 300) {
            alert('兵力不足，无法进攻！');
            return;
        }

        gameState.rounds++;
        let attackSuccess = false;

        // 检查是否控制所有关键地点
        if (gameState.control >= 70 && gameState.rounds >= 3) {
            gameState.keyLocations.forEach(loc => loc.controlled = true);
            attackSuccess = true;
        } else {
            // 随机进攻结果
            attackSuccess = Math.random() > 0.5;
            if (attackSuccess) {
                gameState.control += 15;
                gameState.troops -= 100;
            } else {
                gameState.troops = Math.floor(gameState.troops * 0.7);
            }
        }

        updateStatus();
        drawMap();
        
        if (attackSuccess) {
            storyEl.textContent = '进攻成功！控制区域扩大！';
        } else {
            storyEl.textContent = '进攻受阻，部队损失惨重！';
        }

        checkWinCondition();
    }

    // 更新状态
    function updateStatus() {
        troopsEl.textContent = gameState.troops;
        controlEl.textContent = gameState.control;
        roundsEl.textContent = gameState.rounds;
    }

    // 检查胜利条件
    function checkWinCondition() {
        const allControlled = gameState.keyLocations.every(loc => loc.controlled);
        if (allControlled) {
            alert('恭喜！成功占领南昌城，南昌起义取得胜利！');
        } else if (gameState.rounds >= 5) {
            alert('起义部队坚持了5个回合，为革命保留了火种！');
        }
    }

    initGame();
});
