// inside your /generate route:
const outputFileName = 'output/' + Date.now() + '-final.jpg';

const width = 1080;
const height = 1350;

const svgOverlay = `
<svg width="${width}" height="${height}">
  <style>
    .pill {
      font-family: 'Montserrat', sans-serif;
      font-weight: bold;
      font-style: italic;
      fill: white;
    }
    .pill-gray {
      fill: #4c4c4c;
    }
    .pill-blue {
      fill: #0077ff;
    }
    .pill-text {
      font-size: 60px;
    }
  </style>

  <!-- Price pill (top-left) -->
  <rect x="40" y="40" rx="60" ry="60" width="300" height="100" class="pill-blue" />
  <text x="80" y="110" class="pill pill-text">$ ${price}</text>

  <!-- District pill (bottom-left) -->
  <rect x="40" y="${height - 180}" rx="60" ry="60" width="500" height="100" class="pill-blue" />
  <text x="60" y="${height - 110}" class="pill pill-text">${district}</text>

  <!-- Location pill (bottom-left, gray under blue) -->
  <rect x="40" y="${height - 90}" rx="50" ry="50" width="500" height="80" class="pill-gray" />
  <text x="60" y="${height - 35}" class="pill pill-text">${location}</text>
</svg>
`;

await sharp(imagePath)
  .resize(width, height)
  .composite([
    {
      input: Buffer.from(svgOverlay),
      top: 0,
      left: 0,
    },
  ])
  .jpeg()
  .toFile(outputFileName);

res.sendFile(path.resolve(outputFileName));
