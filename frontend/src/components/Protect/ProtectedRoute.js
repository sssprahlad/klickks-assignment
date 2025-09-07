// import {Redirect, Route} from 'react-router-dom'
// import Cookies from 'js-cookie'

// const ProtectedRoutes = props => {
//   const token = Cookies.get('jwt_token')
//   if (token === undefined) {
//     return <Redirect to="/login" />
//   }
//   return <Route {...props} />
// }

// export default ProtectedRoutes



import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const token = Cookies.get('jwt_token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;