import { useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { 
  fetchAllNotifications, 
  fetchNotificationsByType, 
  fetchRecentNotifications 
} from '../services/api';
import { logInfo } from '../utils/logger';

export const useNotificationData = () => {
  const {
    allNotifications,
    eventNotifications,
    resultNotifications,
    placementNotifications,
    recentNotifications,
    loading,
    error,
    setLoading,
    setError,
    clearError,
    setAllNotifications,
    setEventNotifications,
    setResultNotifications,
    setPlacementNotifications,
    setRecentNotifications
  } = useNotifications();

  const loadAllNotifications = async () => {
    try {
      const result = await fetchAllNotifications(1, 10);
      setAllNotifications(result);
    } catch (error) {
      setError('Failed to load all notifications');
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
      setError('Failed to load notifications by type');
    }
  };

  const loadRecentNotifications = async () => {
    try {
      const result = await fetchRecentNotifications(5);
      setRecentNotifications(result);
    } catch (error) {
      setError('Failed to load recent notifications');
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    clearError();
    
    try {
      await Promise.all([
        loadAllNotifications(),
        loadNotificationsByType(),
        loadRecentNotifications()
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    data: {
      allNotifications,
      eventNotifications,
      resultNotifications,
      placementNotifications,
      recentNotifications
    },
    loading,
    error,
    loadAllData,
    loadAllNotifications,
    loadNotificationsByType,
    loadRecentNotifications,
    clearError
  };
};

export const useNotificationLogger = (pageName) => {
  useEffect(() => {
    logInfo(`${pageName} page loaded`);
  }, [pageName]);
};

export default useNotificationData;
