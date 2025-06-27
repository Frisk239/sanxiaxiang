// 粒子系统配置
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子系统
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 200,
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": "#9a1f1a"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true
            },
            "size": {
                "value": 0.3,
                "random": false
            },
            "line_linked": {
                "enable": true,
                "distance": 100,
                "color": "#9a1f1a",
                "opacity": 0.3,
                "width": 0.5
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                }
            }
        }
    });

    // 历史事件配置
    const events = [
        { id: 'xinhai', x: 20, y: 30, title: '辛亥革命', color: '#ff3333', size: 5 },
        { id: 'wusi', x: 40, y: 60, title: '五四运动', color: '#ff6666', size: 5 },
        { id: 'nanhu', x: 60, y: 30, title: '南湖红船', color: '#ff9999', size: 5 },
        { id: 'nanchang', x: 20, y: 70, title: '南昌起义', color: '#ff3333', size: 5 },
        { id: 'changzheng', x: 80, y: 50, title: '红军长征', color: '#ff6666', size: 5 },
        { id: 'kangzhan', x: 50, y: 80, title: '抗日战争', color: '#ff9999', size: 5 },
        { id: 'kaiguo', x: 70, y: 20, title: '开国大典', color: '#ff3333', size: 5 }
    ];

    // 创建事件粒子簇
    events.forEach(event => {
        const el = document.createElement('div');
        el.className = 'event-label';
        el.innerHTML = `★ ${event.title} ★<br><small>点击探索</small>`;
        el.style.left = `${event.x}%`;
        el.style.top = `${event.y}%`;
        el.style.fontWeight = 'bold';
        el.style.textAlign = 'center';
        document.body.appendChild(el);

        // 添加脉动动画
        gsap.to(el, {
            scale: 1.1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // 添加交互效果
        const area = document.createElement('div');
        area.className = 'event-area';
        area.style.position = 'absolute';
        area.style.width = '100px';
        area.style.height = '100px';
        area.style.left = `calc(${event.x}% - 50px)`;
        area.style.top = `calc(${event.y}% - 50px)`;
        area.style.cursor = 'pointer';
        document.body.appendChild(area);

        // 鼠标交互
        area.addEventListener('mouseenter', () => {
            gsap.to(el, { opacity: 1, duration: 0.3 });
            particlesJS('particles-js', {
                particles: {
                    color: { value: event.color },
                    line_linked: { color: event.color }
                }
            });
        });

        area.addEventListener('mouseleave', () => {
            gsap.to(el, { opacity: 0, duration: 0.3 });
        });

        // 点击跳转
        area.addEventListener('click', () => {
            gsap.to(area, { 
                scale: 1.5, 
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    window.location.href = `events/${event.id}.html`;
                }
            });
        });
    });
});
