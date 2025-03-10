import { assets } from "../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
export default function Navbar() {
  const { user, setShowLogin, logout, credits } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-4">
      <Link to="/">
        <img className="w-40 sm:w-44 lg:w-52" src={assets.logo} alt="logo" />
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy-credit")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img className="w-5" src={assets.credit_star} alt="credit" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left : {credits}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>
            <div className="relative group">
              <img
                className="w-10 drop-shadow"
                src={assets.profile_icon}
                alt=""
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded text-black pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li
                    onClick={logout}
                    className="py-1 px-2 cursor-pointer pr-10"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              onClick={() => navigate("/buy-credit")}
              className="cursor-pointer"
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full hover:bg-transparent hover:text-black hover:border transition-all duration-500"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
