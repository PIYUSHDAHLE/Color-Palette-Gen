const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const cors = require('cors');
app.use(cors());


function generatePalette(baseColor) {
  // This function generates a simple complementary palette
  // Replace this with more complex logic as needed
  const shades = [
    lightenDarkenColor(baseColor, -20),
    lightenDarkenColor(baseColor, -10),
    lightenDarkenColor(baseColor, 10),
    lightenDarkenColor(baseColor, 20),
    lightenDarkenColor(baseColor, 30),
  ];
  return shades;
}

// Utility function to lighten or darken a color
function lightenDarkenColor(hex, amt) {
  let color = hex.replace(/^#/, '');
  let num = parseInt(color, 16);

  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;

  const newColor =
    '#' +
    (
      0x1000000 +
      (r < 255 ? (r < 1 ? 0 : r) : 255) * 0x10000 +
      (g < 255 ? (g < 1 ? 0 : g) : 255) * 0x100 +
      (b < 255 ? (b < 1 ? 0 : b) : 255)
    )
      .toString(16)
      .slice(1)
      .toUpperCase();

  return newColor;
}

app.post('/generatePalette', (req, res) => {
  const { color } = req.body;
  const palette = generatePalette(color);
  res.json({ palette });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
