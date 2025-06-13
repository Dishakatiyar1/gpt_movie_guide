import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { openai } from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Search Movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );

      const json_data = await data.json();
      return json_data.results;
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        alert("Network Error : Please try using Mobile Data");
        console.log(
          "Network error: Check your internet connection or API endpoint."
        );
      } else {
        console.log("Error fetching data:", error);
      }
    }
  };

  const handleGptSearchClick = async () => {
    const searchValue = searchText.current.value.trim();

    if (!searchValue) {
      searchText.current.focus();
      return;
    }

    setIsLoading(true);

    try {
      // Make an API Call to GPT API and get movie results
      const gptQuery =
        "Act as a movie recommendation system and suggest some movies for the query :" +
        searchValue +
        ". only give me names of 5 movies, comma separed like the example result given ahead. Example : Dunki, Hera Pheri, Avatar, DDLJ, Don";

      const gptResult = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      if (!gptResult.choices) {
        throw new Error("No results from GPT");
      }

      // convert the result string into array of movies
      const gptMovies = gptResult.choices?.[0].message.content.split(", ");
      // For each movies hit TMDB API
      const data = gptMovies.map((movie) => searchMovieTMDB(movie));
      // data = [Promise, Promise, Promise, Promise, Promise]
      // use Promise.all() so that when all the promises are resolved then we will get data in tmdbResults
      const tmdbResults = await Promise.all(data);
      dispatch(
        addGptMoviesResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGptSearchClick();
    }
  };

  const clearSearch = () => {
    searchText.current.value = "";
    searchText.current.focus();
  };

  return (
    <div className="flex flex-col items-center pt-[20%] sm:pt-[8%] px-4">
      {/* Main search Form */}
      <div className="relative w-full max-w-2xl">
        <form
          className="bg-gradient-to-r from-gray-900 via-black to-gray-900 
                     shadow-2xl border border-gray-700 grid grid-cols-12 
                     w-full p-6 rounded-2xl backdrop-blur-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Search Input container */}
          <div className="col-span-8 relative">
            <input
              type="text"
              ref={searchText}
              disabled={isLoading}
              className="w-full px-5 py-3 pr-10 outline-none bg-gray-100 
                         border-2 border-transparent rounded-l-xl font-medium
                         text-gray-800 placeholder-gray-500 
                         focus:bg-white focus:border-blue-500 focus:ring-2 
                         focus:ring-blue-200 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={lang[langKey].gptSearchPlaceholder}
              onKeyDown={handleKeyDown}
            />

            {/* Clear Button */}
            {searchText.current?.value && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           text-gray-400 hover:text-gray-600 transition-colors duration-200
                           p-1 rounded-full hover:bg-gray-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Button */}
          <button
            type="button"
            className={`col-span-4 rounded-r-xl text-white font-semibold 
                       transition-all duration-300 flex items-center justify-center
                       ${
                         isLoading
                           ? "bg-gray-600 cursor-not-allowed"
                           : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:scale-105"
                       }`}
            onClick={handleGptSearchClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Searching...</span>
              </div>
            ) : (
              <span>{lang[langKey].search}</span>
            )}
          </button>
        </form>
      </div>

      {/* Advanced Search tips */}
      <div className="mt-6 w-full max-w-4xl">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-600">
          <div className="text-center">
            <h4 className="text-yellow-400 text-sm font-semibold mb-2">
              ⚡ Search Like a Pro
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-300">
              <div className="flex items-start space-x-2">
                <span className="text-green-400">✓</span>
                <span>
                  Be specific: "Funny movies with animals" vs "Comedy"
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-400">✓</span>
                <span>Include mood: "Uplifting movies for bad days"</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-400">✓</span>
                <span>
                  Mention preferences: "Action movies without violence"
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-400">✓</span>
                <span>
                  Ask for comparisons: "Movies similar to Interstellar"
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptSearchBar;
