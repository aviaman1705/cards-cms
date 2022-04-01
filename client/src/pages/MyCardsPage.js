import { insertNewCard, editCard, deleteCard } from "../helpers/FetchHelper";
import { getMeCards } from "../helpers/FetchHelper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/UI/Button/Button";
import CardForm from "../components/Cards/CardForm/CardForm";
import Cards from "../components/Cards/Cards";

import "./MyCardsPage.css";

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

  const changeEditModeHandler = (card) => {
    setCard(card);
    setAddMode(false);
    setEditMode(true);
  };

  const onDeleteCardHandler = (cardId) => {
    deleteCard(cardId, localStorage.getItem("token"), (response) => {
      toast("The item was successfully deleted");
      setCards(cards.filter((item) => item._id !== cardId));
    });
  };

  const onAddCardHandler = (card) => {
    insertNewCard(card, localStorage.getItem("token"), (response) => {
      setCards((oldArray) => [...oldArray, response]);
      setAddMode(false);
    });
  };

  const onEditCardHandler = (card) => {
    editCard(card, localStorage.getItem("token"), (response) => {
      cards.forEach(function (card, i) {
        if (card._id === response._id) cards[i] = response;
      });
      setEditMode(false);
    });
  };

  return (
    <div className="container" id="card-container">
      <div id="cards-wrap" className="row">
        {!isAddMode && !isEditMode && (
          <div id="wrap-add-btn" className="col">
            <Button
              id="btn-add-card"
              className="mb-3"
              type="button"
              onClick={() => {
                setAddMode(true);
              }}
            >
              יצירת כרטיס
            </Button>
          </div>
        )}

        {!isAddMode && !isEditMode && (
          <Cards
            cards={cards}
            onEdit={changeEditModeHandler}
            onDelete={onDeleteCardHandler}
            btnEditStatus={true}
            btnDeleteStatus={true}
          />
        )}

        {isAddMode && !isEditMode && (
          <CardForm
            textBtn="יצירה"
            clickHandler={onAddCardHandler}
            card={{
              bizName: "",
              bizDescription: "",
              bizAddress: "",
              bizPhone: "",
              bizImage: "",
            }}
            addMode={setAddMode}
            editMode={setEditMode}
          />
        )}
        {!isAddMode && isEditMode && (
          <CardForm
            textBtn="עריכה"
            clickHandler={onEditCardHandler}
            card={card}
            addMode={setAddMode}
            editMode={setEditMode}
          />
        )}
      </div>
    </div>
  );
}
export default MyCardsPage;
