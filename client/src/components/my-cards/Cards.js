import CardItem from "./CardItem";

function Cards(props) {
  return (
    <div className="container">
      <div className="row">
        <h1 id="search-business-page-title">רשימת עסקים</h1>
        {!props.cards && <p id="no-result">אין תוצאות</p>}

        {props.cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
        {props.cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
        {props.cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
        {props.cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
        {props.cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
        {props.cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
        {props.cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
      </div>
    </div>
  );

  // return props.cards.map((c, index) => (
  //   <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
  //     <CardItem
  //       card={c}
  //       onEdit={props.onEdit}
  //       onAdd={props.onAdd}
  //       onDelete={props.onDelete}
  //       btnAddStatus={props.btnAddStatus}
  //       btnEditStatus={props.btnEditStatus}
  //       btnDeleteStatus={props.btnDeleteStatus}
  //     ></CardItem>
  //   </div>
  // ));
}
export default Cards;
