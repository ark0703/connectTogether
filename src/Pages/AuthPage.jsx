import React, { useState } from "react";
import "../App.css"; // Include the DaisyUI styles and your custom styles

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true); // To toggle between Sign-In and Sign-Up

  return (
    <div className="diff aspect-[16/9] relative">
      <div className="diff-item-1">
        <div className="bg-primary text-primary-content grid place-content-center">
          Section 1
        </div>
      </div>

      <div className="diff-item-2 relative z-10">
        <div className="bg-base-200 p-4">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>

      <div className="diff-resizer absolute top-0 left-0 w-full h-full pointer-events-none"></div>
    </div>
  );
};

export default AuthPage;
