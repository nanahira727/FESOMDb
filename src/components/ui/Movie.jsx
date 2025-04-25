import React, { useEffect, useRef, useState } from "react";
import Rating from "./Rating";
import { Link, useLocation } from "react-router-dom";
import Tilt from "./Tilt";

const Movie = ({ movie: movie_, loadingState, searchState }) => {
  const [movie, setMovie] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [tryRatings, setTryRatings] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  async function fetchMovie() {
    let promise;
    try {
      promise = await fetch(
        `https://www.omdbapi.com/?apikey=77bf5344&i=${movie_.imdbID}`
      );
      setMovie(await promise.json());
      setLoading(false);
    } catch {
      console.log(e);
    }
  }

  function delay() {
    return new Promise((resolve) => setTimeout(() => resolve(), 3000));
  }

  useEffect(() => {
    if (!loadingState) {
      fetchMovie();
    }
  }, []);

  useEffect(() => {
    setRatings(movie.Ratings);
    if (!ratings) {
      setTryRatings((prev) => prev + 1);
    }
  }, [movie, tryRatings]);

  function info() {
    let string = `${movie.Year} `;
    if (Number.isInteger(parseInt(movie.Runtime.split(" ")[0]))) {
      string += ` • ${movie.Runtime}`;
    }
    if (
      movie.Rated !== "N/A" &&
      movie.Rated !== "Unrated" &&
      movie.Rated !== "Not Rated"
    ) {
      string += ` • ${movie.Rated}`;
    }
    return string;
  }

  return (
    <div className="text-white mx-2 md:mx-2 my-2 md:my-4">
      <Tilt>
        <div className="overflow-hidden rounded-md border-1 border-dark-2 movie-shadow relative">
          {!loading ? (
            <>
              <Link
                to={{
                  pathname: `/FESOMDb/movies/${movie.imdbID}`,
                  search: searchState,
                }}
                state={{ prevPath: location.pathname }}
              >
                <div className="z-11 absolute top-0 left-0 size-full"></div>
              </Link>
              <div className="overflow-hidden rounded-md border-b-1 border-dark-2 aspect-9/13 group-hover:opacity-70 transition-all duration-200">
                <img
                  className="object-cover w-full h-full"
                  src={movie.Poster}
                  alt=""
                />
              </div>
              <div className="mx-2 my-1">
                <div className="text-md md:text-lg min-h-12 leading-5 md:leading-6 mt-2">
                  {movie.Title}
                </div>
                <div className="text-sm text-light-4">{info()}</div>
                <div className="text-sm text-light-4">{`${movie.Genre}`}</div>
                <div className="mb-1">
                  {ratings && <Rating movie={movie} />}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-dark-2 aspect-9/13"></div>
              <div className="text-lg min-h-33"></div>
            </>
          )}
        </div>
      </Tilt>
    </div>
  );
};

export default Movie;
