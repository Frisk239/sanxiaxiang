// 南昌起义时间线游戏 - Phaser实现
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    parent: 'game-area',
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

// 游戏数据
const events = [
    { id: 1, text: "中共中央决定发动武装起义", date: "1927-07-12", image: "decision" },
    { id: 2, text: "起义部队秘密集结南昌", date: "1927-07-27", image: "gathering" },
    { id: 3, text: "成立前敌委员会", date: "1927-07-27", image: "committee" },
    { id: 4, text: "南昌起义爆发", date: "1927-08-01", image: "uprising" },
    { id: 5, text: "起义军撤离南昌", date: "1927-08-03", image: "retreat" }
];

function preload() {
    // 加载资源
    this.load.image('background', '../image/nanchangqiyi.png');
    events.forEach(event => {
        this.load.image(event.image, `../image/${event.image}.png`);
    });
    
    // 加载音效
    this.load.audio('correct', ['../audio/correct.mp3', '../audio/correct.ogg']);
    this.load.audio('wrong', ['../audio/wrong.mp3', '../audio/wrong.ogg']);
    this.load.audio('complete', ['../audio/complete.mp3', '../audio/complete.ogg']);
}

function create() {
    // 创建背景
    this.add.image(400, 250, 'background').setAlpha(0.3);
    
    // 创建时间轴
    const timeline = this.add.graphics();
    timeline.lineStyle(4, 0x9A1F1A, 1);
    timeline.beginPath();
    timeline.moveTo(100, 400);
    timeline.lineTo(700, 400);
    timeline.strokePath();
    
    // 创建时间轴标记
    events.forEach((event, index) => {
        this.add.text(100 + index * 150, 420, event.date, {
            fontSize: '12px',
            color: '#9A1F1A'
        }).setOrigin(0.5);
    });

    // 创建事件卡片
    const shuffledEvents = Phaser.Utils.Array.Shuffle([...events]);
    shuffledEvents.forEach((event, index) => {
        const card = this.add.container(150 + index * 120, 300);
        const bg = this.add.rectangle(0, 0, 100, 150, 0xFFFFFF)
            .setInteractive()
            .setData('id', event.id);
        
        // 添加事件图片
        const img = this.add.image(0, -30, event.image)
            .setDisplaySize(80, 80);
        
        // 添加事件文本
        const text = this.add.text(0, 40, event.text, { 
            fontSize: '12px', 
            color: '#000000',
            wordWrap: { width: 90 }
        }).setOrigin(0.5);
        
        card.add([bg, img, text]);
        this.input.setDraggable(card);
    });

    // 提示系统
    function showHint(scene) {
        const cards = scene.children.getChildren();
        const misplacedCards = cards.filter(card => {
            if (card.getData && card.y === 400) {
                const eventId = card.getData('id');
                const expectedX = 100 + (eventId - 1) * 150;
                return Math.abs(card.x - expectedX) > 10;
            }
            return false;
        });

        if (misplacedCards.length > 0) {
            const randomCard = Phaser.Utils.Array.GetRandom(misplacedCards);
            const eventId = randomCard.getData('id');
            const correctPos = 100 + (eventId - 1) * 150;
            
            scene.tweens.add({
                targets: randomCard,
                x: correctPos,
                y: 400,
                duration: 500,
                ease: 'Power2'
            });
            
            scene.add.text(400, 150, `提示：${events[eventId-1].text}应放在${events[eventId-1].date}位置`, {
                fontSize: '16px',
                color: '#9A1F1A',
                backgroundColor: '#FFFFFF',
                padding: 10
            }).setOrigin(0.5).setAlpha(0).setDepth(10)
              .setInteractive()
              .on('pointerdown', text => text.destroy())
              .on('pointerover', text => text.setAlpha(1))
              .on('pointerout', text => text.setAlpha(0));
        }
    }

    // 提示按钮
    const hintButton = this.add.text(750, 50, '提示', {
        fontSize: '16px',
        color: '#FFFFFF',
        backgroundColor: '#9A1F1A',
        padding: { x: 10, y: 5 }
    }).setInteractive()
      .on('pointerdown', () => showHint(this));
    
    // 拖拽逻辑
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
    
    // 验证逻辑
    this.input.on('dragend', (pointer, gameObject) => {
        if (gameObject.y > 370 && gameObject.y < 430) {
            const eventId = gameObject.getData('id');
            const correctPos = 100 + (eventId - 1) * 150;
            
            this.tweens.add({
                targets: gameObject,
                x: correctPos,
                y: 400,
                duration: 300,
                ease: 'Power2',
                onComplete: () => {
                    this.sound.play('correct');
                    checkCompletion(this);
                }
            });
        } else {
            this.tweens.add({
                targets: gameObject,
                x: gameObject.input.dragStartX,
                y: gameObject.input.dragStartY,
                duration: 300,
                ease: 'Power2'
            });
        }
    });

    // 胜利检测
    function checkCompletion(scene) {
        const cards = scene.children.getChildren();
        let correctCount = 0;
        
        cards.forEach(card => {
            if (card.getData && card.y === 400) {
                const eventId = card.getData('id');
                const expectedX = 100 + (eventId - 1) * 150;
                if (Math.abs(card.x - expectedX) < 10) {
                    correctCount++;
                }
            }
        });

        if (correctCount === events.length) {
            scene.sound.play('complete');
            
            // 胜利文字
            const congrats = scene.add.text(400, 100, '恭喜！正确排序了南昌起义关键事件！', {
                fontSize: '24px',
                color: '#9A1F1A'
            }).setOrigin(0.5).setAlpha(0);
            
            // 文字动画
            scene.tweens.add({
                targets: congrats,
                alpha: 1,
                duration: 1000,
                ease: 'Power2'
            });

            // 烟花粒子效果
            const particles = scene.add.particles('background');
            particles.createEmitter({
                x: 400,
                y: 100,
                speed: { min: -300, max: 300 },
                angle: { min: 0, max: 360 },
                scale: { start: 0.5, end: 0 },
                blendMode: 'ADD',
                active: true,
                lifespan: 1500,
                gravityY: 300,
                quantity: 10,
                frequency: 100,
                tint: [0xFF0000, 0xFFFF00, 0x00FF00, 0x0000FF]
            });
        }
    }
}
