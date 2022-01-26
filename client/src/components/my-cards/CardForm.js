import validateCard from "../../helpers/cardHelper";
import Button from "./../UI/Button/Button";

function CardForm(props) {
  const submitCardHandler = (event) => {
    event.preventDefault();
    var errorOrData = validateCard(
      "formBasicBusinessName",
      "formBasicBusinessDescription",
      "formBasicBusinessAddress",
      "formBasicBusinessPhone",
      "formBasicBusinessImage"
    );

    if (typeof errorOrData === "boolean") {
      return;
    }

    if (props.card) {
      errorOrData.id = props.card._id;
    }

    props.clickHandler(errorOrData);
  };

  const backStepHandler = () => {
    props.addMode(false);
    props.editMode(false);
  };

  return (
    <div className="col-lg-4 col-md-8 col">
      {!props.card && (
        <form className="card-from" onSubmit={submitCardHandler}>
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input
              type="text"
              id="formBasicBusinessName"
              className="form-control"
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <label className="form-label">Business Description</label>
            <input
              type="text"
              id="formBasicBusinessDescription"
              className="form-control"
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <label className="form-label">Business Address</label>
            <input
              type="text"
              id="formBasicBusinessAddress"
              className="form-control"
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <label className="form-label">Business Phone</label>
            <input
              type="text"
              id="formBasicBusinessPhone"
              className="form-control"
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <label className="form-label">Business Image</label>
            <input
              type="text"
              id="formBasicBusinessImage"
              className="form-control"
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <Button type="submit" className="btn-primary mr-3">
              {props.textBtn}
            </Button>
            <Button
              type="button"
              className="btn-secondary"
              onClick={backStepHandler}
            >
              Back
            </Button>
          </div>
        </form>
      )}
      {props.card && (
        <form className="card-from" onSubmit={submitCardHandler}>
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input
              type="text"
              id="formBasicBusinessName"
              className="form-control"
              defaultValue={props.card.bizName}
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <label className="form-label">Business Description</label>
            <input
              type="text"
              id="formBasicBusinessDescription"
              className="form-control"
              defaultValue={props.card.bizDescription}
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <label className="form-label">Business Address</label>
            <input
              type="text"
              id="formBasicBusinessAddress"
              className="form-control"
              defaultValue={props.card.bizAddress}
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <label className="form-label">Business Phone</label>
            <input
              type="text"
              id="formBasicBusinessPhone"
              className="form-control"
              defaultValue={props.card.bizPhone}
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <label className="form-label">Business Image</label>
            <input
              type="text"
              id="formBasicBusinessImage"
              className="form-control"
              defaultValue={props.card.bizImage}
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <Button type="submit" className="btn-primary mr-3">
              {props.textBtn}
            </Button>
            <Button
              type="button"
              className="btn-secondary"
              onClick={backStepHandler}
            >
              Back
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
export default CardForm;
