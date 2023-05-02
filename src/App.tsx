import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./utils/firebase/auth.utils";

import Navigation from "./components/navigation/Navigation.component";
import Auth from "./pages/Auth/Auth.page";
import CreateMovies from "./components/create-movies/CreateMovies.component";

import "./App.css";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <Navigation />
      <main>
        {!user && <Auth />}
        <CreateMovies />
      </main>
    </div>
  );
};

export default App;
