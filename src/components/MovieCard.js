import React from "react";
import {IMG_CDN_URL} from "../utils/constants";

const MovieCard = ({poster}) => {
  if (!poster) return;

  return (
    <div className="w-48 pr-4">
      <img alt="movie card" src={IMG_CDN_URL + poster} />
    </div>
  );
};

export default MovieCard;
