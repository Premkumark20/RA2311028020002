import React from 'react';
import Home from './pages/Home';
import Priority from './pages/Priority';

function App() {
  const appStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fafafa',
    minHeight: '100vh'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#1976d2',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const separatorStyle = {
    border: 'none',
    height: '3px',
    background: 'linear-gradient(to right, #1976d2, #42a5f5, #1976d2)',
    margin: '40px 0',
    borderRadius: '2px'
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <h1 style={{ margin: '0', fontSize: '2.5rem' }}>Notification System</h1>
      </header>
      
      <main>
        <Home />
        <hr style={separatorStyle} />
        <Priority />
      </main>
    </div>
  );
}

export default App;