import { Card, Button } from "react-bootstrap";
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai";

function FaveCardComp({ page, user, card, onAdd, onDelete }) {
  return (
    card && (
      <Card>
        <Card.Img variant="top" src={card.bizImage} />
        <Card.Body>
          <Card.Title> {card.bizName}</Card.Title>
          <Card.Text>{card.bizDescription}</Card.Text>
          <Card.Text>{card.bizAddress}</Card.Text>
          <Card.Text>{card.bizPhone}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <a
            className={page == "my-fave" ? "d-inline" : "d-none"}
            onClick={(e) => {
              e.preventDefault();
              onDelete(card);
            }}
          >
            <AiFillDelete />
          </a>

          <a
            className={page == "home" ? "d-inline" : "d-none"}
            title="add to faveorite"
            onClick={() => {
              onAdd(card);
            }}
          >
            <AiOutlinePlusCircle />
          </a>
        </Card.Footer>
      </Card>
    )
  );

  // function checkIfExists(card) {
  //   let myFavorites = [];

  //   if (localStorage.getItem(`my-favorite-${user._id}`) != null) {
  //     myFavorites = JSON.parse(localStorage.getItem(`my-favorite-${user._id}`));
  //     return myFavorites.some((c) => c._id == card._id);
  //   }

  //   return false;
  // }
}
export default FaveCardComp;
