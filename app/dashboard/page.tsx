"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const [user, setUser] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setUser(user);

    if (!user) {
      push("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    push("/");
  };

  return (
    <div>
      <nav className="text-xl py-8 px-24 bg-black text-white flex items-center  gap-12">
        <h1 className="cursor-pointer ">Dashboard</h1>
        <h1 onClick={handleLogout} className="cursor-pointer ">
          LogOut
        </h1>
      </nav>

      <div className="my-8 py-4 px-4 text-xl">
        <h1 className="my-2">Hi, {user?.username}</h1>
        <h2 className="my-2">Your Email is :{user?.email}</h2>
        <h2 className="my-2">id: {user?._id}</h2>
      </div>
    </div>
  );
}
