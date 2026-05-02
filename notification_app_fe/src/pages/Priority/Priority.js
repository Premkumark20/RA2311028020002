import React, { useEffect } from 'react';
import NotificationCard from '../../components/common/NotificationCard';
import { useNotificationData, useNotificationLogger } from '../../hooks/useNotifications';
import '../../styles/global.css';

function Priority() {
  const { data, loading, error, loadRecentNotifications } = useNotificationData();
  
  useNotificationLogger('Recent Notifications');

  useEffect(() => {
    loadRecentNotifications();
  }, []);

  if (loading) {
    return (
      <div className="notifications-section">
        <h2>Recent Notifications</h2>
        <div className="loading-spinner">
          <p>Loading recent notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notifications-section">
        <h2>Recent Notifications</h2>
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-section">
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Recent Notifications</h2>
      {data.recentNotifications.length === 0 ? (
        <div className="empty-state">
          <p>No notifications available</p>
        </div>
      ) : (
        <div className="notification-list">
          {data.recentNotifications.map(notification => (
            <NotificationCard key={notification.ID} data={notification} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Priority;