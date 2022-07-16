import { editCard, deleteCard, createCard } from "../helpers/FetchHelper";
import { getMeCards } from "../helpers/FetchHelper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/UI/Button/Button";
import CardForm from "../components/Cards/CardForm/CardForm";
import Cards from "../components/Cards/Cards";

import "./MyCardsPage.css";
import { useAuth } from "../firebase/firebase";
import AddCard from "../components/Cards/AddCard";

function MyCardsPage() {
  //const currentUser = useAuth();

  const [cardId, setCardId] = useState("");
  const [isAddMode, setAddMode] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [card, setCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [serverError, setServerError] = useState(false);

  // useEffect(() => {
  //   if (currentUser)
  //     getMeCards((data) => {
  //       setCards(data.filter((card) => card.user_id === currentUser.uid));
  //     });
  // }, [currentUser]);

  const getCardIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setCardId(id);
  };

  const setDefaultMode = () => {
    setAddMode(false);
    setEditMode(false);
  };

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
    createCard(card).then(
      function (value) {
        console.log("Contents: " + value);
        setServerError(false);
        setAddMode(false);
      },
      function (reason) {
        console.log(`${reason.message}`);
        setServerError(true);
      }
    );
  };

  const onEditCardHandler = (card) => {
    editCard(card, (response) => {
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
            getCardId={getCardIdHandler}
            onEdit={changeEditModeHandler}
            onDelete={onDeleteCardHandler}
            btnEditStatus={true}
            btnDeleteStatus={true}
          />
        )}

        {isAddMode && !isEditMode && (
          <AddCard btnText="הוסף" setDefaultMode={setDefaultMode} />
          // <CardForm
          //   textBtn="יצירה"
          //   clickHandler={onAddCardHandler}
          //   card={{
          //     bizName: "",
          //     bizDescription: "",
          //     bizAddress: "",
          //     bizPhone: "",
          //     bizImage: "",
          //   }}
          //   addMode={setAddMode}
          //   editMode={setEditMode}
          //   serverError={serverError}
          // />
        )}
        {!isAddMode && isEditMode && (
          <AddCard
            id={cardId}
            setCardId={setCardId}
            setDefaultMode={setDefaultMode}
            btnText="ערוך"
          />
          // <CardForm
          //   textBtn="עריכה"
          //   clickHandler={onEditCardHandler}
          //   card={card}
          //   addMode={setAddMode}
          //   editMode={setEditMode}
          // />
        )}
      </div>
    </div>
  );
}
export default MyCardsPage;
