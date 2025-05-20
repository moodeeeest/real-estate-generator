const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set up multer to save uploaded images into "uploads/" folder
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Middleware to allow JSON data
app.use(express.json());

// POST route to receive image + text data
app.post('/generate', upload.single('image'), async (req, res) => {
  try {
    const { district, location, rooms, price } = req.body;
    const imagePath = req.file.path;

    const outputFileName = 'output/' + Date.now() + '-final.jpg';

    const width = 1080;
    const height = 1350;

    const image = sharp(imagePath).resize(width, height);

    // SVG overlay layer with pills and text
    const svgOverlay = Buffer.from(`
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          .pill { font-family: 'Montserrat'; font-weight: bold; font-style: italic; fill: white; }
          .pill-dark { fill: #4c4c4c; }
        </style>

        <!-- Price pill (Top-left) -->
        <rect x="20" y="40" rx="40" ry="40" width="360" height="90" fill="#0077ff" />
        <text x="200" y="100" text-anchor="middle" font-size="55" class="pill">$ ${price}</text>

        <!-- District pill (Bottom) -->
        <rect x="20" y="1200" rx="40" ry="40" width="750" height="90" fill="#0077ff" />
        <text x="395" y="1265" text-anchor="middle" font-size="50" class="pill">${district.toUpperCase()}</text>

        <!-- Location pill (Underneath district) -->
        <rect x="20" y="1295" rx="40" ry="40" width="600" height="60" fill="#e0e0e0" />
        <text x="320" y="1338" text-anchor="middle" font-size="35" class="pill pill-dark">${location.toUpperCase()}</text>
      </svg>
    `);

    await image
      .composite([{ input: svgOverlay, blend: 'over' }])
      .toFile(outputFileName);

    // Send the final image back
    res.sendFile(path.resolve(outputFileName));

    // Optional: cleanup
    setTimeout(() => {
      fs.unlinkSync(imagePath);
      fs.unlinkSync(outputFileName);
    }, 5000);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
