import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, DUMMY_NOW_PLAYING_MOVIES } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing`,
      API_OPTIONS
    );
    const json_data = await data.json();
    dispatch(addNowPlayingMovies(json_data.results));

    // *** due to changes in API, use static data
    // dispatch(addNowPlayingMovies(DUMMY_NOW_PLAYING_MOVIES));
  };

  useEffect(() => {
    // memoization
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};
