import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole'); 

  // Kiểm tra quyền truy cập
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default PrivateRoute;
