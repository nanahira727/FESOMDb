import React, { useEffect, useState } from "react";
import Rating from "./Rating";

const MovieLoading = () => {
  return (
    <div className="text-white mx-2 my-4">
      <div className="overflow-hidden rounded-md border-1 border-dark-2 movie-shadow">
        <div className="bg-dark-2 aspect-9/13"></div>
        <div className="text-lg min-h-33"></div>
      </div>
    </div>
  );
};

export default MovieLoading;
