import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkDataValidation } from "../utils/validate";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BACKGROUND_IMG } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [loading, setLoading] = useState(false);

  const toggleForms = () => {
    setErrorMessage("");
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = (e) => {
    e.preventDefault();
    const errMessage = checkDataValidation(
      email.current?.value,
      password.current?.value
    );
    setErrorMessage(errMessage);
    if (errMessage) return;

    setLoading(true);

    // sign up & sign in user
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              // auth have updated value
              const { uid, email, displayName, photoURL } = user;
              // update your redux store
              localStorage.setItem(
                "user",
                JSON.stringify({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              // then navigate
              // onAuthStateChange will navigate
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              console.log("Error while updating profile");
            });
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMsg = error.message;

          errorMsg == "Firebase: Error (auth/email-already-in-use)."
            ? setErrorMessage("Email already exits.")
            : setErrorMessage("Please use valid credentials.");
          setLoading(false);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // after sign in - upadate the profile & dispatch action then navigate

          updateProfile(auth.currentUser, {
            displayName: name.current?.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              // auth have updated value
              const { uid, email, displayName, photoURL } = auth.currentUser;
              localStorage.setItem(
                "user",
                JSON.stringify({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // update your redux store
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // then navigate
              // onAuthStateChange will do this
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              console.log("Error while updating profile");
            });
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMsg = error.message;
          setErrorMessage("Invalid credentials");
          setLoading(false);
        });
    }
  };

  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <div className="absolute w-full min-h-screen">
        <img src={BACKGROUND_IMG} alt="bg-image" className="min-h-screen" />
      </div>
      <form className="absolute p-8 md:p-16 pb-32 sm:pb-auto bg-black w-full md:w-6/12 lg:w-4/12 h-auto my-36 mx-auto right-0 left-0 rounded-md bg-opacity-95 md:bg-opacity-85">
        <p className="text-2xl text-white font-semibold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </p>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-2 mb-2 mt-4 rounded-md outline-none w-full bg-gray-600 text-white font-semibold"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          ref={email}
          className="p-2 mb-2 mt-4 rounded-md outline-none w-full bg-gray-600 text-white font-semibold"
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="p-2 my-2 rounded-md outline-none w-full bg-gray-600 text-white font-semibold"
        />
        <p className="text-red-700">{errorMessage}</p>
        <button
          className="px-6 py-2 mt-4 bg-red-600 text-white rounded-md w-full"
          onClick={handleButtonClick}
        >
          {/* {isSignInForm ? "Sign In" : "Sign Up"} */}
          {isSignInForm
            ? loading
              ? "Signing in..."
              : "Sign In"
            : loading
            ? "Signing up..."
            : "Sign Up"}
        </button>
        <div className="flex justify-between opacity-80 mt-1">
          <div>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe" className="text-white text-sm">
              {" "}
              Remember Me?
            </label>
          </div>
          <p className="text-white text-sm hover:underline"> Need Help?</p>
        </div>

        <div className="flex mt-12">
          <p className="text-white text-base opacity-80">
            {isSignInForm ? "New to Netflix?" : "Already Registered?"}
          </p>
          <p className="text-white ml-2 hover:underline" onClick={toggleForms}>
            {isSignInForm ? "Sign up now." : "Sign in"}
          </p>
        </div>

        <p className="text-white text-sm mt-4 opacity-80">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <Link className="underline text-blue-700"> Learn more.</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
