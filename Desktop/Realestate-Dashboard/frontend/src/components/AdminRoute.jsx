// src/components/AdminRoute.jsx
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== 'admin') {
      return <Navigate to="/unauthorized" />;
    }

 // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return <Navigate to="/login" />;
  }

  return children;
}