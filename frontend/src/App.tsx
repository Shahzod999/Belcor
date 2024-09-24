import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";

const App = () => {
  return (
    <>
      <>
        <Navigation />
      </>
      <main>
        <Outlet />
      </main>
      <footer>
      </footer>
    </>
  );
};

export default App;
