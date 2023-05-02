import { useEffect, useState } from "react";
import {
  MovieDataType,
  addMovieDoc,
  deleteMovieDoc,
  getMoviesDocs,
} from "../utils/firebase/db.utils";

const CreateMovies = () => {
  const [movieList, setMovieList] = useState<MovieDataType[]>([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState<number | string>("");
  const [isOscarWinner, setIsOscarWinner] = useState(false);

  const getMovieList = async () => {
    try {
      const filteredData = await getMoviesDocs();
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const addMovie = async () => {
    try {
      await addMovieDoc(newMovieTitle, newReleaseDate as number, isOscarWinner);
      setNewMovieTitle("");
      setNewReleaseDate("");
      setIsOscarWinner(false);
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id: string) => {
    try {
      await deleteMovieDoc(id);
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <section>
        <div className="flex-between">
          <h2>Add New Movies</h2>
          <button onClick={addMovie} color="blue">
            Submit Movie
          </button>
        </div>
        <div className="input-area">
          {/* <label htmlFor="movieName">Name of the Movie:</label> */}
          <input
            type="text"
            name="movieName"
            value={newMovieTitle}
            onChange={(e) => setNewMovieTitle(e.target.value)}
            placeholder="Name of the movie"
          />

          {/* <label htmlFor="releaseDate">Release Date:</label> */}
          <input
            type="number"
            name="releaseDate"
            value={newReleaseDate}
            onChange={(e) => setNewReleaseDate(Number(e.target.value))}
            placeholder="Release Date"
          />

          <div>
            <input
              type="checkbox"
              name="receivedOscar"
              checked={isOscarWinner}
              onChange={(e) => setIsOscarWinner(e.target.checked)}
            />
            <label htmlFor="receivedOscar">Received an Oscar</label>
          </div>
        </div>
      </section>

      <section className="flex-col">
        {movieList.map((movie) => (
          <div key={movie.id} className="flex-between">
            <h3>
              {movie?.releaseDate}:{" "}
              <span
                style={{
                  color: `${
                    movie.receivedAnOscar ? "var(--green-6)" : "var(--red-6)"
                  }`,
                }}
              >
                {movie?.title}
              </span>
            </h3>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
          </div>
        ))}
      </section>
    </>
  );
};

export default CreateMovies;
