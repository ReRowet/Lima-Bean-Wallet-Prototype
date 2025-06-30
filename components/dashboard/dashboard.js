const mainContentArea = document.getElementById('main-content-area');

async function loadContentPane(paneName) {
    try {
        const response = await fetch(`components/content-panes/${paneName}.html`);
        if (!response.ok) throw new Error(`Could not load ${paneName}.html`);
        mainContentArea.innerHTML = await response.text();
    } catch (error) {
        console.error('Failed to load content pane:', error);
        mainContentArea.innerHTML = `<p>Error loading content.</p>`;
    }
}

function changeTab(tabId) {
    document.querySelectorAll('.menu-item').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeMenuItem = document.querySelector(`.menu-item[data-tab="${tabId}"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }
    
    loadContentPane(tabId);
    
    if (window.updateSidebar) {
        window.updateSidebar(tabId);
    }
}

// === EVENT LISTENERS ===

// Menu Item Clicks
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const tabId = item.getAttribute('data-tab');
        changeTab(tabId);
    });
});

// Theme Toggle
document.querySelector('.theme-toggle').addEventListener('click', (e) => {
    document.body.classList.toggle('dark-mode');
    const toggle = e.currentTarget;
    const icon = toggle.querySelector('i');
    const text = toggle.querySelector('span');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        text.textContent = 'Toggle Light Mode';
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        text.textContent = 'Toggle Dark Mode';
    }
});

// Balance Visibility Toggle
document.getElementById('toggleBalance').addEventListener('click', (e) => {
    const icon = e.currentTarget;
    const balanceContainer = icon.parentElement;
    const balanceSpan = balanceContainer.querySelector('span');
    
    if (icon.classList.contains('fa-eye-slash')) {
        balanceSpan.textContent = '*****';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        balanceSpan.textContent = balanceContainer.getAttribute('data-balance');
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    }
});

// Header Wallet Address Copy
document.querySelector('.wallet-address').addEventListener('click', (e) => {
    const addressElement = e.currentTarget;
    navigator.clipboard.writeText('0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t');
    
    const originalHTML = addressElement.innerHTML;
    addressElement.innerHTML = '<span class="text-success"><i class="fas fa-check"></i> Copied!</span>';
    
    setTimeout(() => {
        addressElement.innerHTML = originalHTML;
    }, 2000);
});

// Event Delegation for dynamically loaded content in main area
mainContentArea.addEventListener('click', (event) => {
    // Logout Button
    if (event.target.matches('.logout-btn')) {
        window.appNavigator.logout();
    }

    // Copy Address Button in Receive Pane
    if (event.target.matches('#receipt-content .copy-btn, #receipt-content .copy-btn *')) {
        const btn = event.target.closest('.copy-btn');
        const addressField = document.querySelector('#receipt-content .input-field');
        navigator.clipboard.writeText(addressField.value);

        const originalBtnText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('btn-success'); 

        setTimeout(() => {
            btn.innerHTML = originalBtnText;
            btn.classList.remove('btn-success');
        }, 2000);
    }
    
    // BeanEmoji Card Selection
    if(event.target.matches('.beanemoji-card, .beanemoji-card *')) {
        const card = event.target.closest('.beanemoji-card');
        document.querySelectorAll('.beanemoji-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const emoji = card.dataset.emoji;
        const emojiName = card.dataset.name;
        const sidebarInfoCard = document.getElementById('selected-beanemoji-info');
        if (sidebarInfoCard) {
            sidebarInfoCard.style.display = 'block';
            sidebarInfoCard.innerHTML = `
                <div class="selected-emoji-display">
                    <div class="beanemoji-icon">${emoji}</div>
                    <div class="beanemoji-name">${emojiName}</div>
                </div>
                <p><strong>Mint Cost:</strong> 0.01 ETH</p>
                <p class="text-gray">~ $34.20</p>
                <button class="btn-sm mt-2">Proceed to Mint</button>
            `;
        }
    }
});

// Initial Load
changeTab('send');