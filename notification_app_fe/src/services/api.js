All Events, Results, Placementsimport axios from 'axios';
import { logInfo, logError } from '../utils/logger';

const API_ENDPOINT = 'http://20.207.122.201/evaluation-service/notifications';

export const fetchNotifications = async (params) => {
  try {
    logInfo('Fetching notifications from API');
    
    const response = await axios.get(API_ENDPOINT, { 
      params, 
      timeout: 10000 
    });
    
    logInfo('Successfully fetched notifications from API');
    return response.data.notifications;
    
  } catch (error) {
    logError('API request failed');
    console.error('Error fetching notifications:', error.message);
    throw new Error('Failed to fetch notifications from the API');
  }
};

export const fetchAllNotifications = async (page = 1, limit = 10) => {
  return fetchNotifications({ page, limit });
};

export const fetchRecentNotifications = async (limit = 5) => {
  return fetchNotifications({ limit });
};

export const fetchNotificationsByType = async (notificationType, page = 1, limit = 10) => {
  return fetchNotifications({ notification_type: notificationType, page, limit });
};
