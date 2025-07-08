import React, { useContext, useState } from 'react';
import assets from '../assets/assets.js';
import { AuthContext } from '../../context/AuthContext.jsx';

const Loginpage = () => {
  // Use consistent values: "Signup" and "Login"
  const [currState, setCurrState] = useState("Signup");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Signup" && !isDataSubmitted) {
      setIsDataSubmitted(true); // Show bio field
      return;
    }

    if (currState === "Login") {
      login("login", { email, password });
    } else {
      login("signup", { fullName, email, password, bio });
    }

    // Reset
    setFullName("");
    setEmail("");
    setPassword("");
    setBio("");
    setIsDataSubmitted(false);
  };

  return (
    <div className="min-h-screen backdrop-blur-xl flex items-center justify-center px-4">
      {/* Left side image */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10">
        <img
          src={assets.logo_icon}
          alt="Logo"
          className="w-32 h-32 object-contain"
        />
        <h1 className="text-2xl font-bold text-white mt-4">QuickChat</h1>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-[#282142] p-8 rounded-xl text-white space-y-5"
      >
        <h2 className="text-center text-2xl font-bold">
          {currState === "Login" ? "Login to Account" : "Create an Account"}
        </h2>

        {currState === "Signup" && (
          <>
            {!isDataSubmitted && (
              <>
                <div>
                  <label className="block text-sm mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded bg-[#1c1c2e] border border-gray-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 rounded bg-[#1c1c2e] border border-gray-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="********"
                    className="w-full px-4 py-2 rounded bg-[#1c1c2e] border border-gray-600 outline-none"
                  />
                </div>
              </>
            )}

            {isDataSubmitted && (
              <div>
                <label className="block text-sm mb-1">Set your Bio</label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2 rounded bg-[#1c1c2e] border border-gray-600 outline-none"
                />
              </div>
            )}
          </>
        )}

        {currState === "Login" && (
          <>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded bg-[#1c1c2e] border border-gray-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full px-4 py-2 rounded bg-[#1c1c2e] border border-gray-600 outline-none"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-violet-500 hover:bg-violet-600 rounded font-semibold"
        >
          {currState === "Login"
            ? "Login"
            : isDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        <p className="text-sm text-center">
          {currState === "Login" ? "Don't have an account?" : "Already a user?"}{' '}
          <span
            className="text-violet-400 cursor-pointer"
            onClick={() => {
              setCurrState(currState === "Login" ? "Signup" : "Login");
              setIsDataSubmitted(false);
              setFullName("");
              setEmail("");
              setPassword("");
              setBio("");
            }}
          >
            {currState === "Login" ? "Sign up here" : "Login here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Loginpage;
