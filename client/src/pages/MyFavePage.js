import {
  getUserFavoritesCards,
  deleteCardFromFaveorite,
} from "../helpers/FetchHelper";
import { useEffect, useState } from "react";

import Cards from "../components/my-cards/Cards";
import { toast } from "react-toastify";
import { Row, Col, Container } from "react-bootstrap";
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
    <Container id="myfaveorite-container">
      <Row>
        <Col lg={12}>
          <h1 id="my-fave-title">My Favorites</h1>
        </Col>
        <Cards
          cards={cards}
          onDelete={deleteCardFromFave}
          btnDeleteStatus={true}
        />
      </Row>
    </Container>
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
