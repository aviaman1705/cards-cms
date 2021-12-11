import { insertNewCard, editCard } from "../helpers/FetchHelper";
import { Container, Button, Row, Col } from "react-bootstrap";
import CardsComp from "../components/my-cards/CardsComp";
import CardItemComp from "../components/my-cards/CardItemComp";
import { getMeCards } from "../helpers/FetchHelper";
import { useEffect, useState } from "react";

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
    <Container className="h-100" id="card-container">
      <Row>
        <Col lg={12}>
          <h1 className="p-4 text-center">My Cards</h1>
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
          <CardsComp
            cards={cards}
            onEdit={onEditCart}
            btnEditStatus={true}
            btnDeleteStatus={true}
          ></CardsComp>
        )}

        {isAddMode && !isEditMode && (
          <CardItemComp
            textBtn="Create"
            clickHandler={add}
            addMode={setAddMode}
            editMode={setEditMode}
          />
        )}
        {!isAddMode && isEditMode && (
          <CardItemComp
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
      cards.push(response);
      setAddMode(false);
    });
  }

  function edit(data) {
    editCard(data, localStorage.getItem("token"), (response) => {
      cards.forEach(function (card, i) {
        if (card._id == response._id) cards[i] = response;
      });
      setEditMode(false);
    });
  }

  function onEditCart(card) {
    setCard(card);
    setAddMode(false);
    setEditMode(true);
  }
}
export default MyCardsPage;
