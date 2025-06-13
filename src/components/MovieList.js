import React from "react";
import MovieCard from "./MovieCard";
import "./../index.css";
import { Link } from "react-router-dom";

const MovieList = ({ title, movies }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl py-4 px-4 md:px-12 text-white font-semibold">
        {title}
      </h1>

      <div className="relative px-4 md:px-12">
        <div className="flex overflow-x-auto my-scrollbar pb-4 -mx-4 px-4 scroll-smooth">
          <div className="flex gap-2 md:gap-4">
            {movies?.map((movie) => (
              <Link
                key={movie.id}
                to={`/explore/${movie.id}`}
                className="flex-shrink-0 transform transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-lg"
              >
                <MovieCard
                  poster={movie.poster_path}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                  overview={movie.overview}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
