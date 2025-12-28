import React, { useState } from 'react';

export default function ColorFontApp() {
    const [bgColor, setBgColor] = useState('white');
    const [textColor, setTextColor] = useState('black');
    const [font, setFont] = useState('Arial');
    const [fontSize, setFontSize] = useState(24);

    const divStyle = {
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: font,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1em',
        transition: 'all 0.3s ease'
    };

    return (
        <div style={divStyle}>
            <div>
                <label>Background Color: </label>
                <input
                    type="color"
                    value={bgColor}
                    onChange={e => setBgColor(e.target.value)}
                />
            </div>

            <div>
                <label>Text Color: </label>
                <input
                    type="color"
                    value={textColor}
                    onChange={e => setTextColor(e.target.value)}
                />
            </div>

            <div>
                <label>Font: </label>
                <select value={font} onChange={e => setFont(e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                </select>
            </div>

            <div>
                <label>Font Size: </label>
                <input
                    type="number"
                    value={fontSize}
                    min="10"
                    max="100"
                    onChange={e => setFontSize(Number(e.target.value))}
                /> px
            </div>

            <h1 style={{ fontSize: `${fontSize}px` }}>
                Your page, your rules!  Choose wisely!
            </h1>
            <p style={{ fontSize: '16px' }}>
            </p>
        </div>
    );
}