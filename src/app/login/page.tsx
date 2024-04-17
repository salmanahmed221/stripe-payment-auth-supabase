"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user) {
      alert("Logged In Successfully");
      router.refresh();
      setLoading(false);
    } else {
      alert("Invalid Credentials");
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data.user) {
      alert("Account Created Successfully");
      router.refresh();
      setLoading(false);
      router.push("/");
    } else {
      alert("An error occured while creating an account");
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex-col flex justify-center items-center">
      <h1 className="text-4xl text-black tracking-tighter font-bold">
        Login to your account
      </h1>
      <div className="md:w-3/12">
        <div className="my-4">
          <label htmlFor="email" className="py-1">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className="text-black px-3 w-full h-12 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div className="my-4">
          <label htmlFor="password" className="py-1">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="text-black px-3 w-full h-12 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <button
          onClick={handleLogin}
          className="border-none h-12 mb-3 rounded-md justify-center flex items-center text-white bg-indigo-600 hover:bg-indigo-500 transition duration-200 shadow-lg shadow-indigo-600/35 w-full"
        >
          Sign in
          {loading && <Loader2 className="w-5 h-5 ml-3 animate-spin" />}
        </button>
        <button
          onClick={handleSignup}
          className="border-none h-12 rounded-md justify-center flex items-center text-white bg-purple-600 hover:bg-purple-500 transition duration-200 shadow-lg shadow-purple-600/35 w-full"
        >
          Sign up
          {loading && <Loader2 className="w-5 h-5 ml-3 animate-spin" />}
        </button>
      </div>
    </div>
  );
}
