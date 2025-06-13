import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import {Routes, Route} from "react-router-dom";
import MovieDetails from "./MovieDetails";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:movieId" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default Body;
