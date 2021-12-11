import {
  getUserFavoritesCards,
  deleteCardFromFaveorite,
} from "../helpers/FetchHelper";
import { useEffect, useState } from "react";
import CardsComp from "../components/my-cards/CardsComp";

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
          <h1 className="p-4 text-center">My Favorites</h1>
        </div>
        <CardsComp
          cards={cards}
          onDelete={deleteCardToFave}
          btnDeleteStatus={true}
        ></CardsComp>
      </div>
    </div>
  );

  function deleteCardToFave(id) {
    deleteCardFromFaveorite(id, localStorage.getItem("token"), (data) => {
      getUserFavoritesCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });
    });
  }
}
export default MyFavePage;
