// 辛亥革命游戏逻辑
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const troopsEl = document.getElementById('troops');
    const suppliesEl = document.getElementById('supplies');
    const storyEl = document.getElementById('story-text');

    // 游戏状态
    const gameState = {
        troops: 1000,
        supplies: 500,
        cities: {
            wuhan: { controlled: false, defense: 800 },
            nanjing: { controlled: false, defense: 1200 }
        }
    };

    // 初始化游戏
    function initGame() {
        updateResources();
        drawMap();
        
        // 事件监听
        document.getElementById('attackWuhan').addEventListener('click', () => attackCity('wuhan'));
        document.getElementById('attackNanjing').addEventListener('click', () => attackCity('nanjing'));
        document.getElementById('recruit').addEventListener('click', recruitTroops);
    }

    // 绘制地图
    function drawMap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制武汉
        ctx.fillStyle = gameState.cities.wuhan.controlled ? '#9A1F1A' : '#2A363B';
        ctx.fillRect(100, 200, 100, 100);
        ctx.fillText('武汉', 120, 260);
        
        // 绘制南京
        ctx.fillStyle = gameState.cities.nanjing.controlled ? '#9A1F1A' : '#2A363B';
        ctx.fillRect(500, 300, 100, 100);
        ctx.fillText('南京', 520, 360);
    }

    // 攻击城市
    function attackCity(city) {
        if (gameState.troops < 300) {
            storyEl.textContent = "兵力不足，无法进攻！";
            return;
        }
        
        const cityDefense = gameState.cities[city].defense;
        const success = Math.random() * gameState.troops > cityDefense * 0.7;
        
        if (success) {
            gameState.cities[city].controlled = true;
            storyEl.textContent = `成功占领${city === 'wuhan' ? '武汉' : '南京'}！革命取得重大进展！`;
            gameState.supplies += 200;
        } else {
            storyEl.textContent = `进攻${city === 'wuhan' ? '武汉' : '南京'}失败，损失惨重！`;
            gameState.troops = Math.floor(gameState.troops * 0.7);
        }
        
        updateResources();
        drawMap();
        checkWinCondition();
    }

    // 招募新军
    function recruitTroops() {
        if (gameState.supplies < 100) {
            storyEl.textContent = "物资不足，无法招募新军！";
            return;
        }
        
        gameState.troops += 200;
        gameState.supplies -= 100;
        storyEl.textContent = "成功招募200名新军！";
        updateResources();
    }

    // 更新资源显示
    function updateResources() {
        troopsEl.textContent = gameState.troops;
        suppliesEl.textContent = gameState.supplies;
    }

    // 检查胜利条件
    function checkWinCondition() {
        if (gameState.cities.wuhan.controlled && gameState.cities.nanjing.controlled) {
            storyEl.textContent = "恭喜！成功推翻清朝统治，辛亥革命取得胜利！";
        }
    }

    initGame();
});
