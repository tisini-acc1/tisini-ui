"use client";

import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full">
      <div className="flex p-4 md:p-8 flex-col items-center justify-center max-w-7xl min-h-screen mx-auto">
        <form
          action=""
          className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md shadow-md w-full md:max-w-[40rem]  "
        >
          <div className="flex items-center justify-center">
            {/* Image placeholder */}
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-center">
              Welcome to your account
            </h1>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-primary"
            />
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
            <Link href="/register" className="text-primary">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
