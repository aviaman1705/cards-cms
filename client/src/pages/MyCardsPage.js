import { insertNewCard, editCard } from "../helpers/FetchHelper";
import { Container, Button, Row, Col } from "react-bootstrap";
import CardsComp from "../components/my-cards/CardsComp";
import CreateCardComp from "../components/my-cards/CreateCardComp";
import EditCardComp from "../components/my-cards/EditCardComp";

import { useState } from "react";
function MyCardsPage() {
  const [isAddMode, setAddMode] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const [card, setCard] = useState(null);

  return (
    <Container className="card-container">
      <Row>
        <Col lg={12}>
          <h1 className="title-page">My Cards</h1>
        </Col>
        {!isAddMode && !isEditMode && (
          <Col lg={12}>
            <Button
              id="create-new-card-btn"
              className="btn primary"
              onClick={() => {
                setAddMode(true);
              }}
            >
              Create New Card
            </Button>
          </Col>
        )}

        {!isAddMode && !isEditMode && (
          <CardsComp onEdit={onEditCart}></CardsComp>
        )}

        {isAddMode && !isEditMode && (
          <CreateCardComp
            clickHandler={insertCard}
            addMode={setAddMode}
            editMode={setEditMode}
          ></CreateCardComp>
        )}
        {!isAddMode && isEditMode && (
          <EditCardComp
            clickHandler={edit}
            card={card}
            addMode={setAddMode}
            editMode={setEditMode}
          ></EditCardComp>
        )}
      </Row>
    </Container>
  );

  function insertCard(data) {
    insertNewCard(data, localStorage.getItem("token"), () => {
      setAddMode(false);
    });
  }

  function onEditCart(card) {
    setCard(card);
    setAddMode(false);
    setEditMode(true);
  }

  function edit(data) {
    editCard(data, localStorage.getItem("token"), (response) => {
      setEditMode(false);
    });
  }
}
export default MyCardsPage;
