/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// import HeaderSidebar from "../components/HeaderSidebar";
// import ChatBot from "../components/ChatBot";

const Homepage = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState<any>("");
  const [users, setUsers] = useState<any>([]);
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
        setName(decoded.username);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    try {
      const response = await axios.get(`${VITE_DATABASE_HOST}/user/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.table(response.data);
      setUsers(response.data);
    } catch (error: any) {
      if (error.response) {
        // navigate("/Login");
      }
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      await refreshToken();
      if (!localStorage.getItem("token") && !token) {
        navigate("/");
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <body className="m-12 flex justify-center items-center  ">
        <div className="m-20  ">
          <h1 className="text-4xl font-bold mb-18">Welcome back : {name}</h1>
          <h2 className="text-3xl font-medium">Navigation</h2>
          <ul className="list-disc pl-5 py-3">
            <li className="list-item">
              <Link
                to="/MsaForm_onepage"
                className="text-blue-500 hover:underline"
              >
                Daftar Permohonan Program UMT
              </Link>
            </li>
            <li>
              <Link
                to="/program-list"
                className="text-blue-500 hover:underline"
              >
                Program List
              </Link>
            </li>
            <li>
              <Link
                to="/testMultiStepForm"
                className="text-blue-500 hover:underline"
              >
                Test Multi-Step Form
              </Link>
            </li>
          </ul>

          <div className="mt-10">
            <button onClick={getUsers} className="btn btn-info">
              Get Users
            </button>
            <table className="table table-auto">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </>
  );
};

export default Homepage;
