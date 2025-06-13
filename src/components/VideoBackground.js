import React from "react";
import { useSelector } from "react-redux";
import { useMovieTrailer } from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);
  // using hook to fetch movie trailer key which can be passed to iframe
  useMovieTrailer(movieId);

  return (
    <div className="w-full overflow-hidden">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=gQXs2T8NnWprbRy1?&autoplay=1&mute=1&enablejsapi=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>

      {/* Due to changes in the API make it static */}
      {/* 
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/e1k1PC0TtmE?si=gQXs2T8NnWprbRy1?&autoplay=1&mute=1&enablejsapi=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe> */}
    </div>
  );
};

export default VideoBackground;
