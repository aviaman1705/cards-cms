import { Col } from "react-bootstrap";
import CardItem from "./CardItem";

function Cards(props) {
  return props.cards.map((c, index) => (
    <Col xl={3} lg={4} md={6} xs={12} key={index}>
      <CardItem
        card={c}
        onEdit={props.onEdit}
        onAdd={props.onAdd}
        onDelete={props.onDelete}
        btnAddStatus={props.btnAddStatus}
        btnEditStatus={props.btnEditStatus}
        btnDeleteStatus={props.btnDeleteStatus}
      ></CardItem>
    </Col>
  ));
}
export default Cards;
