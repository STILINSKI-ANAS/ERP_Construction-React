// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const RouteGuard = ({ element: Element, ...rest }) => {
// // const navigate = useNavigate();
//   function hasJWT() {
//     let flag = false;

//     //check user has JWT token
//     localStorage.getItem('token') ? (flag = true) : (flag = false);

//     return flag;
//   }

//   return (
//     <Route {...rest} render={(props) =>
//         hasJWT() ? (
//           <Element {...props} />
//         ) : (
//           <Navigate to={{ pathname: '/login' }} />
//         )
//       }
//     />
//   );
// };

// export default RouteGuard;




import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const RouteGuard = ({ element: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/signin" replace state={{ from: rest.location.pathname }} />
        )
      }
    />
  );
};

export default RouteGuard;