import { insertNewCard, editCard, deleteCard } from "../helpers/FetchHelper";
import { Container, Button, Row, Col } from "react-bootstrap";
import Cards from "../components/my-cards/Cards";
import CardForm from "../components/my-cards/CardForm";
import { getMeCards } from "../helpers/FetchHelper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./MyCards.css";

function MyCardsPage() {
  const [isAddMode, setAddMode] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [card, setCard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token"))
      getMeCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });
  }, []);

  return (
    <Container className="page-container" id="card-container">
      <Row>
        <Col lg={12}>
          <h1 id="my-cards-title">My Cards</h1>
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
          <Cards
            cards={cards}
            onEdit={onEditCart}
            onDelete={remove}
            btnEditStatus={true}
            btnDeleteStatus={true}
          />
        )}

        {isAddMode && !isEditMode && (
          <CardForm
            textBtn="Create"
            clickHandler={add}
            addMode={setAddMode}
            editMode={setEditMode}
          />
        )}
        {!isAddMode && isEditMode && (
          <CardForm
            textBtn="Edit"
            clickHandler={edit}
            card={card}
            addMode={setAddMode}
            editMode={setEditMode}
          />
        )}
      </Row>
    </Container>
  );

  function add(data) {
    insertNewCard(data, localStorage.getItem("token"), (response) => {
      setCards((oldArray) => [...oldArray, response]);
      setAddMode(false);
    });
  }

  function edit(data) {
    editCard(data, localStorage.getItem("token"), (response) => {
      cards.forEach(function (card, i) {
        if (card._id === response._id) cards[i] = response;
      });
      setEditMode(false);
    });
  }

  function remove(cardId) {
    deleteCard(cardId, localStorage.getItem("token"), (response) => {
      toast("The item was successfully deleted");
      setCards(cards.filter((item) => item._id !== cardId));
    });
  }

  function onEditCart(card) {
    setCard(card);
    setAddMode(false);
    setEditMode(true);
  }
}
export default MyCardsPage;
