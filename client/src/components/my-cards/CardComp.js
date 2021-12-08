import { Card, Button } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function CardComp({
  card,
  handleClick = (f) => f,
  onEdit = (f) => f,
  editBtnClass = "",
  deleteBtnClass = "",
}) {
  return (
    (card && (
      <div class="card">
        <img src={card.bizImage} class="card-img-top" alt={card.bizName} />
        <div class="card-body">
          <h5 class="card-title">{card.bizName}</h5>
          <p class="card-text">{card.bizDescription}</p>
          <p class="card-address">{card.bizAddress}</p>
          <p class="card-phone">{card.bizPhone}</p>
          <a
            className={editBtnClass}
            onClick={(e) => {
              e.preventDefault();
              handleClick(card._id);
            }}
          >
            <AiFillDelete></AiFillDelete>
          </a>

          <a
            className={deleteBtnClass}
            onClick={() => {
              onEdit(card);
            }}
          >
            <AiFillEdit></AiFillEdit>
          </a>
        </div>
      </div>
    )) || <></>
  );
}
export default CardComp;
