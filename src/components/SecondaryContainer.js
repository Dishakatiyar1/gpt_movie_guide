import React from "react";
import MovieList from "./MovieList";
import {useSelector} from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
    <div className="bg-black">
      <div className="-mt-1 md:-mt-40 lg:-mt-52 relative z-20 pl-4">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
