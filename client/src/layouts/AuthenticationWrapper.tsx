/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";

interface AuthenticationWrapperProps {
  children: React.ReactNode;
}

const AuthenticationWrapper: React.FC<AuthenticationWrapperProps> = ({
  children,
}) => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState<any>("");
  const navigate = useNavigate();

  const { VITE_DATABASE_HOST } = import.meta.env;
  const refreshToken = async () => {
    try {
      const response = await axios.get(`${VITE_DATABASE_HOST}/user/token`);
      setToken(response.data.accessToken);
      const decoded = jwtDecode<any>(response.data.accessToken);
      setName(decoded.username);
      setExpire(decoded.exp);
    } catch (error: any) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.response.use(
    async (config) => {
      const currentDate = dayjs();
      if (dayjs(expire * 1000).isBefore(currentDate)) {
        const response = await axios.get(`${VITE_DATABASE_HOST}/user/token`);
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode<any>(response.data.accessToken);
        // setName(decoded.username);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    refreshToken();
  }, []);

  return <>{children}</>;
};

export default AuthenticationWrapper;
