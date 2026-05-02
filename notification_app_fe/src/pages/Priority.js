import React, { useEffect, useState } from 'react';
import { fetchRecentNotifications } from '../services/api';
import NotificationCard from '../components/NotificationCard';
import { logInfo } from '../utils/logger';

function Priority() {
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const loadRecentNotifications = async () => {
    try {
      const result = await fetchRecentNotifications(5);
      setRecentNotifications(result);
    } catch (error) {
      console.error('Failed to load recent notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    logInfo('Recent notifications page loaded');
    loadRecentNotifications();
  }, []);

  if (loading) {
    return (
      <div className="recent-section">
        <h2>Recent Notifications</h2>
        <p>Loading recent notifications...</p>
      </div>
    );
  }

  return (
    <div className="recent-section">
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Recent Notifications</h2>
      {recentNotifications.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          border: '2px dashed #ddd'
        }}>
          <p style={{ 
            color: '#666', 
            fontSize: '18px',
            margin: '0',
            fontStyle: 'italic'
          }}>
            No notifications available
          </p>
        </div>
      ) : (
        <div className="notification-list">
          {recentNotifications.map(notification => (
            <NotificationCard key={notification.ID} data={notification} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Priority;