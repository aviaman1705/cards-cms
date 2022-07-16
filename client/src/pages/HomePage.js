import { useState } from "react";
import "./HomePage.css";
import SearchFrom from "../components/search/SearchFrom/SearchFrom";
import Cards from "../components/Cards/Cards";

function HomePage(props) {
  let [cards, setCards] = useState([]);

  // useEffect(() => {
  //   if (localStorage.getItem("token"))
  //     getFavoritesCards(localStorage.getItem("token"), (data) => {
  //       setCards(data);
  //     });
  // }, []);

  return (
    <div className="layout-container container">
      {/* <SearchFrom setCards={setCards} /> */}
      <Cards cards={cards} />
    </div>
  );
}
export default HomePage;
