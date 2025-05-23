// Handle navigation and URL routing
document.addEventListener('DOMContentLoaded', () => {
    const routes = {
        '/': '../pages/index.html',
        '/about': '../pages/about.html',
        '/projects': '../pages/projects.html',
        '/development': '../pages/development.html',
        '/store': '../pages/store.html'
    };

    // Inject navigation content
    const nav = document.querySelector('.main-nav');
    nav.innerHTML = `
        <div class="nav-container">
            <a href="/" class="logo">JaeTheTech</a>
            <div class="nav-links">
                <a href="/about" class="nav-link">About</a>
                <a href="/projects" class="nav-link">Projects</a>
                <a href="/development" class="nav-link">Development</a>
                <a href="/store" class="nav-link">Store</a>
            </div>
            <button class="theme-toggle">🌙</button>
        </div>
    `;

    // Handle navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const path = link.getAttribute('href');
            navigateTo(path);
        });
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '🌙' : '☀️';
    });

    // Handle browser navigation
    window.addEventListener('popstate', () => {
        loadContent(window.location.pathname);
    });

    function navigateTo(path) {
        window.history.pushState({}, '', path);
        loadContent(path);
    }

    async function loadContent(path) {
        try {
            const response = await fetch(routes[path]);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.querySelector('main').innerHTML;
            document.querySelector('main').innerHTML = content;
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    // Initialize current page
    const currentPath = window.location.pathname;
    if (routes[currentPath]) {
        loadContent(currentPath);
    }
});