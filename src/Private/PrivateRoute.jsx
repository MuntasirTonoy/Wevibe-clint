// import { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router';
// import { AuthContext } from '../Context/AuthContext';
// import Lottie from 'lottie-react';
// import loadingAnimation from '../assets/loading.json';

// const PrivateRoute = ({ children }) => {
//     const { user, loading } = useContext(AuthContext);
//     const location = useLocation();

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <Lottie animationData={loadingAnimation} className="w-32" />
//             </div>
//         );
//     }

//     if (user) {
//         return children;
//     }

//     return <Navigate to="/login" state={{ from: location }} replace />;
// };

// export default PrivateRoute;
