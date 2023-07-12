"use client";

import "./register.css";

import * as yup from "yup";

import { BASE_URL } from "@/utils/api-service";
import Link from "next/link";
import React from "react";
import { SignupUserInterface } from "@/types/types";
import TisiniValidator from "@/utils/tisini-validator";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    nickname: yup.string().required("Nickname is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    email: yup.string().email("Please provide valid email").required(),
    is_quiz_admin: yup.bool().default(false).optional(),
    is_author: yup.bool().default(false).optional(),
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
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupUserInterface>({
    resolver: yupResolver(schema),
    defaultValues: { is_quiz_admin: false, is_author: false },
  });
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [event.target.name]: event.target.value });
  // };
  const router = useRouter();
  const onSubmit = async (data: SignupUserInterface) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      result && router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <main className="">
      <div className="flex flex-col items-center justify-center space-y-4 p-4 md:p-8 max-w-7xl min-h-screen mx-auto">
        <form
          className="flex flex-col justify-center items-center space-y-4 md:max-w-[30rem] border py-4 rounded px-4 md:px-8"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <h1 className="text-2xl font-bold text-center ">Register</h1>
          {/* First and last name row */}
          <div className="flex flex-col md:flex-row gap-2 justify-between w-full">
            <div className="w-full">
              <label htmlFor="first_name">First Name</label>
              <input
                className="register-input"
                placeholder="First Name"
                type="text"
                {...register("first_name", { required: true })}
              />
              {errors.first_name && (
                <span className="text-red-500">
                  {errors.first_name.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="last_name">Last Name</label>
              <input
                className="register-input"
                placeholder="Last Name"
                type="text"
                {...register("last_name", { required: true })}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="email">Email address</label>
            <input
              className="register-input"
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="phone_number">Nick name</label>
            <input
              className="register-input"
              placeholder="Nickname"
              type="text"
              {...register("nickname", { required: true })}
            />{" "}
            {errors.nickname && (
              <span className="text-red-500">{errors.nickname.message}</span>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="phone_number">Phone number</label>
            <input
              className="register-input"
              placeholder="Phone Number"
              type="tel"
              {...register("phone_number", {
                required: true,
                minLength: 10,
                maxLength: 10,
              })}
            />
            {errors.phone_number && (
              <span className="text-red-500">
                {errors.phone_number.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="password">Password</label>
            <input
              className="register-input"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button className="bg-primary text-white rounded py-2 px-4 w-full">
            Submit
          </button>
          <hr />
          <p className="text-center">
            {"Already have an account? "}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </p>
        </form>{" "}
      </div>
    </main>
  );
}
