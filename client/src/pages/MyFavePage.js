import {
  getUserFavoritesCards,
  deleteCardFromFaveorite,
} from "../helpers/FetchHelper";
import { useEffect, useState } from "react";
import CardsComp from "../components/my-cards/CardsComp";
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
        <CardsComp
          cards={cards}
          onDelete={deleteCardToFave}
          btnDeleteStatus={true}
        ></CardsComp>
      </Row>
    </div>
  );

  function deleteCardToFave(id) {
    toast("Item deleted to favorites");
    setTimeout(() => {
      deleteCardFromFaveorite(id, localStorage.getItem("token"), (data) => {
        getUserFavoritesCards(localStorage.getItem("token"), (data) => {
          setCards(data);
        });
      });
    }, 1000);
  }
}
export default MyFavePage;
