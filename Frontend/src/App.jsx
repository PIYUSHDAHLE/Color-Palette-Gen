import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // Define `baseColor` with a default value and initialize `palette` and `message` states
  const [baseColor, setBaseColor] = useState('#3498db'); // Default color set here
  const [palette, setPalette] = useState([]);
  const [message, setMessage] = useState('');

  // Function to generate a color palette by sending a request to the backend
  const generatePalette = async () => {
    try {
      const response = await axios.post('/generatePalette', {
        color: baseColor,
      });
      setPalette(response.data.palette);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to copy color to clipboard
  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setMessage(`Copied ${color} to clipboard!`);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Dynamic Color Palette Generator</h1>

      {/* Color input for base color */}
      <input
        type="color"
        value={baseColor}
        onChange={(e) => setBaseColor(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={generatePalette}>Generate Palette</button>

      {/* Display generated color palette */}
      <div style={{ margin: '20px 0' }}>
        {palette.map((color, index) => (
          <div
            key={index}
            onClick={() => copyToClipboard(color)}
            style={{
              backgroundColor: color,
              width: '100px',
              height: '100px',
              display: 'inline-block',
              cursor: 'pointer',
              margin: '0 5px',
              color: '#fff',
              lineHeight: '100px',
              fontSize: '14px',
            }}
          >
            {color}
          </div>
        ))}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
