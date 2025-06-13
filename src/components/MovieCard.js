import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ poster, title, vote_average, release_date, overview }) => {
  if (!poster) return null;

  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : null;
  const rating = vote_average ? vote_average.toFixed(1) : null;

  return (
    <div className="w-36 md:w-48 flex-shrink-0 cursor-pointer group">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-2xl">
        <img
          alt={title || "movie poster"}
          src={IMG_CDN_URL + poster}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 p-3 flex flex-col justify-end opacity-100 transition-opacity duration-300 text-white">
          {rating && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
              ⭐ {rating}
            </div>
          )}

          {/* Movie info */}
          <div className="space-y-1">
            {title && (
              <h3 className="font-bold text-sm md:text-base line-clamp-2 leading-tight">
                {title}
              </h3>
            )}

            {/* {releaseYear && (
              <p className="text-xs md:text-sm text-gray-300">{releaseYear}</p>
            )} */}

            {/* {overview && (
              <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed hidden md:block">
                {overview?.slice(0, 100)}
              </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
