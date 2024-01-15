import { useEffect, useState } from "react";
import axios from "axios";
import { PiShoppingCartBold } from "react-icons/pi";
import { IoStar } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useCartContext } from "../CartContext";

export const MovieModal = ({ id, closeModal }) => {
  const [movie, setMovie] = useState(null);
  const { addMovie } = useCartContext();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmM3ZjZkNTQ4ZDRhOWEwZDgwM2RmNzlkNmIzOTY3ZiIsInN1YiI6IjYxNzQwNGFiNWJjZTllMDA0MzlhZTkwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X7heOxQT_H_S2sVAFY0f49GWL5N1MAUzwKgfUMXM6ms",
          },
        }
      );
      setMovie(response.data);
      console.log(response.data);
    };
    fetchMovie();
  }, []);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (movie) {
      movie.price = 16.99;
      addMovie(movie);
      closeModal(id);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden bg-black bg-opacity-80">
      {movie ? (
        <div className="flex w-full max-w-2xl bg-[#1f2937] p-6 border border-darkblue2 rounded text-darkgrey">
          <div className="w-2/5 mr-6">
            <div className="img-wrapper flex flex-col gap-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
                className=""
              />
              <button
                className="bg-yellow text-[#1e2c34] p-2 rounded font-semibold flex items-center justify-center gap-1"
                onClick={(e) => handleAddToCart(e)}
              >
                <PiShoppingCartBold className="text-xl" />
                Add to Cart
              </button>
            </div>
          </div>

          <div className="content-wrapper w-3/5">
            <h1 className="text-[#e6e8e9] text-2xl font-semibold mb-2">
              {movie.title}
            </h1>
            <div className="sub-content-wrapper-one flex items-center gap-2 mb-2">
              <div className="release-date">
                {movie.release_date.substring(0, 4)}
              </div>
              <span className="bg-darkblue2 w-1 h-1 rounded-full"></span>
              <div className="time">{movie.runtime} minutes</div>
            </div>
            <div className="sub-content-wrapper-two flex flex-wrap items-center gap-2 pb-4  mb-4 border-b border-darkblue2">
              <div className="genre flex-shrink-0">
                {movie.genres.map((genre, index, arr) => {
                  return (
                    <span key={index}>
                      {genre.name}
                      {index < arr.length - 1 && ", "}
                    </span>
                  );
                })}
              </div>
              <span className="bg-darkblue2 w-1 h-1 rounded-full"></span>
              <div className="rating flex items-center gap-1">
                <IoStar />
                4.3
              </div>
              <span className="bg-darkblue2 w-1 h-1 rounded-full"></span>
              <div className="price text-[#e6e8e9]">$16.99</div>
            </div>
            <p className="">{movie.overview}</p>
          </div>
          <div className="">
            <button
              className=""
              onClick={(e) => {
                e.stopPropagation();
                closeModal(id);
              }}
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
