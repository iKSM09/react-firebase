import { MovieDataType } from "../../utils/firebase/db.utils";

type MovieListType = {
  movie: MovieDataType;
  deleteMovie: (id: string) => Promise<void>;
};

export const MovieList = ({ movie, deleteMovie }: MovieListType) => {
  return (
    <div className="flex-between">
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
          {movie.receivedAnOscar && " 🏆"}
        </span>
      </h3>

      <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
    </div>
  );
};

export default MovieList;
