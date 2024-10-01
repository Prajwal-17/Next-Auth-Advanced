"use client"

import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const { data: session } = useSession();

  if (session) return redirect("/dashboard");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleGithubLogin = () => {
    signIn("github");
  };

  const handleForm = async (formData: FormData) => {
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const result = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/dashboard",
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (result?.error) {
        setErrorMsg(result.error);
      } else if (result?.ok) {
        setSuccessMsg("Logged In Successfully");
      }
    } catch (error: any) {
      setErrorMsg("An unexpected error occurred.");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="flex">
                <div
                  onClick={handleGoogleLogin}
                  className="w-1/2 p-2 flex items-center justify-center text-center shadow-lg rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <button className="text-3xl">
                    <FcGoogle />
                  </button>
                </div>
                <div
                  onClick={handleGithubLogin}
                  className="w-1/2 p-2 flex items-center justify-center text-center shadow-lg rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <button className="text-3xl">
                    <FaGithub />
                  </button>
                </div>
              </div>
              <div className="text-center font-bold text-gray-900 dark:text-gray-100">
                Or
              </div>
              <form className="space-y-4 md:space-y-6" action={handleForm}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <p
                    className={
                      successMsg
                        ? "text-sm font-light text-green-500 dark:text-green-400"
                        : "text-sm font-light text-red-500 dark:text-red-400"
                    }
                  >
                    {successMsg || errorMsg}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                  Sign In
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Create new Account -{" "}
                  <a
                    href="/auth/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
