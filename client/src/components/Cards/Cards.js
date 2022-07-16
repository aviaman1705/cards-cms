import { useEffect, useState } from "react";
import CardItem from "./CardItem/CardItem";
import CardDataService from "../../services/card.service";
import { useAuth } from "../../firebase/firebase";

import "./Cards.css";

function Cards(props) {
  const currentUser = useAuth();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getCards();
    }
  }, [currentUser]);

  const getCards = async () => {
    const data = await CardDataService.getAllCards();
    console.log(data.docs);
    setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div className="container">
      <div id="cards-wrapper" className="row">
        <h1 id="search-business-page-title">רשימת עסקים</h1>
        {!cards && <p id="no-result">אין תוצאות</p>}

        {cards.map((card) => (
          <CardItem
            getCardId={props.getCardId}
            key={card.id}
            card={card}
            onEdit={props.onEdit}
            onAdd={props.onAdd}
            onDelete={props.onDelete}
            btnAddStatus={props.btnAddStatus}
            btnEditStatus={props.btnEditStatus}
            btnDeleteStatus={props.btnDeleteStatus}
          />
        ))}
      </div>
    </div>
  );
}
export default Cards;
