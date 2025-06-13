import React from "react";
import { FaPlay } from "react-icons/fa";
import { CiCircleAlert } from "react-icons/ci";

const VideoTitle = ({ title, overview }) => {
  const shortOverview = overview?.split(" ")?.slice(0, 20)?.join(" ");

  return (
    <div className="w-full aspect-video pt-[18%] md:pt-[20%] px-4 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-6xl font-bold overflow-hidden mt-4 sm:mt-0 mb-4 md:mb-6">
          {title}
        </h1>

        {shortOverview && (
          <p className="py-2 md:py-6 text-sm md:text-lg w-full md:w-2/3 hidden sm:inline-block leading-relaxed">
            {shortOverview}...
          </p>
        )}

        <div className="flex items-center gap-4 mt-4 sm:mt-2">
          <button className="flex items-center justify-center bg-white text-black px-4 md:px-6 py-1 md:py-2 rounded-md font-semibold hover:bg-opacity-75 transition-all duration-200 min-w-[80px] md:min-w-[100px]">
            <FaPlay className="mr-1 text-sm md:text-base" />
            Play
          </button>

          <button className="flex items-center justify-center bg-gray-500 bg-opacity-70 text-white px-3 md:px-4 py-1 md:py-2 rounded-md font-semibold hover:bg-opacity-50 transition-all duration-200 backdrop-blur-sm">
            <CiCircleAlert className="mr-1 text-lg md:text-xl" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
