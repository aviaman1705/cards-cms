import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { getMeCards, deleteCard } from "../../helpers/FetchHelper";
import CardComp from "./CardComp";

function CardsComp({ handleClick, onEdit }) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token"))
      getMeCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });
  }, []);

  return cards.map((c, index) => (
    <Col lg={3} md={6} xs={12} key={index}>
      <CardComp
        onEdit={onEdit}
        handleClick={(id) => {
          deleteCard(id, localStorage.getItem("token"), (card) => {
            setCards(cards.filter((x) => x._id != id));
          });
        }}
        card={c}
      ></CardComp>
    </Col>
  ));
}
export default CardsComp;
