"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const defaultFields = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(defaultFields);
  const { push } = useRouter();
  const notify = () => toast("User Name or Passoword is wrong");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // console.log(name, value);

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://login-register-api-production-f037.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(form),
        }
      );

      console.log(res);

      const data = await res.json();
      console.log(res.status);

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
      // console.log(err, );
    }
  };

  return (
    <>
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
                    onChange={handleChange}
                    value={form.email}
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
                    value={form.password}
                    type="password"
                    name="password"
                    className="block w-full mt-1  py-1 px-2  rounded-md"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end mt-4">
                <Link href="/">
                  <p className="text-sm text-gray-600 underline hover:text-gray-900">
                    Create an account
                  </p>
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                >
                  Login In
                </button>

                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
