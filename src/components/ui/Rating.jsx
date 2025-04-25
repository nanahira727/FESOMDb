import React, { useEffect, useState } from "react";
import { FaImdb } from "react-icons/fa";
import { LiaImdb } from "react-icons/lia";
import { SiMetacritic, SiRottentomatoes } from "react-icons/si";

const Value = (value) => {
  let color = "";

  if (parseFloat(value.split("/")[1]) === 10) {
    let rating = parseFloat(value.split("/")[0]);
    // console.log("PARSE", rating);
    if (rating >= 7) {
      color = "text-green-r";
    } else if (rating >= 5) {
      color = "text-yellow-r";
    } else {
      color = "text-red-r";
    }
    return (
      <div className="text-light-4">
        <span className={color}>{rating}</span>/
        {parseFloat(value.split("/")[1])}
      </div>
    );
  }
  if (!parseFloat(value.split("/")[1])) {
    let rating = parseFloat(value.split("%")[0]);
    // console.log("PARSE", rating);
    if (rating >= 70) {
      color = "text-green-r";
    } else if (rating >= 50) {
      color = "text-yellow-r";
    } else {
      color = "text-red-r";
    }
    return <div className={color}>{rating}%</div>;
  }
  if (parseFloat(value.split("/")[1]) === 100) {
    let rating = parseFloat(value.split("/")[0]);
    // console.log("PARSE", rating);
    if (rating >= 70) {
      color = "text-green-r";
    } else if (rating >= 50) {
      color = "text-yellow-r";
    } else {
      color = "text-red-r";
    }
    return (
      <div className="text-light-4">
        <span className={color}>{rating}</span>/
        {parseFloat(value.split("/")[1])}
      </div>
    );
  }
};

const Rating = ({ movie }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    setRatings(movie.Title);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-start text-sm">
      {movie.Ratings && movie.Ratings[0] && (
        <div className="flex items-center mr-1 lg:mr-3">
          <div className="flex items-center">
            <LiaImdb className="size-8 mr-1 opacity-50" />
            {Value(movie.Ratings[0].Value)}
          </div>
        </div>
      )}
      {movie.Ratings && movie.Ratings[1] && (
        <div className="flex items-center mr-1 lg:mr-3">
          <div className="flex items-center">
            <SiRottentomatoes className="size-4.5 mr-1 opacity-50" />
            {Value(movie.Ratings[1].Value)}
          </div>
        </div>
      )}
      {movie.Ratings && movie.Ratings[2] && (
        <div className="flex items-center">
          <div className="flex items-center">
            <SiMetacritic className="size-4.5 mr-1 opacity-50" />
            {Value(movie.Ratings[2].Value)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating;
