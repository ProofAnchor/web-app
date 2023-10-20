const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set up Multer
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Ensure the upload directory exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <script>
        // Place for your JavaScript functions to handle button clicks
      </script>
    </head>
    <body>
    <h2>Upload File</h2>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <label for="file">Select file:</label>
      <input type="file" id="file" name="file"><br><br>
      <input type="submit" value="Upload"><br><br>
    </form>
    <!-- Adding Ethereum-related buttons here -->
    <button id="store-proof-btn">Store Proof on Ethereum</button><br><br>
    <button id="get-proof-btn">Get Proof from Ethereum</button><br><br>
    <button id="connect-metamask-btn">Connect to MetaMask</button>
    </body>
    </html>
  `);
});

// app.get('/', (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//     <body>
//     <h2>Upload File</h2>
//     <form action="/upload" method="post" enctype="multipart/form-data">
//       <label for="file">Select file:</label>
//       <input type="file" id="file" name="file"><br><br>
//       <input type="submit" value="Upload">
//     </form>
//     </body>
//     </html>
//   `);
// });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Create a hash object
  const hash = crypto.createHash('sha256');

  // Open a stream for the uploaded file
  const input = fs.createReadStream(file.path);

  input.on('readable', () => {
    // Only one element is going to be produced by the
    // hash stream.
    const data = input.read();
    if (data)
      hash.update(data);
    else {
      const fileHash = hash.digest('hex');
      console.log(`File hash: ${fileHash}`);

      // Clean up: delete file after hashing
      fs.unlink(file.path, (err) => {
        if (err) throw err;
      });

      return res.send(`File uploaded and hashed. Hash: ${fileHash}`);
    }
  });

  // Catch any errors that happen while creating the readable stream (usually invalid names)
  input.on('error', (err) => {
    return res.status(500).send(`Error hashing file: ${err.message}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
