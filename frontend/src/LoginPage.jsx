import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email, // Spring Security expects "username"
          password: password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        alert("✅ Login Successful!");
        window.location.href = "http://localhost:3000/dashboard";
      } else {
        alert("❌ Invalid credentials. Please try again.");
      }
    } catch (error) {
      alert("⚠️ Backend error. Please check server connection.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96 transition-all hover:shadow-2xl duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-md"
          >
            Login
          </button>

          <div className="text-center mt-4 text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  )
};
export default LoginPage;