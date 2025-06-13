import {useDispatch, useSelector} from "react-redux";
import {addTrailerVideo} from "../utils/moviesSlice";
import {useEffect} from "react";
import {API_OPTIONS} from "../utils/constants";

export const useMovieTrailer = movieId => {
  const dispatch = useDispatch();
  const movieTrailer = useSelector(store => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );

    const json_data = await data.json();

    const trailerData = json_data?.results?.filter(
      video => video.type == "Trailer"
    );
    const trailer = trailerData?.length ? trailerData[0] : json_data[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    // memoization
    !movieTrailer && getMovieVideos();
  }, []);
};
