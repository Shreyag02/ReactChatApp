// import { createContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";
// import Loading from "../components/Loading";

// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }:any) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//   }, []);
//   if (loading) {
//     return <Loading />;
//   }
//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import React from "react";

const auth = () => {
  return <div></div>;
};

export default auth;
