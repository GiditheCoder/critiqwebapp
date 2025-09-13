// import React, { useState, useEffect } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import { useNavigate } from 'react-router-dom';
// import { useSignUp } from "@clerk/clerk-react";

// import critiqLogo from '../images/critiq-logo.png';
// import SignupImg from '../images/signup.png';
// import GoogleImg from '../images/google.png';
// import lockIcon from '../images/lock.png';
// import inquiryImg from '../images/inquiry.png';
// import eyeIcon from '../images/eyeIcon.png';
// import VerifyEmailScreen from './VerifyEmailScreen';

// const ArtisteSignUp = () => {
//   const navigate = useNavigate();
//   const { signUp, isLoaded } = useSignUp();

//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [loaded, setLoaded] = useState(false);
//   const [signingUp, setSigningUp] = useState(false);
//   const [pendingVerification, setPendingVerification] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//       setLoaded(true);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSigninScreen = () => {
//     navigate('/artiste-signin');
//   };

//   const handleSignUp = async () => {
//     if (!email || !password || !username) {
//       alert("Error: Please fill in all fields");
//       return;
//     }
//     if (password.length < 6) {
//       alert("Error: Password must be at least 6 characters");
//       return;
//     }
//     if (!isLoaded) return;

//     setSigningUp(true);

//     try {
//       await signUp.create({ emailAddress: email, password, username });
//       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
//       setPendingVerification(true);
//     } catch (err) {
//       alert("Error: " + (err.errors?.[0]?.message || "Failed to create account"));
//       console.error(JSON.stringify(err, null, 2));
//     } finally {
//       setSigningUp(false);
//     }
//   };

//   if (pendingVerification) return <VerifyEmailScreen email={email} />;

//   return (
//     <div className="flex min-h-screen font-sans">
//       {/* Left Side */}
//       <div className="w-full md:w-1/2 bg-[#0b0b12] flex flex-col justify-center items-center px-8 py-12 relative">
//         <div className="w-full max-w-md">
//           {/* Logo */}
//           <div className="mb-2 flex justify-center">
//             {loading ? (
//               <Skeleton height={160} width={160} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
//             ) : (
//               <img
//                 src={critiqLogo}
//                 alt="Critiq Logo"
//                 className={`h-40 w-40 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
//               />
//             )}
//           </div>

//           {/* Header */}
//           {loading ? (
//             <Skeleton height={30} width={250} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mx-auto" />
//           ) : (
//             <h2 className={`text-2xl font-semibold text-white text-center transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
//               Artiste Sign Up
//             </h2>
//           )}

//           {loading ? (
//             <Skeleton height={20} width={300} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mx-auto my-4" />
//           ) : (
//             <p className={`text-1xl text-gray-400 text-center mb-6 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
//               Enter your details to sign up as an artiste
//             </p>
//           )}

//           {/* Email */}
//           {loading ? (
//             <Skeleton height={45} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-4" />
//           ) : (
//             <div className={`mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
//               <label className="block text-sm text-white mb-1">Email Address <span className="text-red-500">*</span></label>
//               <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-3 py-2">
//                 <img src={inquiryImg} alt="inquiry" className="w-4 h-4 mr-2 opacity-70" />
//                 <input
//                   type="email"
//                   placeholder="Enter your email address"
//                   className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Username */}
//           {loading ? (
//             <Skeleton height={45} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-4" />
//           ) : (
//             <div className={`mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
//               <label className="block text-sm text-white mb-1">Username <span className="text-red-500">*</span></label>
//               <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-3 py-2">
//                 <input
//                   type="text"
//                   placeholder="Enter your username"
//                   className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Password */}
//           {loading ? (
//             <Skeleton height={45} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-4" />
//           ) : (
//             <div className={`mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
//               <label className="block text-sm text-white mb-1">Password <span className="text-red-500">*</span></label>
//               <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-3 py-2">
//                 <img src={lockIcon} alt="lock" className="w-4 h-4 mr-2 opacity-70" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••••"
//                   className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <img
//                   src={eyeIcon}
//                   alt="Toggle Password"
//                   className="w-4 h-4 ml-2 opacity-70 cursor-pointer"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Sign Up Button */}
//           {loading ? (
//             <Skeleton height={45} width="100%" baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
//           ) : (
//             <button
//               onClick={handleSignUp}
//               disabled={signingUp || !isLoaded}
//               className={`w-full bg-[#A259FF] text-white py-3 rounded-3xl font-semibold hover:bg-[#9446f5] transition disabled:opacity-50 ${loaded ? 'opacity-100' : 'opacity-0'}`}
//             >
//               {signingUp ? "Signing up..." : "Sign Up"}
//             </button>
//           )}

//           {/* Google Button */}
//           {!loading && (
//             <button className="w-full border border-gray-600 mt-4 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition">
//               <img src={GoogleImg} alt="Google" className="h-5 w-5" />
//               <span className="text-white text-sm">Sign up with Google</span>
//             </button>
//           )}

//           {/* Sign In Link */}
//           {!loading && (
//             <p className="text-sm text-gray-400 text-center mt-6">
//               Already have an account?{' '}
//               <span className="text-white cursor-pointer font-medium" onClick={handleSigninScreen}>
//                 Sign in
//               </span>
//             </p>
//           )}
//         </div>

//         {/* Fullscreen Loader */}
//         {signingUp && (
//           <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//             <svg className="animate-spin h-16 w-16 text-[#A259FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
//             </svg>
//           </div>
//         )}
//       </div>

//       {/* Right Side Image */}
//       <div className="hidden md:block md:w-1/2 h-screen">
//         {loading ? (
//           <Skeleton height="100%" width="100%" baseColor="#0b0b12" style={{ opacity: 1 }} />
//         ) : (
//           <img src={SignupImg} alt="Signup Visual" className="w-full h-full object-cover" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ArtisteSignUp;




// import React, { useState, useEffect } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import { useNavigate } from 'react-router-dom';
// import { useSignUp } from "@clerk/clerk-react";

// import critiqLogo from '../images/critiq-logo.png';
// import SignupImg from '../images/signup.png';
// import GoogleImg from '../images/google.png';
// import lockIcon from '../images/lock.png';
// import inquiryImg from '../images/inquiry.png';
// import eyeIcon from '../images/eyeIcon.png';
// import VerifyEmailScreen from './VerifyEmailScreen';

// const ArtisteSignUp = () => {
//   const navigate = useNavigate();
//   const { signUp, isLoaded } = useSignUp();

//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [loaded, setLoaded] = useState(false);
//   const [signingUp, setSigningUp] = useState(false);
//   const [pendingVerification, setPendingVerification] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//       setLoaded(true);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSigninScreen = () => {
//     navigate('/artiste-signin');
//   };

//   const handleSignUp = async () => {
//     if (!email || !password || !username) {
//       alert("Error: Please fill in all fields");
//       return;
//     }
//     if (password.length < 6) {
//       alert("Error: Password must be at least 6 characters");
//       return;
//     }
//     if (!isLoaded) return;

//     setSigningUp(true);

//     try {
//       // create the account with metadata role = artiste
//       await signUp.create({
//         emailAddress: email,
//         password,
//         username,
//         unsafeMetadata: { role: "artiste" },   // 👈 role assigned here
//       });

//       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
//       setPendingVerification(true);
//     } catch (err) {
//       alert("Error: " + (err.errors?.[0]?.message || "Failed to create account"));
//       console.error(JSON.stringify(err, null, 2));
//     } finally {
//       setSigningUp(false);
//     }
//   };

//   if (pendingVerification) return <VerifyEmailScreen email={email} />;

//   return (
//     <div className="flex min-h-screen font-sans">
//       {/* Left Side */}
//       <div className="w-full md:w-1/2 bg-[#0b0b12] flex flex-col justify-center items-center px-8 py-12 relative">
//         <div className="w-full max-w-md">
//           {/* Logo */}
//           <div className="mb-2 flex justify-center">
//             {loading ? (
//               <Skeleton height={160} width={160} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
//             ) : (
//               <img
//                 src={critiqLogo}
//                 alt="Critiq Logo"
//                 className={`h-40 w-40 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
//               />
//             )}
//           </div>

//           {/* Header */}
//           {loading ? (
//             <Skeleton height={30} width={250} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mx-auto" />
//           ) : (
//             <h2 className={`text-2xl font-semibold text-white text-center transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
//               Artiste Sign Up
//             </h2>
//           )}

//           {loading ? (
//             <Skeleton height={20} width={300} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mx-auto my-4" />
//           ) : (
//             <p className={`text-1xl text-gray-400 text-center mb-6 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
//               Enter your details to sign up as an artiste
//             </p>
//           )}

//           {/* Email */}
//           {loading ? (
//             <Skeleton height={45} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-4" />
//           ) : (
//             <div className={`mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
//               <label className="block text-sm text-white mb-1">Email Address <span className="text-red-500">*</span></label>
//               <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-3 py-2">
//                 <img src={inquiryImg} alt="inquiry" className="w-4 h-4 mr-2 opacity-70" />
//                 <input
//                   type="email"
//                   placeholder="Enter your email address"
//                   className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Username */}
//           {loading ? (
//             <Skeleton height={45} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-4" />
//           ) : (
//             <div className={`mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
//               <label className="block text-sm text-white mb-1">Username <span className="text-red-500">*</span></label>
//               <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-3 py-2">
//                 <input
//                   type="text"
//                   placeholder="Enter your username"
//                   className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Password */}
//           {loading ? (
//             <Skeleton height={45} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-4" />
//           ) : (
//             <div className={`mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
//               <label className="block text-sm text-white mb-1">Password <span className="text-red-500">*</span></label>
//               <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-3 py-2">
//                 <img src={lockIcon} alt="lock" className="w-4 h-4 mr-2 opacity-70" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••••"
//                   className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <img
//                   src={eyeIcon}
//                   alt="Toggle Password"
//                   className="w-4 h-4 ml-2 opacity-70 cursor-pointer"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Sign Up Button */}
//           {loading ? (
//             <Skeleton height={45} width="100%" baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
//           ) : (
//             <button
//               onClick={handleSignUp}
//               disabled={signingUp || !isLoaded}
//               className={`w-full bg-[#A259FF] text-white py-3 rounded-3xl font-semibold hover:bg-[#9446f5] transition disabled:opacity-50 ${loaded ? 'opacity-100' : 'opacity-0'}`}
//             >
//               {signingUp ? "Signing up..." : "Sign Up"}
//             </button>
//           )}

//           {/* Google Button */}
//           {!loading && (
//             <button className="w-full border border-gray-600 mt-4 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition">
//               <img src={GoogleImg} alt="Google" className="h-5 w-5" />
//               <span className="text-white text-sm">Sign up with Google</span>
//             </button>
//           )}

//           {/* Sign In Link */}
//           {!loading && (
//             <p className="text-sm text-gray-400 text-center mt-6">
//               Already have an account?{' '}
//               <span className="text-white cursor-pointer font-medium" onClick={handleSigninScreen}>
//                 Sign in
//               </span>
//             </p>
//           )}
//         </div>

//         {/* Fullscreen Loader */}
//         {signingUp && (
//           <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//             <svg className="animate-spin h-16 w-16 text-[#A259FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
//             </svg>
//           </div>
//         )}
//       </div>

//       {/* Right Side Image */}
//       <div className="hidden md:block md:w-1/2 h-screen">
//         {loading ? (
//           <Skeleton height="100%" width="100%" baseColor="#0b0b12" style={{ opacity: 1 }} />
//         ) : (
//           <img src={SignupImg} alt="Signup Visual" className="w-full h-full object-cover" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ArtisteSignUp;



import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate, useLocation } from 'react-router-dom';  // 👈 added useLocation
import { useSignUp } from "@clerk/clerk-react";

import critiqLogo from '../images/critiq-logo.png';
import SignupImg from '../images/signup.png';
import GoogleImg from '../images/google.png';
import lockIcon from '../images/lock.png';
import inquiryImg from '../images/inquiry.png';
import eyeIcon from '../images/eyeIcon.png';
import VerifyEmailScreen from './VerifyEmailScreen';

const ArtisteSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();   // 👈 hook to track path
  const { signUp, isLoaded } = useSignUp();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 👇 log current path
  useEffect(() => {
    console.log("Current path:", location.pathname);
  }, [location]);

  const handleSigninScreen = () => {
    navigate('/artiste-signin');
  };

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      alert("Error: Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      alert("Error: Password must be at least 6 characters");
      return;
    }
    if (!isLoaded) return;

    setSigningUp(true);

    try {
      // create the account with metadata role = artiste
       const chosenRole = "artiste";
      await signUp.create({
        emailAddress: email,
        password,
        username,
        unsafeMetadata: {  chosenRole },   // 👈 role assigned here
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      alert("Error: " + (err.errors?.[0]?.message || "Failed to create account"));
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setSigningUp(false);
    }
  };

  if (pendingVerification) return <VerifyEmailScreen email={email} />;

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-[#0b0b12] flex flex-col justify-center items-center px-8 py-12 relative">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-2 flex justify-center">
            {loading ? (
              <Skeleton height={160} width={160} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
            ) : (
              <img
                src={critiqLogo}
                alt="Critiq Logo"
                className={`h-40 w-40 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </div>

          {/* Header */}
          {loading ? (
            <Skeleton height={30} width={250} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mx-auto" />
          ) : (
            <h2 className={`text-2xl font-semibold text-white text-center transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              Artiste Sign Up
            </h2>
          )}

          {loading ? (
            <Skeleton height={20} width={300} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mx-auto my-4" />
          ) : (
            <p className={`text-1xl text-gray-400 text-center mb-6 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              Enter your details to sign up as an artiste
            </p>
          )}

          {/* Email */}
          {loading ? (
            <Skeleton height={45} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-4" />
          ) : (
            <div className={`mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <label className="block text-sm text-white mb-1">Email Address <span className="text-red-500">*</span></label>
              <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-3 py-2">
                <img src={inquiryImg} alt="inquiry" className="w-4 h-4 mr-2 opacity-70" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Username */}
          {loading ? (
            <Skeleton height={45} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-4" />
          ) : (
            <div className={`mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <label className="block text-sm text-white mb-1">Username <span className="text-red-500">*</span></label>
              <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-3 py-2">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Password */}
          {loading ? (
            <Skeleton height={45} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-4" />
          ) : (
            <div className={`mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <label className="block text-sm text-white mb-1">Password <span className="text-red-500">*</span></label>
              <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-3 py-2">
                <img src={lockIcon} alt="lock" className="w-4 h-4 mr-2 opacity-70" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  src={eyeIcon}
                  alt="Toggle Password"
                  className="w-4 h-4 ml-2 opacity-70 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </div>
          )}

          {/* Sign Up Button */}
          {loading ? (
            <Skeleton height={45} width="100%" baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
          ) : (
            <button
              onClick={handleSignUp}
              disabled={signingUp || !isLoaded}
              className={`w-full bg-[#A259FF] text-white py-3 rounded-3xl font-semibold hover:bg-[#9446f5] transition disabled:opacity-50 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            >
              {signingUp ? "Signing up..." : "Sign Up"}
            </button>
          )}

          {/* Google Button */}
          {!loading && (
            <button className="w-full border border-gray-600 mt-4 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition">
              <img src={GoogleImg} alt="Google" className="h-5 w-5" />
              <span className="text-white text-sm">Sign up with Google</span>
            </button>
          )}

          {/* Sign In Link */}
          {!loading && (
            <p className="text-sm text-gray-400 text-center mt-6">
              Already have an account?{' '}
              <span className="text-white cursor-pointer font-medium" onClick={handleSigninScreen}>
                Sign in
              </span>
            </p>
          )}
        </div>

        {/* Fullscreen Loader */}
        {signingUp && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <svg className="animate-spin h-16 w-16 text-[#A259FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
        )}
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block md:w-1/2 h-screen">
        {loading ? (
          <Skeleton height="100%" width="100%" baseColor="#0b0b12" style={{ opacity: 1 }} />
        ) : (
          <img src={SignupImg} alt="Signup Visual" className="w-full h-full object-cover" />
        )}
      </div>
    </div>
  );
};

export default ArtisteSignUp;
