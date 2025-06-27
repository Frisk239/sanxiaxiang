// 导航栏加载器
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        fetch('shared/nav.html')
            .then(response => response.text())
            .then(html => {
                navContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('导航栏加载失败:', error);
                navContainer.innerHTML = '<div class="nav-error">导航加载失败</div>';
            });
    }
});
