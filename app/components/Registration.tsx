"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Registration() {
  const defaultFilds = {
    email: "",
    password: "",

    username: "",
  };

  const [form, setForm] = useState(defaultFilds);
  const { push } = useRouter();
  const notify = () => toast("Something went Wrong!");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      const res = await fetch(
        "https://login-register-api-production-f037.up.railway.app/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      // console.log(res.status);

      if (res.status === 200) {
        const { email, username, _id } = data;

        localStorage.setItem("user", JSON.stringify({ email, username, _id }));
        push("/dashboard");
      }

      // if(res.sta)
    } catch (err) {
      if (err) {
        notify();
      }
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div className="mb-4">
          <Image
            src={`/logo.png`}
            className="w-48"
            width={512}
            height={512}
            alt="logo"
          />
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-blue-100 shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            {/* <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full mt-1  py-1 px-2  rounded-md"
                />
              </div>
            </div> */}
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                User Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="text"
                  onChange={handleChange}
                  name="username"
                  value={form.username}
                  className="block w-full mt-1  py-1 px-2  rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  className="block w-full mt-1  py-1 px-2  rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  onChange={handleChange}
                  type="password"
                  name="password"
                  value={form.password}
                  className="block w-full mt-1  py-1 px-2  rounded-md"
                />
              </div>
            </div>
            {/* <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={handleChange}
                  type="password"
                  name="confirm_password"
                  value={form.confirm_password}
                  className="block w-full mt-1  py-1 px-2  rounded-md"
                />
              </div>
            </div> */}
            <div className="flex items-center justify-end mt-4">
              <Link href="/login">
                <p className="text-sm text-gray-600 underline hover:text-gray-900">
                  Already registered?
                </p>
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
