let web3 = new Web3(window.ethereum);

async function connectMetaMask() {
    // Initialize web3 instance
    

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

const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "documentHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ProofCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "documentHash",
        "type": "bytes32"
      }
    ],
    "name": "storeProof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "documentHash",
        "type": "bytes32"
      }
    ],
    "name": "getProof",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const contractAddress = '0x289EeF0cDa86fE61fb60f0A95C1b4A2295Dedbee'

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function storeProof() {
  const documentHash = '0x1a5792b0d70c21041f5e6fc9df90564d231b038616306b39e1c008eb43fb36a6';
  const accounts = await web3.eth.getAccounts();
  contract.methods.storeProof(documentHash).send({from: accounts[0]})
    .on('receipt', receipt => {
      console.log(receipt);
    })
    .on('error', error => {
      console.error(error);
    });
}

async function getProof() {
  console.log('clicked')
  const documentHash = '0x1a5792b0d70c21041f5e6fc9df90564d231b038616306b39e1c008eb43fb36a6'
  const timestamp = await contract.methods.getProof(documentHash).call();
  console.log(timestamp)
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

