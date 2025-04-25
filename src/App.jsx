import {
  BrowserRouter as Router,
  Route,
  Routes,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import MovieInfo from "./pages/MovieInfo";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

function App() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const update = "start";

  function searchMovies(query) {
    // console.log("app:", query);
    setSearch(query);
    // console.log("app:", search);
  }

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [useLocation()])

  return (
    <main>
      <NavBar searchMovies={searchMovies} />
      <Routes>
        <Route path="FESOMDb/" element={<Home />} />
        <Route path="FESOMDb/movies" element={<Home />} />
        <Route path="FESOMDb/search" update={update} element={<Search />} />
        <Route path="FESOMDb/movies/:id" element={<MovieInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer></Footer>
    </main>
  );
}

export default App;
