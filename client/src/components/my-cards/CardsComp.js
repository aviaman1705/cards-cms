import { useState, useEffect } from "react";
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
    <CardComp
      key={index}
      onEdit={onEdit}
      handleClick={(id) => {
        deleteCard(id, localStorage.getItem("token"), (card) => {
          setCards(cards.filter((x) => x._id != id));
        });
      }}
      card={c}
    ></CardComp>
  ));
}
export default CardsComp;
