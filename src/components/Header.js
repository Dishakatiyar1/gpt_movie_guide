import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { chooseLanguage } from "../utils/configSlice";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user =
    useSelector((store) => store.user) ||
    JSON.parse(localStorage.getItem("user"));
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [showSignOut, setShowSignOut] = useState(false);

  const toggleSignOut = () => {
    setShowSignOut(!showSignOut);
  };

  // Note - navigating here so that only registered user can goto browser page
  // means when user is not null
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        navigate("/explore");
      } else {
        // User is signed out
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Signout successful
        localStorage.clear();
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        console.log("Error while signing out!");
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(chooseLanguage(e.target.value));
  };

  return (
    <header className="absolute w-full px-4 md:px-8 lg:px-12 py-2 md:py-3 bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-sm z-50 border-b border-white/10">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex-shrink-0">
          <img
            src={logo}
            alt="logo"
            className="w-24 md:w-36 object-contain hover:scale-105 transition-transform duration-200 cursor-pointer"
          />
        </div>

        {user && (
          <div className="flex items-center space-x-3 md:space-x-4">
            {showGptSearch && (
              <div className="relative">
                <select
                  className="bg-gray-900/80 backdrop-blur-sm text-white rounded-lg px-3 md:px-4 py-2 md:py-2.5 
                           border border-gray-700/50 hover:border-gray-600 focus:border-purple-500 focus:ring-2 
                           focus:ring-purple-500/20 outline-none text-sm md:text-base transition-all duration-200
                           cursor-pointer shadow-lg"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option
                      value={lang.identifier}
                      key={lang.identifier}
                      className="bg-gray-800 text-white py-2 hover:bg-gray-700"
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* GPT search toggle Button */}
            <button
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 
                       text-white rounded-lg px-4 md:px-5 py-2 md:py-2.5 flex items-center gap-2 
                       transition-all duration-200 shadow-lg hover:shadow-purple-500/25 
                       border border-purple-500/20 hover:border-purple-400/40 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                       active:scale-95 font-medium text-sm md:text-base"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? (
                <>
                  <span>Home</span>
                  <FaArrowDown className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-200" />
                </>
              ) : (
                <>
                  <span>GPT Search</span>
                  <FaArrowUp className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-200" />
                </>
              )}
            </button>

            <div className="relative">
              <button
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 
                         bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                         rounded-full text-white font-bold text-lg md:text-xl shadow-lg 
                         transition-all duration-200 hover:shadow-blue-500/25 
                         border-2 border-white/20 hover:border-white/30 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                         active:scale-95 cursor-pointer"
                onClick={toggleSignOut}
              >
                {user?.displayName
                  ? user.displayName.charAt(0).toUpperCase()
                  : "D"}
              </button>

              {showSignOut && (
                <div
                  className="absolute top-14 right-0 bg-gray-900/95 backdrop-blur-md 
                              border border-gray-700/50 rounded-xl shadow-2xl 
                              p-4 min-w-[200px] z-50 animate-in slide-in-from-top-2 
                              duration-200"
                >
                  <div className="text-center mb-3 pb-3 border-b border-gray-700/50">
                    <p className="text-white font-medium text-base md:text-lg">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm mt-1">
                      {user?.email}
                    </p>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                             text-white font-semibold rounded-lg py-2.5 px-4 
                             transition-all duration-200 shadow-lg hover:shadow-red-500/25 
                             border border-red-500/20 hover:border-red-400/40 
                             focus:outline-none focus:ring-2 focus:ring-red-500/50 
                             active:scale-95 text-sm md:text-base"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
