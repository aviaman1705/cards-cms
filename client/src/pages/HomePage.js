import { getFavoritesCards, addFaveoriteCard } from "../helpers/FetchHelper";
import { useEffect, useState } from "react";
import FaveCardsComp from "../components/fave-cards/FaveCardsComp";

function HomePage({ user }) {
  let [cards, setCards] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token"))
      getFavoritesCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });
  }, []);

  return (
    <div className="container h-100">
      {!user._id && (
        <div className="row">
          <div id="wrap-content">
            <h1 id="title-page">Welcome To Our Business CMS</h1>
            <h2 id="subtitle-page">Create Cards for your business</h2>
            <p className="text-home">
              Join To hundreds of businesses already registered with it
            </p>
          </div>
        </div>
      )}

      {user._id && (
        <div className="row">
          <div className="col-lg-12">
            <h1 className="title-page">Business list</h1>
          </div>

          <FaveCardsComp
            page="home"
            cards={cards}
            user={user}
            onAdd={addCartToFave}
          />
        </div>
      )}

      {user._id && cards.length == 0 && (
        <h2 className="empty-faveorite-title">
          There are no businesses left that can be saved in favorites
        </h2>
      )}
    </div>
  );

  function addCartToFave(card) {
    addFaveoriteCard(
      { bizNumber: card.bizNumber },
      localStorage.getItem("token"),
      (data) => {
        getFavoritesCards(
          localStorage.getItem("token"),
          (data) => {
            setCards(data);
            alert("Item added to favorites");
          },
          (error) => {
            alert(error);
          }
        );
      }
    );
  }
}
export default HomePage;
