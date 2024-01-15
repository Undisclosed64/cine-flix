import { useEffect, useState } from "react";
import axios from "axios";
import { PiShoppingCartBold } from "react-icons/pi";
import { IoStar } from "react-icons/io5";
import { MovieModal } from "./MovieModal";
import { useCartContext } from "../CartContext";

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenres] = useState([]);
  const [openModals, setOpenModals] = useState({});
  const { addMovie } = useCartContext();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmM3ZjZkNTQ4ZDRhOWEwZDgwM2RmNzlkNmIzOTY3ZiIsInN1YiI6IjYxNzQwNGFiNWJjZTllMDA0MzlhZTkwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X7heOxQT_H_S2sVAFY0f49GWL5N1MAUzwKgfUMXM6ms",
          },
        }
      );
      setMovies(response.data.results);
      console.log(response.data.results);
    };
    fetchMovies();
  }, []);

  const openModal = (movieId) => {
    console.log("clicked");
    setOpenModals((prevModals) => ({
      ...prevModals,
      [movieId]: true,
    }));
  };

  const closeModal = (movieId) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [movieId]: false,
    }));
  };
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmM3ZjZkNTQ4ZDRhOWEwZDgwM2RmNzlkNmIzOTY3ZiIsInN1YiI6IjYxNzQwNGFiNWJjZTllMDA0MzlhZTkwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X7heOxQT_H_S2sVAFY0f49GWL5N1MAUzwKgfUMXM6ms",
          },
        }
      );
      setGenres(response.data);
    };
    fetchGenres();
  }, []);

  const handleAddToCart = (e, movie) => {
    e.stopPropagation();
    movie.price = 16.99;
    addMovie(movie);
  };

  return (
    <div className="movies-wrapper grid grid-cols-4 gap-4 p-10 bg-black">
      {movies.map((movie) => {
        const firstGenre = genre.genres.find((item) =>
          movie.genre_ids.includes(item.id)
        );

        return (
          <div
            key={movie.id}
            className=" bg-darkblue3 rounded border border-darkblue"
            onClick={() => openModal(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt=""
              className="rounded-t"
            />

            <div className="content p-3 flex flex-col justify-between">
              <h2 className="text-[#e6e8e9] mb-2">{movie.original_title}</h2>
              <div className="sub-group text-darkgrey flex items-center text-sm gap-2 mb-4">
                <div className="genre">
                  {" "}
                  {firstGenre && <span>{firstGenre.name}</span>}
                </div>
                <span className="bg-darkblue2 w-1 h-1 rounded-full"></span>

                <div className="rating flex items-center gap-1">
                  <IoStar />
                  4.3
                </div>
                <span className="bg-darkblue2 w-1 h-1 rounded-full"></span>
                <div className="price">$16.99</div>
              </div>
              <div className="buttons text-darkgrey flex gap-2 items-end">
                <button
                  className=" border bg-yellow text-black p-2 rounded font-semibold flex items-center justify-center gap-1 w-1/2"
                  onClick={(e) => handleAddToCart(e, movie)}
                >
                  <PiShoppingCartBold className="text-xl" />
                  Add
                </button>
                <button
                  className="w-1/2 border  border-darkblue2 p-2 rounded text-[#e6e8e9]"
                  onClick={() => openModal(movie.id)}
                >
                  View details
                </button>
              </div>
            </div>
            {openModals[movie.id] ? (
              <MovieModal
                id={movie.id}
                closeModal={() => closeModal(movie.id)}
              />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};
