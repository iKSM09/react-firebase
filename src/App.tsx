import Auth from "./components/Auth.component";
import CreateMovies from "./components/CreateMovies.component";

import "./App.css";
import Navigation from "./components/navigation/Navigation.component";

const App = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Auth />

        <CreateMovies />
      </main>
    </div>
  );
};

export default App;
