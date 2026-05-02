import axios from 'axios';
import { logInfo, logError } from '../utils/logger';

const API_ENDPOINT = 'http://20.207.122.201/evaluation-service/notifications';
const API_TOKEN = 'paste-token-here';

const generateMockNotifications = () => {
  const eventMessages = [
    'System maintenance scheduled for tonight at 11 PM',
    'Guest lecture on AI/ML scheduled for tomorrow',
    'Sports meet registration closes tomorrow',
    'Workshop on resume building this weekend',
    'Campus recruitment drive starts next week',
    'Technical fest registrations now open',
    'Seminar on cloud computing technologies',
    'Annual day celebration preparations begin'
  ];

  const resultMessages = [
    'Your test results are now available in the portal',
    'Assignment grades have been published',
    'Mid-term examination results announced',
    'Lab evaluation scores updated',
    'Project presentations results out',
    'Quiz scores have been posted',
    'Internal assessment results available',
    'Final exam timetable released'
  ];

  const placementMessages = [
    'New placement opportunities available for CS students',
    'Interview workshop this Friday - Register now!',
    'Campus placement drive registrations open',
    'Multiple companies visiting for recruitment',
    'Internship opportunities for final year students',
    'Placement training session scheduled',
    'Job fair organized by career services',
    'On-campus interviews with tech giants'
  ];

  const priorities = ['high', 'medium', 'low'];
  const types = ['Event', 'Result', 'Placement'];
  
  const notifications = [];
  let id = 1;
  
  // Generate 20 notifications
  for (let i = 0; i < 20; i++) {
    const type = types[i % 3];
    let message;
    
    switch (type) {
      case 'Event':
        message = eventMessages[i % eventMessages.length];
        break;
      case 'Result':
        message = resultMessages[i % resultMessages.length];
        break;
      case 'Placement':
        message = placementMessages[i % placementMessages.length];
        break;
    }
    
    // Generate random timestamp within last 7 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));
    
    notifications.push({
      ID: id++,
      Type: type,
      Message: message,
      Timestamp: date.toISOString(),
      Priority: priorities[Math.floor(Math.random() * priorities.length)]
    });
  }
  
  // Sort by timestamp (newest first)
  return notifications.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
};

const mockNotifications = generateMockNotifications();

const filterNotifications = (notifications, filters) => {
  let filtered = [...notifications];
  
  if (filters.notification_type) {
    filtered = filtered.filter(n => n.Type === filters.notification_type);
  }
  
  if (filters.limit) {
    filtered = filtered.slice(0, filters.limit);
  }
  
  if (filters.page) {
    const startIndex = (filters.page - 1) * (filters.limit || 10);
    filtered = filtered.slice(startIndex, startIndex + (filters.limit || 10));
  }
  
  return filtered;
};

export const fetchNotifications = async (params) => {
  try {
    logInfo('Fetching notifications from API');
    
    const response = await axios.get(API_ENDPOINT, { 
      params, 
      timeout: 5000,
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    logInfo('Successfully fetched notifications from API');
    return response.data.notifications;
    
  } catch (error) {
    logError('API unavailable, using mock data');
    console.warn('API not accessible, using mock notifications:', error.message);
    
    return filterNotifications(mockNotifications, params);
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
