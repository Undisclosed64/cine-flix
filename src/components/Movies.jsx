import { useEffect, useState } from "react";
import axios from "axios";
import { PiShoppingCartBold } from "react-icons/pi";
import { IoStar } from "react-icons/io5";
import { MovieModal } from "./MovieModal";
import { useCartContext } from "../CartContext";
import { RotatingLines } from "react-loader-spinner";

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
      const updatedMovies = response.data.results.map((movie) => ({
        ...movie,
        isAdded: false,
      }));
      setMovies(updatedMovies);
    };
    fetchMovies();
  }, []);

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

  const openModal = (movieId) => {
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

  const handleAddToCart = (e, movie) => {
    e.stopPropagation();
    movie.price = 16.99;
    addMovie(movie);
  };

  return (
    <div className="movies-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-4 px-4 py-20 sm:px-10 bg-black place-items-center sm:place-items-start ">
      {movies.length === 0 ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="#ffd62c"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        movies.map((movie) => {
          const firstGenre = genre.genres.find((item) =>
            movie.genre_ids.includes(item.id)
          );

          return (
            <div
              key={movie.id}
              className="bg-darkblue3 hover:bg-[#1f2937] cursor-pointer rounded border border-darkblue hover:border-darkblue2 w-[350px] sm:w-auto"
              onClick={() => openModal(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
                className="rounded-t h-[350px] sm:h-auto w-full sm:w-auto object-cover sm:object-contain"
              />

              <div className="content p-3 flex flex-col justify-between">
                <h2 className="text-[#e6e8e9] mb-2">{movie.original_title}</h2>
                <div className="sub-group text-darkgrey flex items-center text-sm gap-2 mb-4">
                  <div className="genre">
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
                    className="border bg-yellow text-black p-2 rounded font-semibold flex items-center justify-center gap-1 w-1/2 md:w-2/5 lg:w-1/2"
                    onClick={(e) => handleAddToCart(e, movie)}
                  >
                    <PiShoppingCartBold className="text-xl" />
                    Add
                  </button>
                  <button
                    className="w-1/2 md:w-3/5 lg:w-1/2 border border-darkblue2 p-2 rounded text-[#e6e8e9]"
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
        })
      )}
    </div>
  );
};
