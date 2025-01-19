import React, { useState, useEffect } from "react";
import supabase  from "../../SupabaseClient";
import "./SignIn.css";

const Login = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [mode, setMode] = useState(localStorage.getItem("theme") || "cupcake");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.body.className = mode; // Apply theme to the body
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === "cupcake" ? "synthwave" : "cupcake";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Error during login:", error.message);
      return;
    }

    // Redirect to profile page if user is authenticated
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      // If user doesn't exist in the profiles table, redirect to profile creation page
      window.location.href = "/profile";
    } else {
      window.location.href = "/dashboard"; // Redirect to the dashboard
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if the email already exists
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (data) {
      setErrorMessage("This email is already registered.");
      return;
    }

    const { user, signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      console.log("Error during signup:", signUpError.message);
      return;
    }

    // Redirect to profile page after signup
    window.location.href = "/profile";
  };

  return (
    <section className="forms-section w-full h-screen flex items-center justify-center relative">
      {/* Theme Toggle */}
      <label className="grid cursor-pointer place-items-center absolute top-4 left-4">
        <input
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
          checked={mode === "synthwave"}
          onChange={toggleTheme}
        />
        <svg
          className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <svg
          className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>

      <div className="forms w-full h-full flex flex-col justify-center items-center">
        {/* Form Header Text */}
        <h1 className="text-center text-3xl font-semibold mb-4">
          {isLoginActive ? "Login" : "Sign Up"}
        </h1>

        {/* Login Form Wrapper */}
        <div className={`form-wrapper ${isLoginActive ? "is-active" : ""} w-full max-w-md p-8`}>
          <button
            type="button"
            className="switcher switcher-login mr-2"
            onClick={() => setIsLoginActive(true)}
          >
            Login
          </button>
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={() => setIsLoginActive(false)}
          >
            Sign Up
          </button>

          <form className="form form-login" onSubmit={handleLogin}>
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <button type="submit" className="btn-login w-full py-2 bg-blue-500 text-white rounded">
              Login
            </button>
          </form>
        </div>

        {/* Signup Form Wrapper */}
        <div className={`form-wrapper ${!isLoginActive ? "is-active" : ""} w-full max-w-md p-8`}>
          <button
            type="button"
            className="switcher switcher-login mr-2"
            onClick={() => setIsLoginActive(true)}
          >
            Login
          </button>
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={() => setIsLoginActive(false)}
          >
            Sign Up
          </button>

          <form className="form form-signup" onSubmit={handleSignup}>
            <fieldset>
              <legend>
                Please, enter your email, password, and password confirmation
                for sign up.
              </legend>
              {errorMessage && <p className="error-message text-red-500">{errorMessage}</p>}
              <div className="input-block">
                <label htmlFor="signup-username">Username</label>
                <input
                  id="signup-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <button type="submit" className="btn-signup w-full py-2 bg-green-500 text-white rounded">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

