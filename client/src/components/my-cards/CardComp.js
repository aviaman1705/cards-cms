import { Card } from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";

function CardComp({
  card,
  onEdit = (f) => f,
  onDelete = (f) => f,
  onAdd = (f) => f,
  btnAddStatus = false,
  btnEditStatus = false,
  btnDeleteStatus = false,
}) {
  return (
    (card && (
      <Card>
        <Card.Img
          variant="top"
          src={card.bizImage}
          className="card-img-top"
          alt={card.bizName}
        />
        <Card.Body>
          <Card.Title> {card.bizName}</Card.Title>
          <Card.Text>{card.bizDescription}</Card.Text>
          <Card.Text>{card.bizAddress}</Card.Text>
          <Card.Text>{card.bizPhone}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {btnDeleteStatus && (
            <a
              className="icon-btn btn-delete-card"
              title="Delete"
              onClick={(e) => {
                e.preventDefault();
                onDelete(card._id);
              }}
            >
              <AiFillDelete></AiFillDelete>
            </a>
          )}
          {btnEditStatus && (
            <a
              className="icon-btn btn-edit-card"
              title="Edit"
              onClick={() => {
                onEdit(card);
              }}
            >
              <AiFillEdit />
            </a>
          )}
          {btnAddStatus && (
            <a
              className="icon-btn btn-add-card"
              title="Add To Faveorite"
              onClick={() => {
                onAdd(card);
              }}
            >
              <AiFillPlusCircle />
            </a>
          )}
        </Card.Footer>
      </Card>
    )) || <></>
  );
}
export default CardComp;
