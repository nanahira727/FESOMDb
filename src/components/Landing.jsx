import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./ui/Rating";
import Button from "./ui/Button";
import { CiBookmark, CiSearch } from "react-icons/ci";
import Tilt from "./ui/Tilt";
import Movie from "./ui/Movie";
import MovieLoading from "./ui/MovieLoading";
import { preload } from "react-dom";
import { useSearchParams } from "react-router-dom";
import nana from "./nana.png";

const Landing = () => {
  const movieIds = ["tt0232500", "tt0848228", "tt0120812", "tt0117060"];
  const [movies, setMovies] = useState([]);
  const [movieIndex, setMovieIndex] = useState(0);
  const [nextMovieIndex, setNextMovieIndex] = useState(1);

  preload("./public/video/tt0232500.mp4", { as: "video" });
  preload("./public/video/tt0848228.mp4", { as: "video" });
  preload("./public/video/tt0120812.mp4", { as: "video" });
  preload("./public/video/tt0117060.mp4", { as: "video" });

  function fetchMovies() {
    for (var i = 0; i < movieIds.length; i++) {
      fetchMovie(movieIds[i]);
    }
    // setMovies((prev) => prev.sort((a, b) => +a.Title[0] - +b.Title[0]));
  }

  async function fetchMovie(id) {
    let promise;
    let promise2;
    try {
      promise = await fetch(`https://www.omdbapi.com/?apikey=77bf5344&i=${id}`);
      promise2 = await promise.json();
      setMovies((prev) => [...prev, promise2]);
    } catch {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const [doSwitch, setDoSwitch] = useState(false);

  const [vidNum, setVidNum] = useState(1);
  const [vidTr1, setVidTr1] = useState("");
  const [vidTr2, setVidTr2] = useState("translate-x-[110%] absolute");
  const [vidBgTr1, setVidBgTr1] = useState("");
  const [vidBgTr2, setVidBgTr2] = useState("opacity-0");
  const [descTopTr, setDescTopTr] = useState("");
  const [descBotTr, setDescBotTr] = useState("");
  const [descRatingTr, setDescRatingTr] = useState("opacity-60");
  const [vidSrc1, setVidSrc1] = useState(
    `./public/video/${movies.length && movies[movieIndex].imdbID}.mp4`
  );
  const [vidSrc2, setVidSrc2] = useState(
    `./public/video/${movies.length && movies[movieIndex].imdbID}.mp4`
  );

  useEffect(() => {
    setVidSrc1(
      `./public/video/${movies.length && movies[movieIndex].imdbID}.mp4`
    );
    setVidSrc2(
      `./public/video/${
        movies.length === 4 && movies[nextMovieIndex].imdbID
      }.mp4`
    );
  }, [movies]);

  useEffect(() => {
    setTimeout(() => {
      setDoSwitch(true);
    }, 4000);
  }, []);

  useEffect(() => {
    if (doSwitch) {
      switchMovie();
      setDoSwitch(false);
      setTimeout(() => {
        setDoSwitch(true);
      }, 8000);
    }
  }, [doSwitch]);

  function switchMovie() {
    setDescTopTr("opacity-0 -translate-y-[30px]");
    setDescBotTr("opacity-0");
    setDescRatingTr("opacity-0");
    setTimeout(() => {
      setDescTopTr("opacity-100");
      setDescBotTr("opacity-100");
      setDescRatingTr("opacity-60");
    }, 300);

    if (vidNum === 1) {
      // console.log("VIDNUM 1");
      // setVidSrc1(`/video/${movies.length && movies[movieIndex].imdbID}.mp4`);
      // setVidSrc2(
      //   `/video/${movies.length === 4 && movies[nextMovieIndex].imdbID}.mp4`
      // );

      setVidTr1("-translate-x-[110%] duration-300 absolute");
      setVidTr2("translate-x-[110%] duration-0");

      setVidBgTr1("opacity-0");
      setVidBgTr2("opacity-100");

      setTimeout(() => {
        setVidTr2("translate-x-[0%] duration-300");
      }, 1);

      setTimeout(() => {
        setMovieIndex(movieIndex <= movieIds.length - 2 ? movieIndex + 1 : 0);
        // setNextMovieIndex(
        //   nextMovieIndex <= movieIds.length - 2 ? nextMovieIndex + 2 : nextMovieIndex - 2
        // );
        const nextMovie = movieIndex + 2 > 3 ? movieIndex - 2 : movieIndex + 2;
        setVidSrc1(
          `./public/video/${
            movies.length === 4 && movies[nextMovie].imdbID
          }.mp4`
        );

        setVidNum(2);
      }, 300);
    } else {
      // console.log("VIDNUM 2");
      // setVidSrc2(`/video/${movies.length && movies[movieIndex].imdbID}.mp4`);
      // setVidSrc1(
      //   `/video/${movies.length === 4 && movies[nextMovieIndex].imdbID}.mp4`
      // );

      setVidTr1("translate-x-[110%] duration-0");
      setVidTr2("-translate-x-[110%] duration-300 absolute");

      setVidBgTr1("opacity-100");
      setVidBgTr2("opacity-0");

      setTimeout(() => {
        setVidTr1("translate-x-[0%] duration-300");
      }, 1);
      setTimeout(() => {
        setMovieIndex(movieIndex <= movieIds.length - 2 ? movieIndex + 1 : 0);
        // setNextMovieIndex(
        //   nextMovieIndex <= movieIds.length - 2 ? nextMovieIndex + 1 : 0
        // );

        const nextMovie = movieIndex + 2 > 3 ? movieIndex - 2 : movieIndex + 2;
        setVidSrc2(
          `./public/video/${
            movies.length === 4 && movies[nextMovie].imdbID
          }.mp4`
        );

        setVidNum(1);
      }, 300);
    }
  }

  const [vidTr, setVidTr] = useState("opacity-0");

  function videoLoaded() {
    if (vidTr === "opacity-0") setVidTr("opacity-100");
  }

  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const search = document.querySelector("#search_landing").value;
    // console.log("search:", document.querySelector("#search_landing").value);
    const filter = searchParams.get("filter");
    navigate(
      `/FESOMDb/search?q=${search}` + (filter ? `&filter=${filter}` : "")
    );
  }

  return (
    <section id="landing" className="bg-dark-1 w-screen overflow-x-hidden">
      <div className="pt-14 relative flex justify-center h-[600px] mb-14">
        {/* <button
          className="text-white absolute w-10 h-10 bg-dark-4 z-20"
          onClick={() => {
            switchMovie();
          }}
        >
          test {movieIndex}
        </button> */}
        <div className="absolute size-20">
          <img src="src/components/nana.png" alt="" />
        </div>
        <div className="absolute size-20 translate-x-[100%]">
          <img src={nana} alt="" />
        </div>
        <div className="absolute hidden md:flex justify-center items-center h-full w-full overflow-hidden opacity-20">
          {movies.length === 4 && (
            <>
              <video
                className={`blur-2xl flex perspective-bg w-5/7 mx-auto ${vidBgTr1} duration-300 transition-opacity`}
                autoPlay
                muted
                loop
                playsInline
                src={vidSrc1}
              ></video>
              <video
                className={`blur-2xl flex perspective-bg w-5/7 mx-auto absolute ${vidBgTr2} duration-300 transition-opacity`}
                autoPlay
                muted
                loop
                playsInline
                src={vidSrc2}
              ></video>
            </>
          )}
        </div>
        <div className="flex justify-between items-center h-full max-w-[1300px] w-full flex-col md:flex-row">
          <Tilt>
            <div
              className={`z-10 perspective-left rounded-2xl overflow-hidden shadow mx-4 mt-6 w-full flex ${vidTr} max-w-11/12`}
            >
              {movies.length === 4 && (
                <>
                  <video
                    className={`rounded-2xl overflow-hidden ${vidTr1}`}
                    autoPlay
                    muted
                    loop
                    src={vidSrc1}
                    onLoadedData={videoLoaded()}
                  />
                  <video
                    className={`rounded-2xl overflow-hidden ${vidTr2}`}
                    autoPlay
                    muted
                    loop
                    src={vidSrc2}
                  />
                </>
              )}
            </div>
          </Tilt>

          <div className="min-h-2/3 md:ml-6 mt-6 flex flex-col justify-between text-white z-2 w-11/12 md:w-full max-w-[560px] ">
            <div className={`flex flex-col ${descTopTr} duration-300`}>
              <div className="text-5xl">
                {movies.length && movies[movieIndex].Title}
              </div>
              <div className="text-sm my-2 opacity-70">
                {movies.length &&
                  movies[movieIndex].Year +
                    " • " +
                    movies[movieIndex].Runtime +
                    " • " +
                    movies[movieIndex].Rated}
              </div>
              <div className="text-light-2 max-w-[480px]">
                {movies.length && movies[movieIndex].Plot}
              </div>
            </div>
            <div>
              <div className={`text-sm my-2 ${descRatingTr} duration-300`}>
                {movies.length && movies[movieIndex].Genre}
              </div>
              <div className={`${descBotTr} duration-300`}>
                {movies.length && <Rating movie={movies[movieIndex]} />}
              </div>

              <div className="mt-4 mb-4 md:mb-0 flex">
                <Button
                  title="Save"
                  rightIcon={
                    <CiBookmark className="size-4 text-light-3 group-hover:text-black" />
                  }
                  containerClass={"shadow-sm group"}
                />
                <Link
                  to={
                    movies.length &&
                    `/FESOMDb/movies/${movies[movieIndex].imdbID}`
                  }
                >
                  <Button
                    title="View"
                    rightIcon={
                      <CiSearch className="size-4 text-light-3 group-hover:text-black" />
                    }
                    containerClass={"shadow-sm group ml-2"}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-1 border-dark-2 w-full md:w-10/12 mx-auto md:-translate-x-2 pt-4 md:pt-0"></div>

      <div className="flex flex-col items-center mt-6 mb-4">
        <div className="text-white text-2xl flex justify-center lg:justify-start w-11/12 md:w-4/5 max-w-[1200px] lg:ml-5">
          Featured Movies
        </div>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-11/12 md:w-4/5 md:max-w-[560px] lg:max-w-[1200px] m-auto">
          {movies.length === 4
            ? movies.map((movie) => (
                <Movie
                  movie={movie}
                  loadingState={false}
                  key={`${movie.imdbID}a`}
                />
              ))
            : [1, 2, 3, 4].map((index) => <MovieLoading key={index} />)}
        </div>
      </div>

      <div className="border-b-1 border-dark-2 w-full md:w-10/12 m-auto md:-translate-x-2"></div>

      <div className="flex flex-col items-center mt-6 mb-12">
        <div className="text-white text-2xl flex justify-center lg:justify-start w-11/12 md:w-4/5 max-w-[1200px] lg:ml-5">
          Features
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-3 w-11/12 md:w-4/5 max-w-[1200px] mt-6">
          <div className="mx-2 flex flex-col items-center lg:flex-row lg:items-start">
            <div className="min-w-[80px] lg:min-w-[100px] lg:mr-4 relative">
              <div className="bg-yellow-neon size-[80px] lg:size-[100px] rounded-xl blur-md absolute opacity-10"></div>
              <div className="bg-yellow-neon size-[80px] lg:size-[100px] rounded-xl flex justify-center items-center font-bold text-6xl font-staatliches italic select-none">
                <div className="-translate-x-1">1</div>
              </div>
            </div>
            <div className="text-light-2 flex my-4 lg:my-0 lg:mr-4 text-center lg:text-start w-3/5 lg:w-full">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
              ipsa nesciunt, obcaecati vero deleniti quasi.
            </div>
          </div>
          <div className="mx-2 flex flex-col items-center lg:flex-row lg:items-start">
            <div className="min-w-[80px] lg:min-w-[100px] lg:mr-4 relative">
              <div className="bg-blue-neon size-[80px] lg:size-[100px] rounded-xl blur-md absolute opacity-10"></div>
              <div className="bg-blue-neon size-[80px] lg:size-[100px] rounded-xl flex justify-center items-center font-bold text-6xl font-staatliches italic select-none">
                <div className="-translate-x-1">2</div>
              </div>
            </div>
            <div className="text-light-2 flex my-4 lg:my-0 lg:mr-4 text-center lg:text-start w-3/5 lg:w-full">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              ipsam perferendis consectetur nulla, adipisci reprehenderit nemo
              suscipit autem quam asperiores. Obcaecati cum laboriosam ab alias.
            </div>
          </div>
          <div className="mx-2 flex flex-col items-center lg:flex-row lg:items-start">
            <div className="min-w-[80px] lg:min-w-[100px] lg:mr-4 relative">
              <div className="bg-pink-neon size-[80px] lg:size-[100px] rounded-xl blur-md absolute opacity-10"></div>
              <div className="bg-pink-neon size-[80px] lg:size-[100px] rounded-xl flex justify-center items-center font-bold text-6xl font-staatliches italic select-none">
                <div className="-translate-x-1">3</div>
              </div>
            </div>
            <div className="text-light-2 flex my-4 lg:my-0 lg:mr-4 text-center lg:text-start w-3/5 lg:w-full">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam,
              eos.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center">
          {/* <div className="text-light-2 text-lg">Begin your search...</div> */}
          <div className="flex justify-center w-[1/3vw]">
            <form
              className="relative border-1 rounded-md p-1.5 pl-2.5 md:w-90 lg:w-full lg:max-w-[440px] border-dark-3"
              onSubmit={handleSubmit}
            >
              <input
                id="search_landing"
                type="text"
                className="w-80 text-light-3 outline-none"
                placeholder="Begin your search..."
                autoComplete="off"
              />
              <button className="absolute right-1 top-1 text-[18px] p-1 px-3 border-1 rounded-sm border-dark-3 text-light-3 cursor-pointer select-none hover:bg-white hover:border-white hover:text-black transition-all duration-100">
                <CiSearch />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
