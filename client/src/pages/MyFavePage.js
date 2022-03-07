import {
  getUserFavoritesCards,
  deleteCardFromFaveorite,
} from "../helpers/FetchHelper";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import "./MyFavePage.css";

function MyFavePage() {
  let [cards, setCards] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token"))
      getUserFavoritesCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });
  }, []);

  return (
    <div className="container" id="myfaveorite-container">
      <div className="row">
        <div className="col-12">
          <h1 id="my-fave-title">My Favorites</h1>
        </div>
        <Cards
          cards={cards}
          onDelete={deleteCardFromFave}
          btnDeleteStatus={true}
        />
      </div>
    </div>
  );

  function deleteCardFromFave(id) {
    toast("Item deleted to favorites");
    setTimeout(() => {
      deleteCardFromFaveorite(id, localStorage.getItem("token"), (data) => {
        setCards(cards.filter((item) => item._id !== id));
      });
    }, 500);
  }
}
export default MyFavePage;
