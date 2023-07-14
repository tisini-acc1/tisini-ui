import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";

import { AxiosError } from "axios";
import BackHome from "@/components/BackHome";
import Loader from "@/components/Loader/Loader";
import { NavLink } from "react-router-dom";
import React from "react";
import { SignInUserInterface } from "@/lib/types";
import TisiniValidator from "@/lib/validators/tisini";
import { setCookieToken } from "@/lib/services/cookie-service";
import { tisiniAxios } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    // email: yup.string().email("Please provide valid email").required(),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number must be at most 10 characters")
      .matches(TisiniValidator.phoneRegex, {
        message: "Phone number  format is invalid (0(7|1)xxxxxxxx)",
        excludeEmptyString: true,
      }),
  })
  .required();
export default function Loginpage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserInterface>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { dispatch, auth } = useAuth();
  return (
    <div className="w-full">
      {isLoading && <Loader isLoading />}
      <ToastContainer />
      <div className="flex p-4 md:p-8 flex-col items-center justify-center max-w-7xl min-h-screen mx-auto">
      <BackHome />
        <form
          action=""
          className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md shadow-md w-full md:max-w-[40rem]  "
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(async (data) => {
            try {
              setIsLoading(true);
              const response = await (
                await tisiniAxios.post("/auth/login/", data)
              ).data;
              const { tokens, ...profile } = response;
              const { access, refresh } = JSON.parse(tokens as string) as {
                access: string;
                refresh: string;
              };
              setCookieToken({
                accessToken: access,
                refreshToken: refresh,
              });
              dispatch({
                type: "auth/LOGIN-SUCCESS",
                payload: {
                  access_token: access,
                  refresh_token: refresh,
                  user: profile,
                  error: "",
                  isAuthenticated: true,
                  loading: false,
                },
              });

              console.log(response);
            } catch (error: any) {
              if (error instanceof AxiosError) {
                toast.error((error.response?.data).detail);
              }
            } finally {
              setIsLoading(false);
            }
          })}
        >
          <div className="flex items-center justify-center">
            {/* Image placeholder */}
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-center">
              Welcome to your account {isLoading && "Loading..."}
            </h1>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary
                  "
              {...register("phone_number", { required: true })}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-primary text-white font-bold py-2 rounded-md focus:outline-none focus:ring-0 focus:ring-primary"
            >
              Login
            </button>
          </div>
          <hr />
          <p className="text-center">
            {"Don't have an account? "}
            <NavLink to="/auth/register" className="text-primary">
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
