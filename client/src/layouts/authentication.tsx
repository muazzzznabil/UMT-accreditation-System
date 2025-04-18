// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// interface authenticationWrapper {
//   children: React.ReactNode;
// }

// const AuthenticationWrapper: React.FC<authenticationWrapper> = ({
//   children,
// }) => {
//   const [name, setName] = useState<string>("");
//   const [token, setToken] = useState<string>("");
//   const [expire, setExpire] = useState<string>("");

//   const { VITE_DATABASE_HOST } = import.meta.env;

//   useEffect(() => {
//     refreshToken();
//   }, []);

//   const refreshToken = async () => {
//     try {
//       const response = await axios.get(`${VITE_DATABASE_HOST}/user/token`);
//       setToken(response.data.accessToken);
//       const decoded = jwtDecode(response.data.accessToken);
//       console.table(decoded);
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//     }
//   };

//   return <>{children}</>;
// };

// export default AuthenticationWrapper;
