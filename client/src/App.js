import { ToastContainer } from "react-toastify";
import SinglePageAppComp from "./components/navigation/SinglePageAppComp";
import { useState, useEffect } from "react";
import { getMeData } from "./helpers/FetchHelper";
import Footer from "./components/footer/Footer";
import { createBrowserHistory } from "history";

function App() {
  const history = createBrowserHistory();
  const [user, set] = useState({});

  useEffect(() => {
    getMeData(localStorage.getItem("token"), (data) => {
      set(data);
    });
  }, []);

  return (
    <div className="App">
      <>
        <SinglePageAppComp set={set} user={user}></SinglePageAppComp>
        <ToastContainer></ToastContainer>
        <Footer set={set} user={user} />
      </>
    </div>
  );
}

export default App;
