// 初始化时间轴
document.addEventListener('DOMContentLoaded', function() {
    // 事件数据
    const events = [
        {
            id: 'xinhai',
            title: '辛亥革命',
            year: '1911',
            brief: '中国近代史上第一次完全意义上的资产阶级民主革命',
            image: 'image/wuchangqiyi.png'
        },
        {
            id: 'wusi',
            title: '五四运动', 
            year: '1919',
            brief: '中国新民主主义革命的开端',
            image: 'image/wusiyundong.png'
        },
        {
            id: 'nanhu',
            title: '南湖红船',
            year: '1921',
            brief: '中国共产党第一次全国代表大会',
            image: 'image/nanhuhongchuan.png'
        },
        {
            id: 'nanchang',
            title: '南昌起义',
            year: '1927',
            brief: '中国共产党独立领导武装斗争的开始',
            image: 'image/nanchangqiyi.png'
        },
        {
            id: 'changzheng',
            title: '红军长征',
            year: '1934-1936',
            brief: '中国工农红军的战略转移',
            image: 'image/changzheng.png'
        },
        {
            id: 'kangzhan',
            title: '抗日战争胜利',
            year: '1945',
            brief: '中国人民抗日战争的伟大胜利',
            image: 'image/kangzhanshengli.png'
        },
        {
            id: 'kaiguo',
            title: '开国大典',
            year: '1949',
            brief: '中华人民共和国成立',
            image: 'image/kaiguodadain.png'
        }
    ];

    const timeline = document.querySelector('.timeline');
    
    // 生成时间轴节点
    events.forEach(event => {
        const node = document.createElement('div');
        node.className = 'timeline-node';
        node.innerHTML = `
            <h3>${event.year} ${event.title}</h3>
            <p>${event.brief}</p>
            <a href="events/${event.id}.html">查看详情</a>
        `;
        timeline.appendChild(node);
    });
});
