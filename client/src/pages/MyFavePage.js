import {
  getUserFavoritesCards,
  deleteCardFromFaveorite,
} from "../helpers/FetchHelper";
import { useEffect, useState } from "react";
import FaveCardsComp from "../components/fave-cards/FaveCardsComp";

function MyFavePage({ user }) {
  let [cards, setCards] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token"))
      getUserFavoritesCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });
  }, []);

  return (
    <div className="container h-100">
      <div className="row">
        <div className="col-lg-12">
          <h1 className="title-page">My Favorites</h1>
        </div>
        <FaveCardsComp
          page="my-fave"
          cards={cards}
          user={user}
          onDelete={deleteCartToFave}
        ></FaveCardsComp>
      </div>
    </div>
  );

  function deleteCartToFave(card) {
    deleteCardFromFaveorite(card._id, localStorage.getItem("token"), (data) => {
      getUserFavoritesCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });
    });
  }
}
export default MyFavePage;
