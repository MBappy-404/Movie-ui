// import { useEffect } from 'react';
// import Cookies from 'js-cookie';
// import jwtDecode from 'jwt-decode';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../features/auth/authSlice'; // adjust the path

// export const useAuthInitializer = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = Cookies.get('token'); // Assuming cookie is named "token"
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         dispatch(setUser({ user: decoded, token }));
//       } catch (error) {
//         console.error('Invalid token:', error);
//       }
//     }
//   }, [dispatch]);
// };
