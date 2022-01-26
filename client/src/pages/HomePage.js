import { getFavoritesCards, addFaveoriteCard } from "../helpers/FetchHelper";
import { useEffect, useState } from "react";
import Cards from "../components/my-cards/Cards";
import { toast } from "react-toastify";
import "./HomePage.css";

function HomePage(props) {
  let [cards, setCards] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token"))
      getFavoritesCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });
  }, []);

  return (
    <>
      {!props.user._id && (
        <div id="anonymous-container">
          <div id="wrap-content">
            <h1 id="title-page">Welcome To Our Business CMS</h1>
            <h2 id="subtitle-page">Create Cards for your business</h2>
            <p className="text-home">
              Join To hundreds of businesses already registered with it
            </p>
          </div>
        </div>
      )}

      {props.user._id && (
        <div className="container" id="home-container">
          <h1 className="page-title">Business list</h1>
          <div className="row">
            <Cards cards={cards} onAdd={addCardToFave} btnAddStatus={true} />
          </div>
          {props.user._id && cards.length === 0 && (
            <h2 className="empty-faveorite-title text-center">
              There are no businesses left that can be saved in favorites
            </h2>
          )}
        </div>
      )}
    </>
  );

  function addCardToFave(card) {
    toast("Item added to favorites");

    setTimeout(() => {
      addFaveoriteCard(
        { bizNumber: card.bizNumber },
        localStorage.getItem("token"),
        (data) => {
          setCards(cards.filter((item) => item._id !== data._id));
        }
      );
    }, 500);
  }
}
export default HomePage;
