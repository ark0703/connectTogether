import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import supabase from "../SupabaseClient";

interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  department: string;
  batch: string;
  verification_status: Boolean;
  id: string;
}

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [fname, setFname] = useState("");
  const [error, setError] = useState<string | null>(null);

  const regex_phone =
    /^(?:\(?\d{3}\)?[\s.-]?|\d{3}[\s.-]?)\d{3}[\s.-]?\d{4}$/gm;
  const regex_mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fname,
          phone: phone,
          department: department,
          batch: batch,
          verification_status: false,
        },
      },
    });
    if (authError) {
      console.error("Error signing up:", authError.message);
      return;
    }
    console.log("User signed up successfully:", authData.user);

    if (authError) {
      setError(authError);
    } else {
      if (authData.user?.id) {
        const SignUpData: SignUpData = {
          email: email,
          password: password,
          full_name: fname,
          phone: phone,
          department: department,
          batch: batch,
          verification_status: false,
          id: authData.user.id,
        };
        const { error: profileError } = await supabase
          .from("Profiles")
          .insert(SignUpData);
        if (profileError) {
          setError(profileError.message);
          return;
        }
        navigate("/profile"); // Redirect to the sign-in page after successful sign-up
      }
    }
  };

  return (
    <Form />

    // <div className="flex justify-center items-center h-screen bg-neutral">
    //   <div className="w-full max-w-md p-8 bg-base-200 rounded-lg shadow-md ">
    //     <div className="grid grid-cols-4 ">
    //       <h1 className="text-2xl font-bold  mb-4 col-span-3">Sign Up</h1>
    //       <div className="col-span-1 text-end">
    //         <label className="swap swap-rotate">
    //           {/* this hidden checkbox controls the state */}
    //           <input
    //             type="checkbox"
    //             className="theme-controller"
    //             value="synthwave"
    //           />

    //           {/* sun icon */}
    //           <svg
    //             className="swap-off h-10 w-10 fill-current"
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //           >
    //             <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
    //           </svg>

    //           {/* moon icon */}
    //           <svg
    //             className="swap-on h-10 w-10 fill-current"
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //           >
    //             <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
    //           </svg>
    //         </label>
    //       </div>
    //     </div>

    //     <form onSubmit={handleSignUp} className="space-y-4">
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Full Name
    //         </label>
    //         <input
    //           type="text"
    //           className="input input-bordered w-full"
    //           value={fname}
    //           onChange={(e) => setFname(e.target.value)}
    //           placeholder="eg. Sarswati Devi"
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           className="input input-bordered w-full"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="eg. devi@domain.xyz"
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Phone Number
    //         </label>
    //         <input
    //           type="text"
    //           className="input input-bordered w-full"
    //           value={phone}
    //           onChange={(e) => {
    //             const value = e.target.value;
    //             if (value.length <= 10) {
    //               setError(null);
    //               setPhone(value);
    //             } else {
    //               setError("Enter Valid Phone Number");
    //             }
    //           }}
    //           placeholder="eg. 1234567890"
    //           maxLength={10}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Department
    //         </label>
    //         <input
    //           type="text"
    //           className="input input-bordered w-full"
    //           value={department}
    //           onChange={(e) => {
    //             const value = e.target.value;
    //             if (value.length <= 20) {
    //               setError(null);
    //               setDepartment(e.target.value);
    //             } else setError("Enter Deparment in Short");
    //           }}
    //           placeholder="eg. IT"
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Batch
    //         </label>
    //         <input
    //           type="text"
    //           className="input input-bordered w-full"
    //           value={batch}
    //           onChange={(e) => setBatch(e.target.value)}
    //           placeholder="eg. 2024-28"
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           className="input input-bordered w-full"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       {error && <p className="text-red-500 text-sm">{error}</p>}
    //       <button type="submit" className="btn btn-primary w-full">
    //         Sign Up
    //       </button>
    //     </form>
    //     <p className="text-sm text-center mt-4">
    //       Already have an account?{" "}
    //       <span
    //         className="text-blue-500 hover:underline"
    //         onClick={() => navigate("/signin")}
    //       >
    //         Sign In
    //       </span>
    //     </p>
    //   </div>
    // </div>
  );
};

export default SignUp;
