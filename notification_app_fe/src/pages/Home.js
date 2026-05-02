import React, { useEffect, useState } from 'react';
import { fetchAllNotifications, fetchNotificationsByType } from '../services/api';
import NotificationCard from '../components/NotificationCard';
import { logInfo } from '../utils/logger';

function Home() {
  const [allNotifications, setAllNotifications] = useState([]);
  const [eventNotifications, setEventNotifications] = useState([]);
  const [resultNotifications, setResultNotifications] = useState([]);
  const [placementNotifications, setPlacementNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const loadAllNotifications = async () => {
    try {
      const result = await fetchAllNotifications(1, 10);
      setAllNotifications(result);
    } catch (error) {
      console.error('Failed to load all notifications:', error);
    }
  };

  const loadNotificationsByType = async () => {
    try {
      const [events, results, placements] = await Promise.all([
        fetchNotificationsByType('Event', 1, 10),
        fetchNotificationsByType('Result', 1, 10),
        fetchNotificationsByType('Placement', 1, 10)
      ]);
      
      setEventNotifications(events);
      setResultNotifications(results);
      setPlacementNotifications(placements);
    } catch (error) {
      console.error('Failed to load notifications by type:', error);
    }
  };

  const loadNotifications = async () => {
    setLoading(true);
    await Promise.all([
      loadAllNotifications(),
      loadNotificationsByType()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    logInfo('Home page loaded');
    loadNotifications();
  }, []);

  const renderNotificationSection = (title, notifications) => (
    <div style={{ marginBottom: '30px' }}>
      <h3 style={{ color: '#1976d2', marginBottom: '15px' }}>{title}</h3>
      {notifications.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>No notifications available</p>
      ) : (
        notifications.map(notification => (
          <NotificationCard key={notification.ID} data={notification} />
        ))
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="notifications-section">
        <h2>All Notifications</h2>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="notifications-section">
      <h2 style={{ marginBottom: '30px', color: '#333' }}>All Notifications</h2>
      
      {renderNotificationSection('All Events, Results, Placements', allNotifications)}
      {renderNotificationSection('Events', eventNotifications)}
      {renderNotificationSection('Results', resultNotifications)}
      {renderNotificationSection('Placements', placementNotifications)}
    </div>
  );
}

export default Home;