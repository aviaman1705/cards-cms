import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import "./CardItem.css";
function CardItem(props) {
  return (
    (props.card && (
      <div className="card col-2 col-md-offset-2">
        <img
          src={props.card.bizImage}
          className="card-img-top"
          alt={props.card.bizName}
        />
        <div className="card-body">
          <h5 className="card-title">{props.card.bizName}</h5>
          <p className="card-text">{props.card.bizDescription}</p>
          <p className="card-text">{props.card.bizPhone}</p>
          <p className="card-text">
            <small className="text-muted">{props.card.bizAddress}</small>
          </p>
        </div>
      </div>
      // <div className="card">
      //   <img
      //     src={props.card.bizImage}
      //     className="card-img-top"
      //     alt={props.card.bizName}
      //   />
      //   <div className="card-Body">
      //     <div className="card-title">{props.card.bizName}</div>
      //     <div className="card-text">
      //       <div>{props.card.bizDescription}</div>
      //       <div>{props.card.bizAddress}</div>
      //       <div>{props.card.bizPhone}</div>
      //     </div>
      //   </div>
      //   <div className="card-footer">
      //     {props.btnDeleteStatus && (
      //       <a
      //         href="/#"
      //         className="icon-btn btn-delete-card"
      //         title="Delete"
      //         onClick={(e) => {
      //           e.preventDefault();
      //           props.onDelete(props.card._id);
      //         }}
      //       >
      //         <AiFillDelete></AiFillDelete>
      //       </a>
      //     )}
      //     {props.btnEditStatus && (
      //       <a
      //         href="/#"
      //         className="icon-btn btn-edit-card"
      //         title="Edit"
      //         onClick={(event) => {
      //           event.preventDefault();
      //           props.onEdit(props.card);
      //         }}
      //       >
      //         <AiFillEdit />
      //       </a>
      //     )}
      //     {props.btnAddStatus && (
      //       <a
      //         href="/#"
      //         className="icon-btn btn-add-card"
      //         title="Add To Faveorite"
      //         onClick={(event) => {
      //           event.preventDefault();
      //           props.onAdd(props.card);
      //         }}
      //       >
      //         <AiFillPlusCircle />
      //       </a>
      //     )}
      //   </div>
      // </div>
    )) || <></>
  );
}
export default CardItem;