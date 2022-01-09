import { getFavoritesCards, addFaveoriteCard } from "../helpers/FetchHelper";
import { useEffect, useState } from "react";
import Cards from "../components/my-cards/Cards";
import { toast } from "react-toastify";
import { Row, Col, Container } from "react-bootstrap";
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
    <div>
      {!props.user._id && (
        <Container id="anonymous-container">
          <Row>
            <Col>
              <div id="wrap-content">
                <h1 id="title-page">Welcome To Our Business CMS</h1>
                <h2 id="subtitle-page">Create Cards for your business</h2>
                <p className="text-home">
                  Join To hundreds of businesses already registered with it
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      )}

      {props.user._id && (
        <Container id="home-container">
          <Row>
            <Col lg={12}>
              <h1 id="business-list-title">Business list</h1>
            </Col>
            <Cards cards={cards} onAdd={addCardToFave} btnAddStatus={true} />
            {props.user._id && cards.length === 0 && (
              <h2 className="empty-faveorite-title text-center">
                There are no businesses left that can be saved in favorites
              </h2>
            )}
          </Row>
        </Container>
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
          setCards(cards.filter((item) => item._id !== data._id));
        }
      );
    }, 500);
  }
}
export default HomePage;
