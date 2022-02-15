import {
  getFavoritesCards,
  addFaveoriteCard,
  getCities,
} from "../helpers/FetchHelper";
import { useContext, useEffect, useState } from "react";
import Cards from "../components/my-cards/Cards";
import { toast } from "react-toastify";
import AuthContext from "../state/auth-context";
import "./HomePage.css";
import DropDown from "../components/UI/DropDown/DropDown";

function HomePage(props) {
  const ctx = useContext(AuthContext);
  let [cards, setCards] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token"))
      getFavoritesCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });

    getCities(localStorage.getItem("token"), (response) => {
      setCities(response);
    });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-2">
          <DropDown defaultText="בחר עיר..." items={cities} />
        </div>
      </div>

      {!ctx.isLoggedIn && (
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

      {ctx.isLoggedIn && (
        <div className="container" id="home-container">
          <h1 className="page-title">Business list</h1>
          <div className="row">
            <Cards cards={cards} onAdd={addCardToFave} btnAddStatus={true} />
          </div>
          {ctx.isLoggedIn && cards.length === 0 && (
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
