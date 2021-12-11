import { Col } from "react-bootstrap";
import CardComp from "./CardComp";

function CardsComp({
  cards,
  onEdit,
  onAdd,
  onDelete,
  btnAddStatus,
  btnEditStatus,
  btnDeleteStatus,
}) {
  return cards.map((c, index) => (
    <Col xl={3} lg={4} md={6} xs={12} key={index}>
      <CardComp
        card={c}
        onEdit={onEdit}
        onAdd={onAdd}
        onDelete={onDelete}
        btnAddStatus={btnAddStatus}
        btnEditStatus={btnEditStatus}
        btnDeleteStatus={btnDeleteStatus}
      ></CardComp>
    </Col>
  ));
}
export default CardsComp;
