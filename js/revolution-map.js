// 革命事件坐标配置
const revolutionEvents = [
    {
        id: 'xinhai',
        name: '辛亥革命',
        coords: [30.52, 114.31],
        icon: 'flag',
        routes: []
    },
    {
        id: 'wusi',
        name: '五四运动',
        coords: [39.90, 116.40],
        icon: 'users',
        routes: []
    },
    {
        id: 'nanhu',
        name: '南湖红船',
        coords: [30.77, 120.76],
        icon: 'ship',
        routes: []
    },
    {
        id: 'nanchang',
        name: '南昌起义',
        coords: [28.68, 115.89],
        icon: 'gun',
        routes: []
    },
    {
        id: 'changzheng',
        name: '红军长征',
        coords: [25.89, 116.03],
        icon: 'boot',
        routes: [
            [25.89, 116.03], // 瑞金
            [26.57, 106.71], // 遵义
            [30.67, 104.06], // 成都
            [36.03, 103.82]  // 延安
        ]
    },
    {
        id: 'kangzhan',
        name: '抗日战争',
        coords: [39.85, 116.22],
        icon: 'crosshairs',
        routes: []
    },
    {
        id: 'kaiguo',
        name: '开国大典',
        coords: [39.91, 116.40],
        icon: 'star',
        routes: []
    }
];

// 初始化地图
document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('revolution-map').setView([35, 108], 5);
    
    // 加载中国地图GeoJSON
    fetch('china.json')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: '#666',
                    weight: 1,
                    fillOpacity: 0.1
                }
            }).addTo(map);
            
            // 添加革命事件标记
            addRevolutionMarkers(map);
        });
});

// 添加革命事件标记
function addRevolutionMarkers(map) {
    revolutionEvents.forEach(event => {
        // 创建自定义图标
        const icon = L.divIcon({
            html: `<i class="fas fa-${event.icon}" style="color:#9A1F1A;font-size:24px;"></i>`,
            className: 'custom-marker',
            iconSize: [30, 30]
        });
        
        // 创建标记
        const marker = L.marker(event.coords, { icon })
            .addTo(map)
            .on('mouseover', () => {
                // 显示路线动画
                if(event.routes.length > 0) {
                    const polyline = L.polyline(event.routes, {
                        color: '#9A1F1A',
                        weight: 3,
                        dashArray: '10, 10'
                    }).addTo(map);
                    
                    // 动画效果
                    const length = polyline._path.getTotalLength();
                    polyline._path.style.strokeDashoffset = length;
                    polyline._path.style.strokeDasharray = length;
                    
                    gsap.to(polyline._path, {
                        strokeDashoffset: 0,
                        duration: 3,
                        onComplete: () => {
                            map.removeLayer(polyline);
                        }
                    });
                }
            });
        
        // 绑定弹出窗口
        marker.bindPopup(`
            <div class="event-card">
                <h3>${event.name}</h3>
                <i class="fas fa-${event.icon}"></i>
                <button class="explore-btn" onclick="window.location.href='events/${event.id}.html'">
                    点击探索
                </button>
            </div>
        `);
    });
}
