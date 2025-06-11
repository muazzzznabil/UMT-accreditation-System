/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Homepage = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState<any>("");
  const [users, setUsers] = useState<any>([]);
  const [dashboard, setDashboard] = useState({
    total_programs: 0,
    total_evaluators: 0,
    active_applications: 0,
    active_accreditations: 0,
    total_application_approved: 0,
    total_application_rejected: 0,
    total_application_pending: 0,
    total_evaluators_aktif: 0,
    total_evaluators_tidak_aktif: 0,
  });
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

  useEffect(() => {
    axios
      .get(`${VITE_DATABASE_HOST}/dashboard/stats`)
      .then((res) => setDashboard(res.data));
  }, []);

  const pieData = {
    labels: ["Active Program", "Inactive Program"],
    datasets: [
      {
        data: [
          dashboard.total_application_rejected,
          dashboard.total_programs - dashboard.total_application_approved,
        ],
        backgroundColor: ["#36A2EB", "#E5E7EB"],
        borderWidth: 1,
      },
    ],
  };
  const donutData = {
    labels: ["Active Evaluator", "Inactive Evaluator"],
    datasets: [
      {
        data: [
          dashboard.total_evaluators_aktif,
          dashboard.total_evaluators_tidak_aktif,
        ],
        backgroundColor: ["#22C55E", "#E5E7EB"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-base-100 py-10">
        <div className="w-full max-w-6xl">
          <div className="mb-8">
            {name ? (
              <h1 className="text-4xl font-bold mb-4 text-primary">
                Selamat Kembali : {name}
              </h1>
            ) : (
              <h1 className="text-4xl font-bold mb-4 text-primary">
                Selamat Datang
              </h1>
            )}
            <h2 className="text-2xl font-semibold mb-2">Navigation</h2>
            <ul className="menu menu-horizontal bg-base-200 rounded-box mb-6">
              <li>
                <Link to="/program-list" className="text-blue-500">
                  Senarai Program
                </Link>
              </li>
              <li>
                <Link to="/senarai-penilai-dalaman" className="text-blue-500">
                  Senarai Penilai Dalaman
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="stat bg-base-200 shadow rounded-box">
              <div className="stat-title">Jumlah Program Didaftarkan</div>
              <div className="stat-value text-primary">
                {dashboard.total_programs}
              </div>
            </div>
            <div className="stat bg-base-200 shadow rounded-box">
              <div className="stat-title">Jumlah Penilai</div>
              <div className="stat-value text-secondary">
                {dashboard.total_evaluators}
              </div>
            </div>
            <div className="stat bg-base-200 shadow rounded-box">
              <div className="stat-title">Permohonan Aktif</div>
              <div className="stat-value text-accent">
                {dashboard.active_applications}
              </div>
            </div>
            <div className="stat bg-base-200 shadow rounded-box">
              <div className="stat-title">Akreditasi Aktif</div>
              <div className="stat-value text-info">
                {dashboard.active_accreditations}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-base-200 rounded-box p-6 flex flex-col items-center">
              <h3 className="font-bold mb-2">Program Status</h3>
              <Pie data={pieData} />
            </div>
            <div className="bg-base-200 rounded-box p-6 flex flex-col items-center">
              <h3 className="font-bold mb-2">Evaluator Status</h3>
              <Doughnut data={donutData} />
            </div>
          </div>

          <div className="mb-10">
            <button onClick={getUsers} className="btn btn-info mb-4">
              Get Users
            </button>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full rounded-box">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center text-gray-400">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user: any) => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.role === "admin"
                                ? "badge-primary"
                                : "badge-secondary"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
