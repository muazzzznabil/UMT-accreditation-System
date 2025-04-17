/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import ThemeSwitch from "../../components/themeSwitch";
import { useThemeStore } from "../../utils/useThemeStore";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { IoEyeOutline } from "react-icons/io5";

import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const themeStore = useThemeStore();
  const { VITE_DATABASE_HOST } = import.meta.env;
  const { register, handleSubmit } = useForm();
  const [seePassword, setSeePassword] = useState(false);

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const response = await axios.post(
        `${VITE_DATABASE_HOST}/user/login`,
        data
      );
      console.log("Login response:", response.data.message);
      window.location.href = "/";
    } catch (error) {
      toast.error("Invalid Username or Password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      console.error("Error during login:", error);
    }
  };

  //   !TESTING PURPOSES ONLY
  //   const onSubmit: SubmitHandler<any> = (data) => {
  //     console.log(data);
  //   };
  //   !TESTING PURPOSES ONLY

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className={"mt-14"}
      />
      <div>
        <img
          src="/image/Logo_UMT.png"
          alt="UMT"
          className="w-22 absolute m-4"
        />
        <div className="absolute top-6 right-4">
          <ThemeSwitch />
        </div>
      </div>
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
          <div>
            <h2
              className={`lg:text-5xl text-3xl font-bold lg:leading-[57px] ${
                themeStore.darkMode ? "text-slate-50" : "text-slate-900"
              }`}
            >
              Sistem Akreditasi Program Akademik UMT
            </h2>
            <p className="text-sm mt-6 text-slate-500 leading-relaxed">
              Pusat Pengurusan dan Penjaminan Kualiti (PPPK) Universiti Malaysia
              Terengganu
            </p>
          </div>

          <form
            className="max-w-md md:ml-auto w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3
              className={` ${
                themeStore.darkMode ? "text-slate-50" : "text-slate-900"
              } lg:text-3xl text-2xl font-bold mb-8`}
            >
              Sign in
            </h3>

            <div className="space-y-6">
              <div>
                <label
                  className={`text-sm ${
                    themeStore.darkMode ? "text-slate-50" : "text-slate-800"
                  } font-medium mb-2 block`}
                >
                  Username
                </label>
                <label className="input w-full">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    type="input"
                    {...register("username")}
                    required
                    placeholder="Username"
                    title="Only letters, numbers or dash"
                  />
                </label>
              </div>
              <div>
                <label
                  className={`text-sm ${
                    themeStore.darkMode ? "text-slate-50" : "text-slate-800"
                  } font-medium mb-2 block`}
                >
                  {" "}
                  Password
                </label>
                <label className="input  w-full">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    {...register("password")}
                    required
                    type={seePassword ? "text" : "password"}
                    placeholder="Password"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  />
                  <button
                    onClick={() => setSeePassword(!seePassword)}
                    type="button"
                    className="cursor-pointer"
                  >
                    {seePassword ? (
                      <FaRegEyeSlash className="size-5" />
                    ) : (
                      <IoEyeOutline className="size-5" />
                    )}
                  </button>
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-slate-500"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="jajvascript:void(0);"
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
            </div>

            <div className="my-4 flex items-center gap-4">
              <hr className="w-full border-slate-300" />
              <p className="text-sm text-slate-800 text-center">or</p>
              <hr className="w-full border-slate-300" />
            </div>

            <div className="space-x-2 flex justify-center">
              <p className="text-sm  text-slate-500">
                Don't have an account{" "}
                <a
                  href="/Registration"
                  className="text-blue-600 font-medium hover:underline ml-1"
                >
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
