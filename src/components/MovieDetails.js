import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API_OPTIONS} from "../utils/constants";

const MovieDetails = () => {
  const {movieId} = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const getMovieDetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      API_OPTIONS
    );
    const json_data = await data.json();
    setMovieDetails(json_data);
  };

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
    setTrailerKey(trailer?.key);
    console.log("trailer", trailer);
  };

  useEffect(() => {
    getMovieDetails();
    getMovieVideos();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-screen h-screen bg-black text-white pt-0 lg:pt-20 p-0 lg:p-2">
      <div className="w-full">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${trailerKey}?si=gQXs2T8NnWprbRy1?&autoplay=1&enablejsapi=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {movieDetails && (
          <>
            <div className="px-4 sm:px-8">
              <h1 className="text-3xl font-bold">{movieDetails.title}</h1>
              <p className="opacity-95 py-4">{movieDetails.overview}</p>
              <p className="opacity-95">
                Release Date: {movieDetails.release_date}
              </p>
              <p className="opacity-95">Budget: ${movieDetails.budget}</p>
              <p className="opacity-95">Revenue: ${movieDetails.revenue}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
