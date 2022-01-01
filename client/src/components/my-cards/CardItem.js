import { Card } from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import "./CardItem.css";
function CardItem(props) {
  return (
    (props.card && (
      <Card>
        <Card.Img
          variant="top"
          src={props.card.bizImage}
          className="card-img-top"
          alt={props.card.bizName}
        />
        <Card.Body>
          <Card.Title> {props.card.bizName}</Card.Title>
          <Card.Text>{props.card.bizDescription}</Card.Text>
          <Card.Text>{props.card.bizAddress}</Card.Text>
          <Card.Text>{props.card.bizPhone}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {props.btnDeleteStatus && (
            <a
              className="icon-btn btn-delete-card"
              title="Delete"
              onClick={(e) => {
                e.preventDefault();
                props.onDelete(props.card._id);
              }}
            >
              <AiFillDelete></AiFillDelete>
            </a>
          )}
          {props.btnEditStatus && (
            <a
              className="icon-btn btn-edit-card"
              title="Edit"
              onClick={() => {
                props.onEdit(props.card);
              }}
            >
              <AiFillEdit />
            </a>
          )}
          {props.btnAddStatus && (
            <a
              className="icon-btn btn-add-card"
              title="Add To Faveorite"
              onClick={() => {
                props.onAdd(props.card);
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
export default CardItem;
