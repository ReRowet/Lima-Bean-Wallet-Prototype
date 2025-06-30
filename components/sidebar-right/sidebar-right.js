function updateSidebar(tabId) {
    const sidebar = document.getElementById('dynamic-sidebar');
    if (!sidebar) return;

    let content = '';
    switch (tabId) {
        case 'send':
            content = `
                <h3 class="sidebar-title">Transaction Summary</h3>
                <div class="sidebar-info-card">
                    <h4>Sending</h4>
                    <p><strong>Amount:</strong> <span id="sidebar-send-amount">0.00 BEANX</span></p>
                    <p><strong>Recipient:</strong> <span id="sidebar-send-address">Enter address</span></p>
                    <p><strong>Gas Fee:</strong> <span id="sidebar-send-gas">0.001 BEANX</span></p>
                </div>
                <div class="sidebar-info-card mt-3">
                    <h4 class="sidebar-title">Recent Activity</h4>
                    <div class="transaction-item">
                        <h3>Sent 0.15 BEANX</h3>
                        <p>To: BEANX:0x4d5...6e7f</p>
                        <p class="text-gray">15 mins ago</p>
                    </div>
                </div>`;
            break;
        case 'swap':
            content = `
                <h3 class="sidebar-title">Swap Details</h3>
                <div class="sidebar-info-card">
                    <p><strong>Exchange Rate:</strong> 1 BEANX</p>
                    <p><strong>Fee:</strong> 0.3%</p>
                    <p><strong>Slippage Tolerance:</strong> 0.5%</p>
                </div>
                <div class="sidebar-info-card mt-3">
                    <h4 class="sidebar-title">What is Swapping?</h4>
                    <p class="text-gray">Swap allows you to exchange one cryptocurrency for another directly within your wallet.</p>
                </div>`;
            break;
        case 'receive':
            content = `
                <h3 class="sidebar-title">Receive Assets Info</h3>
                <div class="sidebar-info-card">
                    <p>Scan this QR code or copy the address to receive crypto assets to your wallet.</p>
                    <p class="text-gray">Ensure the correct network is selected for transfers.</p>
                </div>`;
            break;
        case 'mint':
            content = `
                <h3 class="sidebar-title">Minting Tokens</h3>
                <div class="sidebar-info-card">
                    <p>Minting creates new tokens on the blockchain. You'll need to pay a small gas fee for this transaction.</p>
                    <p class="text-gray">Make sure all details are correct before minting.</p>
                </div>`;
            break;
        case 'beanemoji':
            content = `
                <h3 class="sidebar-title">Selected BeanEmoji</h3>
                <div id="selected-beanemoji-info" class="sidebar-info-card" style="display: none;"></div>
                <div class="sidebar-info-card mt-3">
                    <h4 class="sidebar-title">About BeanEmojis</h4>
                    <p class="text-gray">BeanEmojis are unique digital collectibles (NFTs) on the blockchain. Collect them all!</p>
                </div>`;
            break;
        case 'mybeanemoji':
            content = `
                <h3 class="sidebar-title">Your BeanEmoji Collection</h3>
                <div class="sidebar-info-card">
                    <p>Browse your owned BeanEmojis. You can send them to other wallets or list them for sale (coming soon).</p>
                </div>`;
            break;
        case 'faucet':
            content = `
                <h3 class="sidebar-title">Faucet Info</h3>
                <div class="sidebar-info-card">
                    <p>Use the faucet to get test tokens for free. These tokens have no real-world value and are for testing purposes only.</p>
                    <p class="text-gray">Requests are limited to once every 24 hours per address.</p>
                </div>`;
            break;
        case 'my-assets':
            content = `
                <h3 class="sidebar-title">Asset Overview</h3>
                <div class="sidebar-info-card">
                    <p>View all your cryptocurrency and token holdings here. Track their values and manage your portfolio.</p>
                    <p class="text-gray">Prices are updated every 5 seconds.</p>
                </div>`;
            break;
        case 'dapps':
            content = `
                <h3 class="sidebar-title">Explore DApps</h3>
                <div class="sidebar-info-card">
                    <p>Decentralized applications (DApps) offer a wide range of services and experiences directly on the blockchain.</p>
                    <p class="text-gray">Connect your wallet to interact securely.</p>
                </div>`;
            break;
        case 'settings':
            content = `
                <h3 class="sidebar-title">Wallet Configuration</h3>
                <div class="sidebar-info-card">
                    <p>Manage your wallet's security, privacy, and display preferences.</p>
                    <p class="text-gray">Always keep your recovery phrase safe and never share it.</p>
                </div>`;
            break;
        default:
            content = `
                <h3 class="sidebar-title">Recent Activity</h3>
                <div class="transaction-item">
                    <h3>Sent 0.15 BEANX</h3>
                    <p>To: BEANX:0x4d5...6e7f</p>
                    <p class="text-gray">15 mins ago</p>
                </div>`;
    }
    sidebar.innerHTML = content;
}

// Make the function globally available
window.updateSidebar = updateSidebar;