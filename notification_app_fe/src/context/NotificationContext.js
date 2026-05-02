import React, { createContext, useContext, useReducer } from 'react';
import { logInfo, logError } from '../utils/logger';

const NotificationContext = createContext();

const initialState = {
  allNotifications: [],
  eventNotifications: [],
  resultNotifications: [],
  placementNotifications: [],
  recentNotifications: [],
  loading: false,
  error: null
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      logError(`Notification error: ${action.payload}`);
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_ALL_NOTIFICATIONS':
      return { ...state, allNotifications: action.payload };
    
    case 'SET_EVENT_NOTIFICATIONS':
      return { ...state, eventNotifications: action.payload };
    
    case 'SET_RESULT_NOTIFICATIONS':
      return { ...state, resultNotifications: action.payload };
    
    case 'SET_PLACEMENT_NOTIFICATIONS':
      return { ...state, placementNotifications: action.payload };
    
    case 'SET_RECENT_NOTIFICATIONS':
      return { ...state, recentNotifications: action.payload };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const setAllNotifications = (notifications) => {
    logInfo(`Loaded ${notifications.length} all notifications`);
    dispatch({ type: 'SET_ALL_NOTIFICATIONS', payload: notifications });
  };

  const setEventNotifications = (notifications) => {
    logInfo(`Loaded ${notifications.length} event notifications`);
    dispatch({ type: 'SET_EVENT_NOTIFICATIONS', payload: notifications });
  };

  const setResultNotifications = (notifications) => {
    logInfo(`Loaded ${notifications.length} result notifications`);
    dispatch({ type: 'SET_RESULT_NOTIFICATIONS', payload: notifications });
  };

  const setPlacementNotifications = (notifications) => {
    logInfo(`Loaded ${notifications.length} placement notifications`);
    dispatch({ type: 'SET_PLACEMENT_NOTIFICATIONS', payload: notifications });
  };

  const setRecentNotifications = (notifications) => {
    logInfo(`Loaded ${notifications.length} recent notifications`);
    dispatch({ type: 'SET_RECENT_NOTIFICATIONS', payload: notifications });
  };

  const value = {
    ...state,
    setLoading,
    setError,
    clearError,
    setAllNotifications,
    setEventNotifications,
    setResultNotifications,
    setPlacementNotifications,
    setRecentNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
