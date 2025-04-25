import React from "react";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { CiLogin, CiSearch } from "react-icons/ci";

// const [searchParams, setSearchParams] = useSearchParams();

const NavBar = ({ searchMovies }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   const search = document.querySelector("#search").value;
  //   console.log(search);

  //   setSearchParams({"q": search});

  //   navigate(`/search?=${search}`);
  // };

  function handleSubmit(event) {
    event.preventDefault();
    const search = document.querySelector("#search").value;
    searchMovies(search);
    const filter = searchParams.get("filter");
    // setSearchParams({"q": search});
    // navigate({ pathname, search: `?${createSearchParams(params)}` });
    navigate(`/FESOMDb/search?q=${search}` + (filter ? `&filter=${filter}` : ""));
  }

  return (
    <div className="nav w-screen z-20 fixed left-1/2 -translate-x-1/2">
      <div className="z-10 max-w-[1500px] flex justify-between center-items lg:grid lg:grid-cols-3 w-10/12 m-auto text-white py-2 pt-2.5 px-2">
        <div className="relative hidden md:block">
          <Link to="/FESOMDb/" className="z-20">
            <div className="absolute -top-5 -bottom-2 w-[160px] -left-2 z-2"></div>
          </Link>
          <div className="text-3xl font-bold tracking-tight absolute blur-sm opacity-25 select-none z-1">
            <span className="text-yellow-neon">F</span>   
            <span className="text-blue-neon">E</span>
            <span className="text-pink-neon">S</span>
            <span className="text-shadow-indigo-50">OMDb</span>
          </div>
          <div className="text-3xl font-bold tracking-tight select-none z-20">
            <span className="text-yellow-neon">F</span>
            <span className="text-blue-neon">E</span>
            <span className="text-pink-neon">S</span>
            <span className="text-shadow-indigo-50">OMDb</span>
          </div>
        </div>
        <div className="lg:flex lg:justify-center">
          <form
            className="relative border-1 rounded-md p-1.5 pl-2.5 mr-2 md:w-90 lg:w-full lg:max-w-[440px] border-dark-3"
            onSubmit={handleSubmit}
          >
            <input
              id="search"
              type="text"
              className="w-full text-light-3 outline-none"
              placeholder="Search..."
              autoComplete="off"
            />
            <button className="absolute right-1 top-1 text-[18px] p-1 px-3 border-1 rounded-sm border-dark-3 text-light-3 cursor-pointer select-none hover:bg-white hover:border-white hover:text-black transition-all duration-100">
              <CiSearch />
            </button>
          </form>
        </div>
        <div className="lg:flex lg:justify-end">
          <button className="w-[80px] flex justify-center items-center p-2 pl-2.5 border-1 rounded-md border-dark-3 text-light-3 text-sm cursor-pointer select-none hover:bg-white hover:border-white group hover:text-black transition-all duration-100">
            Login
            <span className="ml-1 font-bold text-2xl">
              <CiLogin className="group-hover:text-black text-light-3 size-4.5" />
            </span>
          </button>
        </div>
      </div>
      <div className="border-b-1 border-dark-2 w-full md:w-10/12 m-auto"></div>
    </div>
  );
};

export default NavBar;
