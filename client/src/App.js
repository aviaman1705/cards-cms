import { ToastContainer } from "react-toastify";
import SinglePageAppComp from "./components/navigation/SinglePageAppComp";
import { useState, useEffect } from "react";
import { getMeData } from "./helpers/FetchHelper";
import Footer from "./components/footer/Footer";

function App() {
  const [user, set] = useState({});

  useEffect(() => {
    getMeData(localStorage.getItem("token"), (data) => {
      set(data);
    });
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <SinglePageAppComp set={set} user={user}></SinglePageAppComp>
      <Footer set={set} user={user}></Footer>
    </>
  );
}

export default App;
