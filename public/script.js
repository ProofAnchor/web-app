async function connectMetaMask() {
    let web3 = new Web3(window.etherium);
}

async function connectMetaMask() {
    // Initialize web3 instance
    let web3 = new Web3(window.ethereum);

    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Handle account connection
        if (accounts.length > 0) {
            // You now have access to the connected account(s)
            console.log("Connected accounts:", accounts);
        }
    } catch (error) {
        // Handle error. Likely the user rejected the login
        console.error("Error:", error);
    }
}

// You can call this function when the window loads to auto-connect MetaMask
window.addEventListener('load', async () => {
    if (window.ethereum) {
        // Initialize web3 instance
        let web3 = new Web3(window.ethereum);

        // Get list of connected accounts. Empty array if none are connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            // MetaMask is already connected
            console.log("MetaMask is already connected:", accounts);
        } else {
            // MetaMask is not connected
            console.log("MetaMask is not connected");
        }
    }
});

