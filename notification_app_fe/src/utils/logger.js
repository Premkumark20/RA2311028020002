const createLogEntry = (component, level, context, message) => {
  const logEntry = {
    component,
    level,
    context,
    message,
    timestamp: new Date().toISOString(),
  };
  
  console.log(JSON.stringify(logEntry, null, 2));
};

export const logInfo = (message) => {
  createLogEntry('frontend', 'info', 'application', message);
};

export const logError = (message) => {
  createLogEntry('frontend', 'error', 'application', message);
};

export const logWarning = (message) => {
  createLogEntry('frontend', 'warning', 'application', message);
};