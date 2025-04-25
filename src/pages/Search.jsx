import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Movie from "../components/ui/Movie";
import MovieLoading from "../components/ui/MovieLoading";

// let moviesDefault;
let filter = "";

const Movies = ({ update }) => {
  // const { q } = useParams();

  const [movies, setMovies] = useState([]);
  const [moviesDefault, setMoviesDefault] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [filter, setFilter] = useState(searchParams.get("filter"));
  const [doFilter, setDoFilter] = useState(true);

  async function search() {
    // console.log(`"1" searching ${q}`);
    // console.log("update:", update);

    setLoading(true);
    let promise;
    let promise2;
    try {
      // console.log("try");

      promise = await (
        await fetch(`https://www.omdbapi.com/?apikey=77bf5344&s=${q}`)
      ).json();

      setMovies([]);
      // console.log("2", movies);

      // console.log("3", promise.length);

      // moviesDefault = [...movies];

      if (!promise.Search) {
        setMoviesDefault([]);
        setLoading(false);
        return;
      }

      if (+promise.Search.length >= 10) {
        promise2 = await (
          await fetch(`https://www.omdbapi.com/?apikey=77bf5344&s=${q}&page=2`)
        ).json();

        setMovies(promise.Search.concat(promise2.Search.slice(0, 2)));
        setMoviesDefault(promise.Search.concat(promise2.Search.slice(0, 2)));
        // console.log(moviesDefault, "MOVIES DEFAULT");
      } else {
        setMovies(promise.Search);
        setMoviesDefault(promise.Search);
      }

      // console.log("4", movies);
      // promise.Search.map((p) => console.log(p));

      // filterMovies();
      // moviesListRef.innerHTML = movies
      //   .map((movie) => movieHTML(movie))
      //   .join("");
      // const delay1 = await delay();
      setLoading(false);
    } catch (error) {
      // moviesListRef.innerHTML = moviesError();
      setLoading(false);
      console.log(error);
    }
  }

  function delay() {
    return new Promise((resolve) => setTimeout(() => resolve(), 3000));
  }

  // function filterMovies() {
  //   if (filter === "NEWEST") {
  //     movies.sort((a, b) => b.Year - a.Year);
  //   } else if (filter === "OLDEST") {
  //     movies.sort((b, a) => b.Year - a.Year);
  //   } else if (filter === "DEFAULT") {
  //     movies = moviesDefault.slice();
  //   }
  //   moviesListRef.innerHTML = movies.map((movie) => movieHTML(movie)).join('');
  // }

  function filterChange(event) {
    setFilter(event.target.value);
    // console.log("filterchajnge:", filter);
    // console.log(movies);

    // setMovies(moviesDefault.slice().sort((a, b) => b.Year - a.Year));
    setDoFilter(true);
    // setMovies([
    //   {
    //     Title: "The Fast and the Furious",
    //     Year: "2001",
    //     imdbID: "tt0232500",
    //     Type: "movie",
    //     Poster:
    //       "https://m.media-amazon.com/images/M/MV5BZGRiMDE1NTMtMThmZS00YjE4LWI1ODQtNjRkZGZlOTg2MGE1XkEyXkFqcGc@._V1_SX300.jpg",
    //   },
    //   {
    //     Title: "The Fast and the Furious",
    //     Year: "2001",
    //     imdbID: "tt0232500",
    //     Type: "movie",
    //     Poster:
    //       "https://m.media-amazon.com/images/M/MV5BZGRiMDE1NTMtMThmZS00YjE4LWI1ODQtNjRkZGZlOTg2MGE1XkEyXkFqcGc@._V1_SX300.jpg",
    //   },
    // ]);
    // console.log(moviesDefault);
  }

  function setParams() {
    if (filter) {
      if (filter === "default") {
        setSearchParams({ q: q });
      } else {
        setSearchParams((prev) => {
          // console.log("prev", prev);
          let newParams = { filter: filter };
          return Object.assign({ q: prev.get("q") }, newParams);
        });
      }
    }
  }
  useEffect(() => {
    setParams();
    setDoFilter(true);

    // let moviesTemp = [...moviesDefault];
    // console.log("DO FILTERRRRRRRRRR", moviesTemp);
    // if (filter === "NEWEST") {
    //   console.log("NEWEST");
    //   moviesTemp.sort((a, b) => b.Year - a.Year);
    // } else if (filter === "OLDEST") {
    //   console.log("OLDEST");
    //   moviesTemp.sort((a, b) => a.Year - b.Year);
    // } else if (filter === "CLEAR") {
    //   console.log("CLEAR");
    //   moviesTemp = [];
    // }

    // setMovies(moviesTemp);
  }, [filter]);

  function renderMovies() {
    // console.log("renderMovies()", moviesDefault.length);

    let moviesTemp2 = moviesDefault.slice();
    if (doFilter) {
      // console.log("DO FILTERRRRRRRRRR", moviesDefault);
      if (filter === "newest") {
        moviesTemp2.sort((a, b) => b.Year.split("–")[0] - a.Year.split("–")[0]);
      } else if (filter === "oldest") {
        moviesTemp2.sort((a, b) => a.Year.split("–")[0] - b.Year.split("–")[0]);
      } else if (filter === "default" || !filter) {
        moviesTemp2 = moviesDefault.slice();
      }
    }

    let moviesTemp = [...moviesTemp2];
    // if (+movies.length === 2) {
    //   console.log("SOPDSDSD");
    //   return <div className="text-light-4 mt-4 text-center">2.</div>;
    // }
    // if (doFilter) {
    //   setMovies(moviesTemp);
    //   console.log("DO FILTER @@@@@", moviesTemp, "|||||||||", movies);
    //   setDoFilter(false);
    // }

    if (+moviesTemp.length === 0) {
      // console.log("SOPDSDSD");
      return (
        <div className="text-light-4 mt-4 text-center">
          No results. Try searching something else.
        </div>
      );
    }

    return (
      !loading && (
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-11/12 md:w-4/5 max-w-[1200px] m-auto">
          {moviesTemp.map((movie, index) => (
            <Movie
              movie={movie}
              loadingState={false}
              key={movie.imdbID}
              searchState={`q=${q}` + (filter ? `&filter=${filter}` : "")}
            />
          ))}
        </div>
      )
    );
  }

  function renderLoading() {
    // console.log("loading");
    return (
      loading && (
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-11/12 md:w-4/5 max-w-[1200px] m-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <MovieLoading key={index}/>
          ))}
        </div>
      )
    );
  }

  useEffect(() => {
    search();
    // console.log("0 searching...");
  }, [q]);

  useEffect(() => {
    search();
  }, []);

  function returnOption(value, text) {
    if (filter === value) {
      return (
        <option selected value={value}>
          {text}
        </option>
      );
    } else {
      return <option value={value}>{text}</option>;
    }
  }

  return (
    <section
      id="movies"
      className="bg-dark-1 w-screen h-full min-h-screen pt-14 pb-14 flex flex-col justify-start"
    >
      <div className="flex justify-between items-center mt-6 w-4/5 max-w-[1200px] max-h-[120px] pr-2 mx-auto">
        {(+movies.length !== 0 || loading) && (
          <>
            <div className="pl-2 text-light-4 h-full">
              Showing results for "{q}"
            </div>
            <div className="flex items-center">
              <div className="pl-2 text-light-4 h-full mr-2">Sort:</div>
              <select
                onChange={(event) => filterChange(event)}
                className="bg-dark-1 text-light-3 text-sm border-1 rounded-sm border-dark-3 py-2.5 px-2 w-[124px] focus:border-dark-3"
              >
                {returnOption("default", "Default")}
                {returnOption("newest", "Newest")}
                {returnOption("oldest", "Oldest")}
              </select>
            </div>
          </>
        )}
      </div>
      {loading ? renderLoading() : renderMovies()}
    </section>
  );
};

export default Movies;
