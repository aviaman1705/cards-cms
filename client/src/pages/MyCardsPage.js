import { insertNewCard, editCard } from "../helpers/FetchHelper";
import { Container, Button } from "react-bootstrap";
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
      <h1 className="title-page">My Cards</h1>

      {!isAddMode && !isEditMode && (
        <Button
          className="btn primary"
          onClick={() => {
            setAddMode(true);
          }}
        >
          Create New Card
        </Button>
      )}

      <Container id="cards-section">
        {!isAddMode && !isEditMode && (
          <CardsComp onEdit={onEditCart}></CardsComp>
        )}

        {isAddMode && !isEditMode && (
          <CreateCardComp clickHandler={insertCard}></CreateCardComp>
        )}
        {!isAddMode && isEditMode && (
          <EditCardComp clickHandler={edit} card={card}></EditCardComp>
        )}

        {(isAddMode || isEditMode) && (
          <Button
            id="back-btn"
            className="btn btn-secondary"
            onClick={() => {
              setAddMode(false);
              setEditMode(false);
            }}
          >
            Back
          </Button>
        )}
      </Container>
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
