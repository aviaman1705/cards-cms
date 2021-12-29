import { Col } from "react-bootstrap";
import CardComp from "./CardComp";

function CardsComp(props) {
  return props.cards.map((c, index) => (
    <Col xl={3} lg={4} md={6} xs={12} key={index}>
      <CardComp
        card={c}
        onEdit={props.onEdit}
        onAdd={props.onAdd}
        onDelete={props.onDelete}
        btnAddStatus={props.btnAddStatus}
        btnEditStatus={props.btnEditStatus}
        btnDeleteStatus={props.btnDeleteStatus}
      ></CardComp>
    </Col>
  ));
}
export default CardsComp;
