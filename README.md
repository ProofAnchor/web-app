# Deprecated

# ProofAnchor

ProofAnchor is a decentralized application that leverages the Ethereum and Filecoin blockchains to provide proof of existence for documents. Users can upload files to the application, which then creates a unique hash of each file and stores it on the blockchain, serving as immutable proof that the file existed at a certain point in time.

## Features

- **File Upload**: Users can easily upload a file through a user-friendly interface.
- **Ethereum Integration**: The application is integrated with Ethereum's blockchain, allowing interactions with smart contracts.
- **MetaMask Connectivity**: Users can connect their MetaMask wallets for seamless transactions and authentication.
- **Filecoin Storage**: ProofAnchor utilizes Filecoin as a storage layer to achieve a decentralized filing system.
- **Proof of Existence**: The main feature of the app is to securely and indelibly prove the existence of a document or file at a certain timestamp.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed the latest version of [Node.js](https://nodejs.org/).
- You have a working [MetaMask](https://metamask.io/) extension added to your web browser.
- You have read access to Ethereum and Filecoin networks.

## Installation and Setup

1. Clone the repository from GitHub.
    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory and install dependencies.
    ```bash
    cd proofanchor
    npm install
    ```

3. Ensure the `uploads` directory is present as it is necessary for the file upload process.
    ```bash
    mkdir uploads
    ```

4. Start the local development server.
    ```bash
    npm start
    ```

    The server should start running at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Connect MetaMask**: Start by connecting your MetaMask wallet by clicking the "Connect to MetaMask" button. Follow the prompts in the MetaMask extension.

2. **Upload File**: Choose a file you want to create a proof of existence for, and upload it.

3. **Store Proof on Filecoin**: After the file is uploaded and hashed, you can send the hash to the Ethereum smart contract by clicking "Store Proof on Filecoin".

4. **Get Proof from Filecoin**: To retrieve the proof of your file, use the "Get Proof from Filecoin" button. This action will call the smart contract, retrieve the timestamp of your file, and show the exact time it was confirmed on the blockchain.

## Smart Contract Interactions

The application interacts with an Ethereum smart contract using the provided ABI. Here are the core functions:

- `storeProof(documentHash)`: This function stores a document's hash on the Ethereum blockchain. It emits a `ProofCreated` event upon success.

- `getProof(documentHash)`: This function retrieves the timestamp for the respective document hash, proving the document's existence from that particular time.

## Contact

If you want to contact the team, you can reach out at `jake@legalgenie.space`.
