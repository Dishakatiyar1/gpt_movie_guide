import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { SUPPORTED_LANGUAGES, logo_url } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { chooseLanguage } from "../utils/configSlice";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

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
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, user => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/auth.user
  //       navigate("/browse");
  //     } else {
  //       // User is signed out
  //       navigate("/");
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error while signing out!");
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    // GPT Search Click
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(chooseLanguage(e.target.value));
  };

  return (
    <>
      <div className="absolute w-full px-2 md:px-8 lg:px-12 items-center py-2 md:py-4 bg-gradient-to-b from-black z-10">
        <div className="flex justify-between items-center w-full">
          <img
            src={logo_url}
            alt="logo"
            className="w-24 md:w-32 h-12 md:h-16"
          />
          <div>
            {user && (
              <div className="flex items-center">
                {showGptSearch && (
                  <select
                    className="bg-gray-800 text-white rounded-md px-2 sm:px-4 py-1 sm:py-2 flex items-center mr-2 sm:mr-4 outline-none text-sm sm:text-lg"
                    onChange={handleLanguageChange}
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option
                        value={lang.identifier}
                        key={lang.identifier}
                        className="bg-gray-700 hover:bg-gray-600"
                      >
                        {lang.name}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  className="bg-purple-700 text-white rounded-md px-4 py-2 flex items-center hover:bg-opacity-80 border-none outline-none focus:outline-none mr-2 sm:mr-6"
                  onClick={handleGptSearchClick}
                >
                  {showGptSearch ? (
                    <span className="flex items-center">
                      Home <FaArrowDown className="ml-1" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      GPT Search <FaArrowUp className="ml-1" />
                    </span>
                  )}
                </button>

                {/* user icon & signout */}
                <div className="flex items-center">
                  <div className="relative">
                    <div className="relative" onClick={toggleSignOut}>
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white font-bold text-lg">
                        {user?.displayName
                          ? user.displayName.charAt(0).toUpperCase()
                          : "D"}
                      </div>
                    </div>
                    {showSignOut && (
                      <div className="absolute top-10 right-0 bg-gray-800 text-white py-2 px-4 rounded-md shadow">
                        <p className="text-white mx-auto text-lg text-center">
                          {user?.displayName}
                        </p>
                        <button
                          onClick={handleSignOut}
                          className="mt-2 font-semibold text-red-600 border-2 border-red-600 rounded-md py-1 px-2 w-32"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
