import React from "react";
import {FaPlay} from "react-icons/fa";
import {CiCircleAlert} from "react-icons/ci";

const VideoTitle = ({title, overview}) => {
  const shortOverview = overview?.split(" ")?.slice(0, 20)?.join(" ");
  return (
    <div className="w-full aspect-video pt-[18%] md:pt-[20%] px-4 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold overflow-hidden mt-4 sm:mt-0">
        {title}
      </h1>
      <p className="py-2 md:py-6 text-sm md:text-lg w-full md:w-2/3 hidden sm:inline-block">
        {shortOverview}...
      </p>
      <div className="flex gap-4 mt-4 sm:mt-2">
        <button className="flex items-center bg-white text-black px-4 md:px-6 py-1 md:py-2 rounded-md font-semibold hover:bg-opacity-75">
          <FaPlay className="mr-1" /> Play
        </button>
        <button className="flex items-center bg-gray-500 text-white px-3 md:px-4 py-1 md:py-2 rounded-md font-semibold hover:bg-opacity-80">
          <span className="text-lg md:text-xl">
            <CiCircleAlert className="mr-1" />
          </span>{" "}
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
