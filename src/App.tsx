import EasyMDE from 'easymde';
import React, { useEffect } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {

  const inputAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const easyMDE = React.useRef<EasyMDE | null>(null);

  useEffect(() => {
    if (inputAreaRef.current) {
      easyMDE.current = new EasyMDE({ element: inputAreaRef.current });
    }
  }, []);

  // console.log('easyMDE', easyMDE.current?.value());



  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <textarea ref={inputAreaRef} style={{
        width: '100%',
        height: '200px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px'
      }} />
    </>
  )
}

export default App
