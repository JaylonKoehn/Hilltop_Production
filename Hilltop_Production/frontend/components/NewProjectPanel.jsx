import React, { useState } from 'react';

export default function NewProjectPanel() {
  const [model, setModel] = useState('');
  const [size, setSize] = useState('');
  const [customName, setCustomName] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const modelOptions = [
    'Swing Hitch Roller',
    'Fixed Hitch Roller',
    'Fold-up Roller',
    'ICF Bracing',
    'Custom Project'
  ];

  const sizeOptions = {
    'Fixed Hitch Roller': ["16'", "18'","Custom"],
    'Swing Hitch Roller': ["16'", "18'", "20'","Custom"],
    'Fold-up Roller': ["30'", "40'","Custom"]
  };

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setModel(selectedModel);
    setSize(''); // Reset size when model changes
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="side-panel">
        <h2>New Project</h2>

        <label>Select Model:</label>
        <select value={model} onChange={handleModelChange}>
          <option value="">-- Select Model --</option>
          {modelOptions.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        {model === 'Custom' && (
  <div style={{ marginTop: '1rem' }}>
    <label>Custom Project Name:</label>
    <input
      type="text"
      value={customName}
      onChange={(e) => setCustomName(e.target.value)}
      placeholder="Enter custom project name"
      style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
    />
  </div>
)}

        {model && model !== 'Custom' && sizeOptions[model] && (
          <>
            <label>Select Size:</label>
            <select value={size} onChange={handleSizeChange}>
              <option value="">-- Select Size --</option>
              {sizeOptions[model].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </>
        )}

        {model === 'Custom Project' && (
          <>
            <label>Enter Custom Project Name:</label>
            <input
              type="text"
              placeholder="Custom project name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </>
        )}

        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    )
  );
}
