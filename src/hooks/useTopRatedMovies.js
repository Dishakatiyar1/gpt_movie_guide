import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, DUMMY_TOP_RATED_MOVIES } from "../utils/constants";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/moviesSlice";

export const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular`,
      API_OPTIONS
    );
    const json_data = await data.json();
    dispatch(addTopRatedMovies(json_data.results));

    // *** due to changes in API, use static data
    // dispatch(addTopRatedMovies(DUMMY_TOP_RATED_MOVIES));
  };

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
};
