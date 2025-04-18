/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import ThemeSwitch from "../../components/themeSwitch";
import { PiWarningCircleFill } from "react-icons/pi";
import { useThemeStore } from "../../utils/useThemeStore";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues: getValue,
  } = useForm();
  const { VITE_DATABASE_HOST } = import.meta.env;
  const themeStore = useThemeStore();
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const response = await axios.post(
        `${VITE_DATABASE_HOST}/user/register`,
        data
      );
      navigate("/Login");
      console.log("Registration response:", response.data.message);
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal Mendaftar!",
        footer: `Error: ${(error as Error).message}`,
      });
    }
  };

  //   ! TESTING PURPOSES ONLY
  //   const onSubmit: SubmitHandler<any> = (data) => {
  //     console.log(data);
  //   };
  //   ! TESTING PURPOSES ONLY

  return (
    <>
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
      <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 pt-32">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2">
            <img
              src="/image/Logo_UMT.png"
              alt="logo"
              className="w-16 inline-block"
            />
            <p className="text-xl font-semibold">
              {" "}
              Pusat Pengurusan dan Penjaminan Kualiti (PPPK)
            </p>
          </div>
          <h4 className="text-slate-600 text-base mt-6">
            Sign up into your account
          </h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="col-span-2">
              <label
                className={`${
                  themeStore.darkMode ? "text-slate-50" : "text-slate-800"
                } text-sm font-medium mb-2 block`}
              >
                {" "}
                Username
              </label>
              <label className="input w-full">
                {" "}
                <input
                  {...register("username", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Enter username"
                />
                {errors.username && (
                  <div
                    className="tooltip  tooltip-bottom tooltip-error"
                    data-tip="Username is required"
                  >
                    <PiWarningCircleFill className="size-5 text-red-500" />
                  </div>
                )}
              </label>
            </div>
            <div>
              <label
                className={`${
                  themeStore.darkMode ? "text-slate-50" : "text-slate-800"
                } text-sm font-medium mb-2 block`}
              >
                Email
              </label>
              <label htmlFor="" className="input w-full">
                <input
                  {...register("email", {
                    pattern: /^.+@ocean\.umt\.edu\.my$/i,
                    required: true,
                  })}
                  type="text"
                  className="  "
                  placeholder="contoh@ocean.umt.edu.my"
                />
                {/* {errors.email?.type === "pattern" && (
                  <div
                    className="tooltip  tooltip-bottom tooltip-error"
                    data-tip="Email must be in the format of @ocean.umt.edu.my"
                  >
                    <PiWarningCircleFill className="size-5 text-red-500" />
                  </div>
                )} */}
                {errors.email && (
                  <div
                    className="tooltip  tooltip-bottom tooltip-error"
                    data-tip={
                      errors.email?.type === "pattern"
                        ? "Email must be in the format of @ocean.umt.edu.my"
                        : `Email is required`
                    }
                  >
                    <PiWarningCircleFill className="size-5 text-red-500" />
                  </div>
                )}
              </label>
            </div>

            <div>
              <label
                className={`${
                  themeStore.darkMode ? "text-slate-50" : "text-slate-800"
                } text-sm font-medium mb-2 block`}
              >
                {" "}
                Mobile No.
              </label>
              <label className="input w-full">
                <input
                  {...register("phone_number", { required: true })}
                  type="number"
                  placeholder="Enter mobile number"
                />
                {errors.phone_number && (
                  <div
                    className="tooltip  tooltip-bottom tooltip-error"
                    data-tip="Mobile number is required"
                  >
                    <PiWarningCircleFill className="size-5 text-red-500" />
                  </div>
                )}
              </label>
            </div>

            <div className="col-span-2">
              <label
                className={`${
                  themeStore.darkMode ? "text-slate-50" : "text-slate-800"
                } text-sm font-medium mb-2 block`}
              >
                <p className="flex items-center gap-1">
                  Jawatan{" "}
                  {errors.role && (
                    <div
                      className="tooltip  tooltip-bottom tooltip-error"
                      data-tip="Role is required"
                    >
                      <PiWarningCircleFill className="size-5 text-red-500" />
                    </div>
                  )}
                </p>
              </label>
              <select
                {...register("role", { required: true })}
                id="role"
                className="w-full input select"
              >
                <option value="" disabled hidden selected>
                  Sila pilih jawatan
                </option>
                <option value="admin">
                  Pengurus Pusat Pengurusan dan Penjaminan Kualiti UMT{" "}
                </option>
                <option value="staff">
                  Staf Pusat Pengurusan dan Penjaminan Kualiti UMT
                </option>
              </select>
            </div>

            <div>
              <label
                className={`${
                  themeStore.darkMode ? "text-slate-50" : "text-slate-800"
                } text-sm font-medium mb-2 block`}
              >
                {" "}
                Password
              </label>
              <label className="input w-full">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {(errors.password ||
                  validPassword === false ||
                  getValue("password") !== "") && (
                  <div
                    className="tooltip tooltip-bottom tooltip-error"
                    data-tip={
                      validPassword === false && getValue("password") !== ""
                        ? "Passwords do not match"
                        : errors.password
                        ? "Password is required"
                        : ""
                    }
                  >
                    <PiWarningCircleFill className="size-5 text-red-500" />
                  </div>
                )}
                {/* {validPassword === false && getValue("password") !== "" && (
                  <div
                    className="tooltip  tooltip-bottom tooltip-error "
                    data-tip="passwords do not match"
                  >
                    <PiWarningCircleFill className="size-5 text-red-500" />
                  </div>
                )} */}
              </label>
            </div>
            <div>
              <label
                className={`${
                  themeStore.darkMode ? "text-slate-50" : "text-slate-800"
                } text-sm font-medium mb-2 block`}
              >
                {" "}
                Confirm Password
              </label>
              <input
                type="password"
                className=" w-full input"
                placeholder="Enter confirm password"
                onChange={(e) => {
                  if (e.target.value !== password) {
                    setValidPassword(false);
                  } else {
                    setValidPassword(true);
                  }
                }}
              />
            </div>
          </div>

          <div className="mt-12">
            <button type="submit" className="btn btn-primary w-full">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
