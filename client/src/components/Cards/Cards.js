import CardItem from "./CardItem/CardItem";
import "./Cards.css";

function Cards(props) {
  return (
    <div className="container">
      <div id="cards-wrapper" className="row">
        <h1 id="search-business-page-title">רשימת עסקים</h1>
        {!props.cards && <p id="no-result">אין תוצאות</p>}

        {props.cards.map((card) => (
          <CardItem
            key={card._id}
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
