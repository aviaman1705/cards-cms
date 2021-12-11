import { ToastContainer } from "react-toastify";
import SinglePageAppComp from "./components/navigation/SinglePageAppComp";
import { useState, useEffect } from "react";
import { getMeData } from "./helpers/FetchHelper";
import Footer from "./components/footer/Footer";
import { createBrowserHistory } from "history";
import Autocomplete from "./components/search/Autocomplete";

function App() {
  const history = createBrowserHistory();
  const [user, set] = useState({});

  useEffect(() => {
    getMeData(localStorage.getItem("token"), (data) => {
      set(data);
    });
  }, []);

  return (
    <main>
      <SinglePageAppComp set={set} user={user}></SinglePageAppComp>
      <Footer set={set} user={user}></Footer>
    </main>
  );
}

export default App;
