import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { getFavoritesCards } from "../../helpers/FetchHelper";
import FaveCardComp from "./FaveCardComp";

function FaveCardsComp({
  page,
  cards,
  user,
  onAdd = (f) => f,
  onDelete = (f) => f,
}) {
  return cards.map((c, index) => (
    <Col lg={3} md={6} xs={12} key={index}>
      <FaveCardComp
        page={page}
        user={user}
        onAdd={onAdd}
        onDelete={onDelete}
        card={c}
      ></FaveCardComp>
    </Col>
  ));
}
export default FaveCardsComp;
