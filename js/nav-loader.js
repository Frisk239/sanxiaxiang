// 导航栏加载器
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        fetch('../shared/nav.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                navContainer.innerHTML = html;
                // 强制重绘解决部分浏览器渲染问题
                navContainer.style.display = 'none';
                navContainer.offsetHeight; // 触发重排
                navContainer.style.display = '';
            })
            .catch(error => {
                console.error('导航栏加载失败:', error);
                navContainer.innerHTML = `
                    <nav class="main-nav">
                        <div class="nav-logo">中国革命关键历史节点</div>
                        <div class="nav-links">
                            <a href="../index.html">首页</a>
                            <a href="../events/xinhai.html">辛亥革命</a>
                            <a href="../events/wusi.html">五四运动</a>
                            <a href="../events/nanhu.html">中共一大</a>
                            <a href="../events/nanchang.html">南昌起义</a>
                            <a href="../events/changzheng.html">红军长征</a>
                            <a href="../events/kangzhan.html">抗战胜利</a>
                            <a href="../events/kaiguo.html">开国大典</a>
                        </div>
                    </nav>
                `;
            });
    }
});
