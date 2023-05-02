import { useEffect, useState } from "react";
import {
  MovieDataType,
  addMovieDoc,
  deleteMovieDoc,
  getMoviesDocs,
} from "../../utils/firebase/db.utils";
import MovieList from "./MovieList.component";

const CreateMovies = () => {
  const [movieList, setMovieList] = useState<MovieDataType[]>([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState<number | string>("");
  const [isOscarWinner, setIsOscarWinner] = useState(false);

  const getMovieList = async () => {
    try {
      const filteredData = await getMoviesDocs();
      const sortedData = filteredData.sort(
        (a, b) => a.releaseDate - b.releaseDate
      );
      setMovieList(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  const addMovie = async () => {
    if (!newMovieTitle || !newReleaseDate) {
      return alert("Please provide movie title and release date.");
    }
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
      <form>
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
      </form>

      <section className="flex-col">
        {movieList.map((movie) => (
          <MovieList key={movie.id} movie={movie} deleteMovie={deleteMovie} />
        ))}
      </section>
    </>
  );
};

export default CreateMovies;
