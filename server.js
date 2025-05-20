const svgOverlay = Buffer.from(`
  <svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
    <style>
      .pill {
        rx: 60;
        ry: 60;
      }
      .price-pill {
        fill: #0077ff;
      }
      .district-pill {
        fill: #0077ff;
      }
      .location-pill {
        fill: #f0f0f0;
      }
      .price-text {
        fill: #ffffff;
        font-size: 70px;
        font-family: 'Montserrat';
        font-weight: 700;
        font-style: italic;
      }
      .district-text {
        fill: #ffffff;
        font-size: 60px;
        font-family: 'Montserrat';
        font-weight: 700;
        font-style: italic;
      }
      .location-text {
        fill: #4c4c4c;
        font-size: 40px;
        font-family: 'Montserrat';
        font-weight: 700;
        font-style: italic;
      }
    </style>

    <!-- Price pill -->
    <rect x="50" y="50" width="300" height="100" class="pill price-pill"/>
    <text x="200" y="120" text-anchor="middle" class="price-text">$ ${price}</text>

    <!-- District pill (bottom) -->
    <rect x="50" y="1200" width="600" height="90" class="pill district-pill"/>
    <text x="350" y="1260" text-anchor="middle" class="district-text">${district}</text>

    <!-- Location pill (under district) -->
    <rect x="50" y="1290" width="500" height="70" class="pill location-pill"/>
    <text x="300" y="1340" text-anchor="middle" class="location-text">${location}</text>
  </svg>
`);
