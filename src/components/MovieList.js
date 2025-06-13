import React from "react";
import MovieCard from "./MovieCard";
import "./../index.css";
import {Link} from "react-router-dom";

const MovieList = ({title, movies}) => {
  return (
    <div>
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-auto my-scrollbar">
        <div className="flex">
          {movies?.map(movie => (
            <Link to={`/browse/${movie.id}`}>
              <MovieCard poster={movie.poster_path} key={movie.id} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
