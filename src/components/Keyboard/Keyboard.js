import React from 'react';
import './Keyboard.css';

function Keyboard({ currentWord }) {
  const keyboardKeys = 'qwertyuiopasdfghjklzxcvbnm';

  const keyboardKeysElement = keyboardKeys.split('').map((item) => {
    const typedLetter = currentWord.includes(item);
    console.log(item);
    console.log(currentWord);

    return (
      <span
        style={{
          gridArea: item,
          // backgroundColor: backgroundColorCell,
        }}
        className="keyboard-key"
        key={item}
      >
        {item}
      </span>
    );
  });

  return (
    <div className="keyboard-container">
      {keyboardKeysElement}

      <span
        className="keyboard-key-enter"
        key="Enter"
        style={{ gridArea: 'Enter' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z" />
        </svg>
      </span>

      <span
        className="keyboard-key-backspace"
        key="backspace"
        style={{ gridArea: 'backspace' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="m456-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 160q-19 0-36-8.5T296-192L80-480l216-288q11-15 28-23.5t36-8.5h440q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H360ZM180-480l180 240h440v-480H360L180-480Zm400 0Z" />
        </svg>
      </span>

      <span
        className="keyboard-key-space"
        key="Space"
        style={{ gridArea: 'Space' }}
      >
        Space
      </span>
    </div>
  );
}

export default Keyboard;
