import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/explore" element={<Browse />} />
        <Route path="/explore/:movieId" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default Body;
