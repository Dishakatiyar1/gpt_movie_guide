import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovieDetails = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        API_OPTIONS
      );
      const json_data = await data.json();
      setMovieDetails(json_data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );
      const json_data = await data.json();

      const trailerData = json_data?.results?.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = trailerData?.length
        ? trailerData[0]
        : json_data?.results?.[0];
      setTrailerKey(trailer?.key);
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    getMovieDetails();
    getMovieVideos();
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black text-white">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      {movieDetails?.backdrop_path && (
        <div
          className="relative w-full h-[50vh] lg:h-[60vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${IMG_CDN_URL}${movieDetails.backdrop_path})`,
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {movieDetails.title}
            </h1>
            {movieDetails.tagline && (
              <p className="text-lg md:text-xl text-gray-300 italic mb-4">
                "{movieDetails.tagline}"
              </p>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trailer Section */}
          <div className="lg:col-span-2">
            {trailerKey ? (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Official Trailer</h2>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerKey}?si=gQXs2T8NnWprbRy1&autoplay=0&enablejsapi=1`}
                    title="Movie Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <div className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">No trailer available</p>
                </div>
              </div>
            )}

            {/* Overview section */}
            {movieDetails?.overview && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-lg leading-relaxed text-gray-300">
                  {movieDetails.overview}
                </p>
              </div>
            )}
          </div>

          {/* Movie details sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-4">
              {/* Poster */}
              {movieDetails?.poster_path && (
                <div className="mb-6">
                  <img
                    src={IMG_CDN_URL + movieDetails.poster_path}
                    alt={movieDetails.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Movie Stats */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  {movieDetails?.vote_average && (
                    <div className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
                      ⭐ {movieDetails.vote_average.toFixed(1)}
                    </div>
                  )}
                  {movieDetails?.vote_count && (
                    <span className="text-sm text-gray-400">
                      ({movieDetails.vote_count.toLocaleString()} votes)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400 block mb-1">
                      Release Date
                    </span>
                    <span className="font-semibold">
                      {formatDate(movieDetails?.release_date)}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block mb-1">Runtime</span>
                    <span className="font-semibold">
                      {formatRuntime(movieDetails?.runtime)}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block mb-1">Budget</span>
                    <span className="font-semibold">
                      {formatCurrency(movieDetails?.budget)}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block mb-1">Revenue</span>
                    <span className="font-semibold">
                      {formatCurrency(movieDetails?.revenue)}
                    </span>
                  </div>

                  {movieDetails?.genres?.length > 0 && (
                    <div>
                      <span className="text-gray-400 block mb-2">Genres</span>
                      <div className="flex flex-wrap gap-2">
                        {movieDetails.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="bg-gray-700 px-2 py-1 rounded-full text-xs"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {movieDetails?.production_companies?.length > 0 && (
                    <div>
                      <span className="text-gray-400 block mb-2">
                        Production
                      </span>
                      <div className="space-y-1">
                        {movieDetails.production_companies
                          .slice(0, 3)
                          .map((company) => (
                            <div key={company.id} className="text-xs">
                              {company.name}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {movieDetails?.spoken_languages?.length > 0 && (
                    <div>
                      <span className="text-gray-400 block mb-1">
                        Languages
                      </span>
                      <span className="font-semibold text-xs">
                        {movieDetails.spoken_languages
                          .map((lang) => lang.english_name)
                          .join(", ")}
                      </span>
                    </div>
                  )}

                  {movieDetails?.status && (
                    <div>
                      <span className="text-gray-400 block mb-1">Status</span>
                      <span className="font-semibold">
                        {movieDetails.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
