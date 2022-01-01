import {
  getUserFavoritesCards,
  deleteCardFromFaveorite,
} from "../helpers/FetchHelper";
import { useEffect, useState } from "react";

import Cards from "../components/my-cards/Cards";
import { toast } from "react-toastify";
import { Row, Col } from "react-bootstrap";

function MyFavePage() {
  let [cards, setCards] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token"))
      getUserFavoritesCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });
  }, []);

  return (
    <div className="container h-100">
      <Row>
        <Col lg={12}>
          <h1 className="p-4 text-center">My Favorites</h1>
        </Col>
        <Cards
          cards={cards}
          onDelete={deleteCardFromFave}
          btnDeleteStatus={true}
        />
      </Row>
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
