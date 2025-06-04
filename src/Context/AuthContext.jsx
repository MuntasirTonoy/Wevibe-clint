// import { createContext, useEffect, useState } from 'react';
// import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
// import { app } from '../firebase.init';
// import { getAuth } from 'firebase/auth';

// export const AuthContext = createContext(null);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Create user with email and password
//     const createUser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);
//     };

//     // Sign in with email and password
//     const signIn = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password);
//     };

//     // Sign in with Google
//     const signInWithGoogle = () => {
//         setLoading(true);
//         return signInWithPopup(auth, googleProvider);
//     };

//     // Update user profile
//     const updateUserProfile = (name, photo) => {
//         return updateProfile(auth.currentUser, {
//             displayName: name,
//             photoURL: photo,
//         });
//     };

//     // Sign out
//     const logOut = () => {
//         setLoading(true);
//         return signOut(auth);
//     };

//     // Observer for user state changes
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, []);

//     const authInfo = {
//         user,
//         loading,
//         createUser,
//         signIn,
//         signInWithGoogle,
//         updateUserProfile,
//         logOut
//     };

//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;
