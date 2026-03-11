const envUrl = process.env.REACT_APP_API_URL;

export const API_BASE_URL = envUrl && envUrl.trim().length
  ? envUrl.replace(/\/$/, '')
  : process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5001';
