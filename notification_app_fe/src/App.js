import React from 'react';
import { NotificationProvider } from './context/NotificationContext';
import Home from './pages/Home/Home';
import Priority from './pages/Priority/Priority';
import Navbar from './components/layout/Navbar';
import './styles/global.css';

function App() {
  return (
    <NotificationProvider>
      <div className="app-container">
        <Navbar />
        <main style={{ paddingTop: '20px' }}>
          <Home />
          <hr style={{ 
            border: 'none', 
            height: '3px', 
            background: 'linear-gradient(to right, #1976d2, #42a5f5, #1976d2)', 
            margin: '40px 0', 
            borderRadius: '2px' 
          }} />
          <Priority />
        </main>
      </div>
    </NotificationProvider>
  );
}

export default App;