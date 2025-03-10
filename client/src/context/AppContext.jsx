import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credits, setCredits] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    toast.success("Logout Successfully");
    navigate("/");
  };
  const creditData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: {
          token,
        },
      });
      if (data.success) {
        setCredits(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const generateImage = async (prompt) => {
    let response;
    try {
      response = await axios.post(
        backendUrl + "/api/image/generate-image",
        {
          prompt,
        },
        {
          headers: {
            token,
          },
        }
      );
      const { data } = response;
      if (data.success) {
        creditData();
        return data.resultImage;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      creditData();
      if (error.response.data.creditBalance === 0) {
        navigate("/buy-credit");
      }
    }
  };

  useEffect(() => {
    if (token) {
      creditData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credits,
    setCredits,
    creditData,
    logout,
    generateImage,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
