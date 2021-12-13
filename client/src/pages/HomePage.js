import { getFavoritesCards, addFaveoriteCard } from "../helpers/FetchHelper";
import { useEffect, useState } from "react";
import CardsComp from "../components/my-cards/CardsComp";
import { toast } from "react-toastify";
import { Row, Col } from "react-bootstrap";

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
        <Row>
          <div id="wrap-content">
            <h1 id="title-page">Welcome To Our Business CMS</h1>
            <h2 id="subtitle-page">Create Cards for your business</h2>
            <p className="text-home">
              Join To hundreds of businesses already registered with it
            </p>
          </div>
        </Row>
      )}

      {user._id && (
        <Row>
          <Col lg={12}>
            <h1 className="p-4 text-center">Business list</h1>
          </Col>

          <CardsComp
            cards={cards}
            onAdd={addCardToFave}
            btnAddStatus={true}
          ></CardsComp>
        </Row>
      )}

      {user._id && cards.length == 0 && (
        <h2 className="empty-faveorite-title text-center">
          There are no businesses left that can be saved in favorites
        </h2>
      )}
    </div>
  );

  function addCardToFave(card) {
    toast("Item added to favorites");

    setTimeout(() => {
      addFaveoriteCard(
        { bizNumber: card.bizNumber },
        localStorage.getItem("token"),
        (data) => {
          getFavoritesCards(
            localStorage.getItem("token"),
            (data) => {
              setCards(data);
            },
            (error) => {
              toast(error);
            }
          );
        }
      );
    }, 1000);
  }
}
export default HomePage;
