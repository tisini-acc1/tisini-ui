"use client";
export default function Login() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center max-w-7xl">
       <form action="">
          <input type="text" name="username" id="username" placeholder="Username" />
          <input type="password" name="password" id="password" placeholder="Password" />
       </form>
      </div>
    </div>
  );
}
