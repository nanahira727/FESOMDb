import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Rating from "../components/ui/Rating";
import Button from "../components/ui/Button";
import { CiBookmark, CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const InfoRow = ({ label, info }) => {
  return (
    <div className="flex w-full mb-1 text-light-2">
      <div className="min-w-[80px] md:min-w-[120px] text-end mr-4 text-light-4 text-sm mt-0.5">
        {label}
      </div>
      <div className="">{info}</div>
    </div>
  );
};

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const filter = searchParams.get("filter");

  async function fetchMovie() {
    let promise;
    try {
      promise = await fetch(`https://www.omdbapi.com/?apikey=77bf5344&i=${id}`);
      setMovie(await promise.json());
      setLoading(false);
    } catch {
      console.log(e);
    }
  }

  useEffect(() => {
    // console.log("REFER", location);
    fetchMovie();
  }, []);

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
    <section id="movie" className="bg-dark-1 w-screen min-h-screen h-full pt-14 pb-6 md:pb-0">
      <div className="text-white mt-8 max-w-[1000px] w-4/5 mx-auto">
        <div className="flex items-start relative">
          <div
            className="hidden md:flex justify-center items-center p-1 px-2 border-1 rounded-sm border-dark-3 text-light-3 text-sm cursor-pointer select-none hover:bg-white hover:border-white group hover:text-black transition-all duration-100 mr-4 mt-2 absolute -translate-x-16"
            onClick={() => {
              // console.log(location.state.prevPath);
              // console.log("on click");
              if (location.state && location.state.prevPath) {
                navigate(-1);
              } else if (q) {
                navigate(`/FESOMDb/search?q=${q}` + (filter ? `&filter=${filter}` : ""));
              } else {
                navigate("/FESOMDb/");
              }
            }}
          >
            <MdKeyboardArrowLeft className="text-[21px]" />
          </div>
          <div className="text-5xl font-bold ">{movie.Title}</div>
        </div>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="overflow-hidden rounded-xl border-1 border-dark-2 min-w-1/3 movie-shadow">
            {!loading ? (
              <img
                className="object-cover w-full h-full"
                src={movie.Poster}
                alt=""
              />
            ) : (
              <div className="bg-dark-2 aspect-9/13"></div>
            )}
          </div>
          <div className="md:ml-8 mt-4 md:mt-1">
            <div>
              <InfoRow label="Plot" info={movie.Plot} />
              <InfoRow label="Actors" info={movie.Actors} />
              <InfoRow label="Released" info={movie.Released} />
              <InfoRow label="Rated" info={movie.Rated} />
              <InfoRow label="Language" info={movie.Language} />
              <InfoRow label="Genre" info={movie.Genre} />
              <div className="hidden md:block border-b-1 border-dark-2 w-full ml-6 mr-12 mt-2"></div>
              <div className="flex w-full mb-1 text-light-2 items-center mt-2">
                <div className="min-w-[80px] md:min-w-[120px] text-end mr-4 text-light-4 text-sm">
                  Ratings
                </div>
                <div className="">
                  <Rating movie={movie}></Rating>
                </div>
              </div>
              <div className="hidden md:block border-b-1 border-dark-2 w-full ml-6 mr-12 mt-2"></div>
            </div>

            <div className="flex justify-center md:justify-start">
              <div className="mt-4 flex md:ml-6 ">
                <Button
                  title="Save to Watchlist"
                  rightIcon={
                    <CiBookmark className="size-4 text-light-3 group-hover:text-black" />
                  }
                  containerClass={"shadow-sm group"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="border-b-1 border-dark-2 w-full mt-8"></div> */}
      </div>
    </section>
  );
};

export default MovieInfo;
