document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    let loadedScripts = new Set();
    let loadedCSS = new Set();

    async function loadComponent(componentName, targetElement) {
        try {
            const response = await fetch(`components/${componentName}/${componentName}.html`);
            if (!response.ok) throw new Error(`Could not load ${componentName}.html`);
            targetElement.innerHTML = await response.text();
        } catch (error) {
            console.error('Failed to load component:', error);
            targetElement.innerHTML = `<p style="color: red; text-align: center;">Error: ${error.message}</p>`;
        }
    }

    function loadCSS(url) {
        if (!loadedCSS.has(url)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            document.head.appendChild(link);
            loadedCSS.add(url);
        }
    }

    function loadJS(url) {
        if (!loadedScripts.has(url)) {
            const script = document.createElement('script');
            script.src = url;
            script.defer = true;
            document.body.appendChild(script);
            loadedScripts.add(url);
        }
    }

    function unloadJS(url) {
        const scriptElement = document.querySelector(`script[src="${url}"]`);
        if (scriptElement) {
            scriptElement.remove();
            loadedScripts.delete(url);
        }
    }
    
    function clearComponentScripts() {
        unloadJS('components/welcome/welcome.js');
        unloadJS('components/dashboard/dashboard.js');
        unloadJS('components/sidebar-right/sidebar-right.js');
    }

    async function navigate(path) {
        app.innerHTML = ''; 
        clearComponentScripts();

        if (path === '/dashboard') {
            app.style.justifyContent = 'stretch';
            loadCSS('components/dashboard/dashboard.css');
            loadCSS('components/sidebar-right/sidebar-right.css');
            loadCSS('components/content-panes/panes.css');
            await loadComponent('dashboard', app);
            loadJS('components/sidebar-right/sidebar-right.js');
            loadJS('components/dashboard/dashboard.js');
        } else { // Default ke /welcome
            app.style.justifyContent = 'center';
            loadCSS('components/welcome/welcome.css');
            
            // --- PERBAIKAN ADA DI SINI ---
            // Path yang sebelumnya 'welcome/welcome' diubah menjadi 'welcome' saja.
            await loadComponent('welcome', app); 

            loadJS('components/welcome/welcome.js');
        }
    }

    const isLoggedIn = localStorage.getItem('walletLoggedIn') === 'true';
    navigate(isLoggedIn ? '/dashboard' : '/welcome');

    window.appNavigator = {
        goToDashboard: () => {
            localStorage.setItem('walletLoggedIn', 'true');
            navigate('/dashboard');
        },
        logout: () => {
            localStorage.removeItem('walletLoggedIn');
            navigate('/welcome');
        }
    };
});