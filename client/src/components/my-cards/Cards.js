import CardItem from "./CardItem";

function Cards(props) {
  return props.cards.map((c, index) => (
    <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
      <CardItem
        card={c}
        onEdit={props.onEdit}
        onAdd={props.onAdd}
        onDelete={props.onDelete}
        btnAddStatus={props.btnAddStatus}
        btnEditStatus={props.btnEditStatus}
        btnDeleteStatus={props.btnDeleteStatus}
      ></CardItem>
    </div>
  ));
}
export default Cards;
