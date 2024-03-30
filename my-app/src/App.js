import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // const inputData = [6.7, 2.5, 5.8, 1.8]; // Example input, replace with actual user input
      const inputData = input.split(',').map(num => parseFloat(num.trim()));
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputData }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Failed to fetch prediction:", error);
    }
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Predict</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default App;
