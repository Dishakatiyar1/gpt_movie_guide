import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, DUMMY_POPULAR_MOVIES } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";

export const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular`,
      API_OPTIONS
    );
    const json_data = await data.json();
    dispatch(addPopularMovies(json_data.results));

    // *** due to changes in API, use static data
    // dispatch(addPopularMovies(DUMMY_POPULAR_MOVIES));
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};
