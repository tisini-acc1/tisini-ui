"use client";
import React from "react";
import { SignupUserInterface } from "@/types/types";
import "./register.css";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = React.useState<SignupUserInterface>({
    email: "",
    first_name: "",
    is_author: false,
    is_quiz_admin: false,
    last_name: "",
    password: "",
    phone_number: "",
    nickname: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <main className="">
      <div className="flex flex-col items-center justify-center space-y-4 p-4 md:p-8 max-w-7xl min-h-screen mx-auto">
        <form className="flex flex-col justify-center items-center space-y-4 md:max-w-[30rem] border py-4 rounded px-4 md:px-8">
          <h1 className="text-2xl font-bold text-center ">Register</h1>
          {/* First and last name row */}
          <div className="flex flex-col md:flex-row gap-2 justify-between w-full">
            <input
              className="register-input"
              name="first_name"
              placeholder="First Name"
              type="text"
              onChange={handleChange}
            />
            <input
              className="register-input"
              name="last_name"
              placeholder="Last Name"
              type="text"
              onChange={handleChange}
            />
          </div>
          <input
            className="register-input"
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
          />
          <input
            className="register-input"
            name="nickname"
            placeholder="Nickname"
            type="text"
            onChange={handleChange}
          />{" "}
          <input
            className="register-input"
            name="phone_number"
            placeholder="Phone Number"
            type="tel"
            onChange={handleChange}
          />
          <input
            className="register-input"
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
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
