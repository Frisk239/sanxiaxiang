// 红军长征路线游戏逻辑
document.addEventListener('DOMContentLoaded', function() {
    const routeMap = document.getElementById('route-map');
    const troopsEl = document.getElementById('troops');
    const foodEl = document.getElementById('food');
    const distanceEl = document.getElementById('distance');
    const daysEl = document.getElementById('days');
    const storyEl = document.querySelector('.game-story p');

    // 游戏状态
    const gameState = {
        troops: 80000,
        food: 5000,
        distance: 0,
        days: 365,
        keyPoints: [
            { name: '瑞金', x: 100, y: 400, passed: false },
            { name: '遵义', x: 300, y: 300, passed: false },
            { name: '泸定桥', x: 400, y: 200, passed: false },
            { name: '雪山', x: 500, y: 100, passed: false },
            { name: '草地', x: 600, y: 150, passed: false },
            { name: '延安', x: 700, y: 50, passed: false }
        ]
    };

    // 初始化游戏
    function initGame() {
        updateResources();
        drawRoutePoints();
        
        // 添加路线点点击事件
        document.querySelectorAll('.route-point').forEach(point => {
            point.addEventListener('click', () => moveToPoint(point.dataset.index));
        });
    }

    // 绘制路线点
    function drawRoutePoints() {
        routeMap.innerHTML = '';
        
        gameState.keyPoints.forEach((point, index) => {
            const marker = document.createElement('div');
            marker.className = 'route-point';
            marker.style.left = `${point.x}px`;
            marker.style.top = `${point.y}px`;
            marker.title = point.name;
            marker.dataset.index = index;
            routeMap.appendChild(marker);
        });
    }

    // 移动到指定地点
    function moveToPoint(index) {
        if (gameState.days <= 0 || gameState.troops <= 0) {
            alert('游戏结束！');
            return;
        }

        const point = gameState.keyPoints[index];
        if (point.passed) return;

        // 计算消耗
        const distance = calculateDistance(index);
        const foodCost = distance * gameState.troops / 1000;
        const troopLoss = Math.floor(Math.random() * 500) + 500;

        if (gameState.food < foodCost) {
            alert('粮食不足，无法继续行军！');
            return;
        }

        // 更新状态
        point.passed = true;
        gameState.distance += distance;
        gameState.days -= distance / 50;
        gameState.food -= foodCost;
        gameState.troops -= troopLoss;

        // 随机事件
        const event = getRandomEvent();
        storyEl.textContent = event;

        updateResources();
        checkWinCondition();
    }

    // 计算距离
    function calculateDistance(index) {
        if (index === 0) return 0;
        const prevPoint = gameState.keyPoints.find((p, i) => i < index && !p.passed);
        if (!prevPoint) return 100 + Math.floor(Math.random() * 400);
        return Math.sqrt(Math.pow(prevPoint.x - gameState.keyPoints[index].x, 2) + 
                        Math.pow(prevPoint.y - gameState.keyPoints[index].y, 2));
    }

    // 随机事件
    function getRandomEvent() {
        const events = [
            `成功突破封锁，但损失${Math.floor(Math.random() * 1000)}名战士`,
            '遭遇敌军伏击，损失惨重！',
            '获得当地群众支援，补充部分粮食',
            '恶劣天气导致行军困难',
            '召开重要会议，确定下一步行动计划'
        ];
        return events[Math.floor(Math.random() * events.length)];
    }

    // 更新资源显示
    function updateResources() {
        troopsEl.textContent = gameState.troops;
        foodEl.textContent = Math.floor(gameState.food);
        distanceEl.textContent = Math.floor(gameState.distance);
        daysEl.textContent = Math.floor(gameState.days);
    }

    // 检查胜利条件
    function checkWinCondition() {
        if (gameState.keyPoints.every(p => p.passed)) {
            alert(`恭喜！成功完成长征，保存了${gameState.troops}名革命火种！`);
        } else if (gameState.troops <= 0) {
            alert('红军全军覆没，长征失败！');
        } else if (gameState.days <= 0) {
            alert('时间耗尽，未能完成长征！');
        }
    }

    initGame();
});
