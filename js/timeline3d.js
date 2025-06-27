// 3D时间轴实现
document.addEventListener('DOMContentLoaded', function() {
    // 初始化Three.js场景
    const container = document.getElementById('timeline-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // 创建场景、相机和渲染器
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 添加轨道控制器
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 创建红色飘带时间轴
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(-5, 3, -5),
        new THREE.Vector3(0, 6, 0),
        new THREE.Vector3(5, 3, 5),
        new THREE.Vector3(10, 0, 0)
    ]);

    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.5, 20, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x9a1f1a,
        transparent: true,
        opacity: 0.8
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);

    // 加载历史事件图片
    const events = [
        { id: 'xinhai', position: 0, image: 'image/wuchangqiyi.png', title: '辛亥革命' },
        { id: 'wusi', position: 0.2, image: 'image/wusiyundong.png', title: '五四运动' },
        { id: 'nanhu', position: 0.35, image: 'image/nanhuhongchuan.png', title: '南湖红船' },
        { id: 'nanchang', position: 0.5, image: 'image/nanchangqiyi.png', title: '南昌起义' },
        { id: 'changzheng', position: 0.65, image: 'image/changzheng.png', title: '红军长征' },
        { id: 'kangzhan', position: 0.8, image: 'image/kangzhanshengli.png', title: '抗战胜利' },
        { id: 'kaiguo', position: 1, image: 'image/kaiguodadain.png', title: '开国大典' }
    ];

    // 创建图片精灵
    const loader = new THREE.TextureLoader();
    events.forEach(event => {
        loader.load(event.image, texture => {
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            
            // 获取曲线上的位置
            const point = curve.getPoint(event.position);
            sprite.position.copy(point);
            sprite.scale.set(3, 2, 1);
            
            // 添加点击事件
            sprite.userData = { url: `events/${event.id}.html` };
            scene.add(sprite);
            
            // 添加标题标签
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 128;
            const context = canvas.getContext('2d');
            context.fillStyle = 'rgba(154, 31, 26, 0.8)';
            context.fillRect(0, 0, 256, 128);
            context.font = '24px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText(event.title, 128, 64);
            
            const labelTexture = new THREE.CanvasTexture(canvas);
            const labelMaterial = new THREE.SpriteMaterial({ map: labelTexture });
            const label = new THREE.Sprite(labelMaterial);
            label.position.copy(point);
            label.position.y -= 1.5;
            label.scale.set(3, 1, 1);
            scene.add(label);
        });
    });

    // 设置相机位置
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // 添加点击事件
    window.addEventListener('click', (event) => {
        const mouse = new THREE.Vector2(
            (event.clientX / width) * 2 - 1,
            -(event.clientY / height) * 2 + 1
        );
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0 && intersects[0].object.userData.url) {
            window.location.href = intersects[0].object.userData.url;
        }
    });

    // 响应窗口大小变化
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
});
