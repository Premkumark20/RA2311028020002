import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { logInfo } from '../../utils/logger';

function NotificationCard({ data }) {
  const [isRead, setIsRead] = useState(false);

  const handleClick = () => {
    setIsRead(true);
    logInfo(`Notification ${data.ID} clicked`);
  };

  const getCardStyle = () => {
    return {
      margin: '12px 0',
      backgroundColor: isRead ? '#f5f5f5' : '#e3f2fd',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      borderLeft: `4px solid ${getPriorityColor(data.Priority)}`,
    };
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#2196f3';
    }
  };

  return (
    <Card style={getCardStyle()} onClick={handleClick}>
      <CardContent>
        <Typography variant="h6" component="h3">
          {data.Type}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '8px' }}>
          {data.Message}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(data.Timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;