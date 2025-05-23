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

    // Performance optimized navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Use Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Optimize by unobserving after animation
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            window.requestAnimationFrame(() => {
                handleScroll();
                scrollTimeout = null;
            });
            scrollTimeout = true;
        }
    });

    // Optimized theme toggle
    const theme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('dark-theme', theme === 'dark');
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '🌙' : '☀️';
    });

    // Link click handler with preloading
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            if (href && !link.dataset.preloaded) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'document';
                preloadLink.href = href;
                document.head.appendChild(preloadLink);
                link.dataset.preloaded = 'true';
            }
        });
    });

    // Handle navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const path = link.getAttribute('href');
            navigateTo(path);
        });
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

// Scroll performance optimization
function handleScroll() {
    const scrolled = window.pageYOffset;
    const nav = document.querySelector('.main-nav');
    nav.style.background = scrolled > 50 
        ? 'rgba(15, 23, 42, 0.9)' 
        : 'rgba(15, 23, 42, 0.7)';
}