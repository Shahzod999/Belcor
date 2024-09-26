import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import MySnackbar from "./components/snackBar/SnackBar";

const App = () => {
  return (
    <>
      <>
        <MySnackbar />
        <Navigation />
      </>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default App;
