import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import NotificationCard from '../../components/common/NotificationCard';
import { useNotificationData, useNotificationLogger } from '../../hooks/useNotifications';
import '../../styles/global.css';

function Home() {
  const [activeView, setActiveView] = useState('all');
  const { data, loading, error, loadAllData } = useNotificationData();
  
  useNotificationLogger('Home');

  useEffect(() => {
    loadAllData();
  }, []);

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const renderNotifications = () => {
    let notifications = [];
    let title = '';

    switch (activeView) {
      case 'all':
        notifications = data.allNotifications;
        title = 'All Events, Results, Placements';
        break;
      case 'events':
        notifications = data.eventNotifications;
        title = 'Events';
        break;
      case 'results':
        notifications = data.resultNotifications;
        title = 'Results';
        break;
      case 'placements':
        notifications = data.placementNotifications;
        title = 'Placements';
        break;
      default:
        notifications = data.allNotifications;
        title = 'All Events, Results, Placements';
    }

    return (
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#1976d2', marginBottom: '15px' }}>{title}</h3>
        {notifications.length === 0 ? (
          <div className="empty-state">
            <p>No notifications available</p>
          </div>
        ) : (
          <div className="notification-list">
            {notifications.map(notification => (
              <NotificationCard key={notification.ID} data={notification} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="notifications-section">
        <h2>All Notifications</h2>
        <div className="loading-spinner">
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notifications-section">
        <h2>All Notifications</h2>
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-section">
      <h2 style={{ marginBottom: '30px', color: '#333' }}>All Notifications</h2>
      
      <div className="button-group">
        <Button 
          onClick={() => handleViewChange('all')}
          variant={activeView === 'all' ? 'contained' : 'outlined'}
          className={activeView === 'all' ? 'active-button' : ''}
        >
          All Events, Results, Placements
        </Button>
        <Button 
          onClick={() => handleViewChange('events')}
          variant={activeView === 'events' ? 'contained' : 'outlined'}
          className={activeView === 'events' ? 'active-button' : ''}
        >
          Events
        </Button>
        <Button 
          onClick={() => handleViewChange('results')}
          variant={activeView === 'results' ? 'contained' : 'outlined'}
          className={activeView === 'results' ? 'active-button' : ''}
        >
          Results
        </Button>
        <Button 
          onClick={() => handleViewChange('placements')}
          variant={activeView === 'placements' ? 'contained' : 'outlined'}
          className={activeView === 'placements' ? 'active-button' : ''}
        >
          Placements
        </Button>
      </div>
      
      {renderNotifications()}
    </div>
  );
}

export default Home;