const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

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
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  console.log(file)
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
      // return res.send(`File uploaded and hashed. Hash: ${fileHash}`);
      return res.json({fileHash})
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
