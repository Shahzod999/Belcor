import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";

const App = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        
      </footer>
    </>
  );
};

export default App;
