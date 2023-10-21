async function connectMetaMask() {
  if (window.ethereum) {
    try {
      // Request account access
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      console.log(accounts[0]); // Should show current MetaMask account
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.error("MetaMask not installed");
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

let web3 = new Web3(window.ethereum);
const contractAddress = '0x289EeF0cDa86fE61fb60f0A95C1b4A2295Dedbee'

const contract = new web3.eth.Contract(contractABI, contractAddress);


async function uploadFile(event) {
  event.preventDefault(); // Prevent default form submission
  // console.log(event)
  const formElement = event.target
  const formData = new FormData(formElement)
  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result) {
      console.log("File uploaded, hash:", result.fileHash);
      document.getElementById('display').textContent = 'File Hash: ' + result.fileHash
      sessionStorage.setItem('fileHash', result.fileHash);
    } else {
      console.error("File upload failed:", result.message);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}


async function storeProof() {
  // const documentHash = '0x1a5792b0d70c21041f5e6fc9df90564d231b038616306b39e1c008eb43fb36a6';
  if (!sessionStorage.getItem('fileHash')) {
    alert('No file found')
  }
  let documentHash = sessionStorage.getItem('fileHash')
  if (!documentHash.startsWith('0x')) {
    documentHash = '0x' + documentHash;
  }
  const accounts = await web3.eth.getAccounts();
  console.log(documentHash)
  contract.methods.storeProof(documentHash).send({from: accounts[0]})
    .on('receipt', receipt => {
      console.log(receipt);
    })
    .on('error', error => {
      console.error(error);
    });
}

function convertUnixTimestamp(unixTimestamp) {
  // Convert the timestamp to milliseconds
  const milliseconds = unixTimestamp * 1000;

  // Create a new Date object
  const dateObject = new Date(milliseconds);

  // Format the date
  const humanReadableDate = dateObject.toLocaleString(); // converts to local date and time format

  return humanReadableDate;
}

async function getProof() {
  if (!sessionStorage.getItem('fileHash')) {
    alert('No file found')
  }

  let documentHash = sessionStorage.getItem('fileHash')
  if (!documentHash.startsWith('0x')) {
    documentHash = '0x' + documentHash;
  }

  // const documentHash = '0x1a5792b0d70c21041f5e6fc9df90564d231b038616306b39e1c008eb43fb36a6'
  try {
    const timestamp = await contract.methods.getProof(documentHash).call();
    console.log(timestamp)
    document.getElementById('file-timestamp').textContent = convertUnixTimestamp(timestamp)
  } catch {
    alert('Document does not exist')
  }
}
