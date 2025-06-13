import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { openai } from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

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
    // Make an API Call to GPT API and get movie results

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query :" +
      searchText.current.value +
      ". only give me names of 5 movies, comma separed like the example result given ahead. Example : Dunki, Hera Pheri, Avatar, DDLJ, Don";

    const gptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResult.choices) {
      // handle error
    }

    // convert the result string into array of movies
    const gptMovies = gptResult.choices?.[0].message.content.split(", ");
    // For each movies I will hit TMDB API

    const data = gptMovies.map((movie) => searchMovieTMDB(movie));
    // data = [Promise, Promise, Promise, Promise, Promise]
    // use Promise.all() so that when all the promises are resolved then we will get data in tmdbResults
    const tmdbResults = await Promise.all(data);
    console.log(tmdbResults);
    dispatch(
      addGptMoviesResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGptSearchClick();
    }
  };
  return (
    <>
      <div className="flex justify-center pt-[25%] sm:pt-[10%]">
        <form
          className="bg-black grid grid-cols-12 w-[90%] sm:w-3/4 md:w-1/2 p-4 rounded-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            ref={searchText}
            className="px-4 py-2 outline-none bg-gray-200 rounded-l-md 
            font-semibold col-span-8"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="bg-red-700 hover:bg-red-900 rounded-r-md text-white font-semibold col-span-4"
            onClick={handleGptSearchClick}
            onKeyDown={handleKeyDown}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GptSearchBar;
