import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { firebaseApp } from ".";
import { auth } from "./auth.utils";

type MovieData = {
  userId: string;
  title: string;
  releaseDate: number;
  receivedAnOscar: boolean;
};

export type MovieDataType = MovieData & {
  id: string;
};

export const db = getFirestore(firebaseApp);

const moviesCollectionRef = collection(db, "movies");

export const getMoviesDocs = async (): Promise<MovieDataType[]> => {
  const data = await getDocs(moviesCollectionRef);

  return data.docs.map((doc) => {
    const movieDocData = doc.data() as MovieData;
    const movieDocId = doc.id;

    return {
      ...movieDocData,
      id: movieDocId,
    };
  });
};

export const addMovieDoc = async (
  title: string,
  releaseDate: number,
  oscarWinner: boolean
) => {
  return await addDoc(moviesCollectionRef, {
    title,
    releaseDate,
    receivedAnOscar: oscarWinner,
    userId: auth?.currentUser?.uid,
  });
};

export const deleteMovieDoc = async (id: string) => {
  const movieDoc = doc(db, "movies", id);
  return await deleteDoc(movieDoc);
};
