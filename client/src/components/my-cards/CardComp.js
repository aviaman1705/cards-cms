import { Card, Button } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function CardComp({ card, handleClick, onEdit }) {
  return (
    (card && (
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
            onClick={(e) => {
              e.preventDefault();
              handleClick(card._id);
            }}
          >
            <AiFillDelete></AiFillDelete>
          </a>

          <a
            onClick={() => {
              onEdit(card);
            }}
          >
            <AiFillEdit></AiFillEdit>
          </a>
        </Card.Footer>
      </Card>
    )) || <></>
  );
}
export default CardComp;
