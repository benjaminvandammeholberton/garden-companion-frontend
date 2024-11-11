import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderLogin from "../components/header/HeaderLogin";
import Login from "./Login";
import Register from "./Register";
import { ACCESS_TOKEN } from "@/constants";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(false);


  useEffect(() => {
    if (location.pathname === "/auth") {
      navigate("/auth/login")
    } else if (location.pathname === "/auth/register") {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  }, [location.pathname]);

  const toggleAuth = () => {
    if (isRegister) {
      navigate("/auth/login"); // Navigate to the login route
    } else {
      navigate("/auth/register"); // Navigate to the register route
    }
    setIsRegister(!isRegister); // Toggle the form state
  };

  return (
    <div className="
      w-full
      min-h-screen
      flex
      flex-col
      gap-5
      items-center
      justify-center
      bg-green-100
      dark:bg-slate-600
      pb-10
      bg-[url('@/assets/wallpapers/wallpaper.jpg')]
      bg-center
      background-size: cover
      ">
      <HeaderLogin />
      {isRegister ? (
        <Register toggleAuth={toggleAuth} />
      ) : (
        <Login toggleAuth={toggleAuth} />
      )}
    </div>
  );
};

export default Auth;
