import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import Dialog from "../../UI/Dialog/Dialog";
import CardDetails from "../CardDetails/CardDetails";

import "./CardItem.css";
function CardItem(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    (props.card && (
      <>
        <div
          className="card col-lg-3 col-md-6 col-sm-6 col-xs-12 col-md-offset-2"
          onClick={openModal}
        >
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
          <div className="card-footer">
            {props.btnDeleteStatus && (
              <a
                href="/#"
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
                href="/#"
                className="icon-btn btn-edit-card"
                title="Edit"
                onClick={(event) => {
                  event.preventDefault();
                  props.onEdit(props.card);
                }}
              >
                <AiFillEdit />
              </a>
            )}
            {props.btnAddStatus && (
              <a
                href="/#"
                className="icon-btn btn-add-card"
                title="Add To Faveorite"
                onClick={(event) => {
                  event.preventDefault();
                  props.onAdd(props.card);
                }}
              >
                <AiFillPlusCircle />
              </a>
            )}
          </div>
        </div>
        <Dialog modalIsOpen={modalIsOpen} close={closeModal}>
          <CardDetails
            bizName={props.card.bizName}
            bizDescription={props.card.bizDescription}
            bizPhone={props.card.bizPhone}
            bizAddress={props.card.bizAddress}
          />
        </Dialog>
      </>
    )) || <></>
  );
}
export default CardItem;
