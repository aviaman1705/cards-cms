import { useEffect, useReducer, useState } from "react";
import {
  addressReducer,
  descReducer,
  imageReducer,
  phoneReducer,
} from "../../../helpers/CardHelper";
import Button from "../../UI/Button/Button";
import { nameReducer } from "../../../helpers/CardHelper";

function CardForm(props) {
  const [formIsValid, setFormIsValid] = useState(false);

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: props.card.bizName,
    isValid: null,
  });

  const [descState, dispatchDesc] = useReducer(descReducer, {
    value: props.card.bizDescription,
    isValid: null,
  });

  const [addressState, dispatchAddress] = useReducer(addressReducer, {
    value: props.card.bizAddress,
    isValid: null,
  });

  const [phoneState, dispatchPhone] = useReducer(phoneReducer, {
    value: props.card.bizPhone,
    isValid: null,
  });

  const [imageState, dispatchImage] = useReducer(imageReducer, {
    value: props.card.bizImage,
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");

      let formState =
        nameState.isValid === false ||
        descState.isValid === false ||
        addressState.isValid === false ||
        phoneState.isValid === false ||
        imageState.isValid === false;

      setFormIsValid(!formState);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [
    nameState.isValid,
    descState.isValid,
    addressState.isValid,
    phoneState.isValid,
    imageState.isValid,
  ]);

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", val: event.target.value });
  };

  const descChangeHandler = (event) => {
    dispatchDesc({ type: "USER_INPUT", val: event.target.value });
  };

  const addressChangeHandler = (event) => {
    dispatchAddress({ type: "USER_INPUT", val: event.target.value });
  };

  const phoneChangeHandler = (event) => {
    dispatchPhone({ type: "USER_INPUT", val: event.target.value });
  };

  const imageChangeHandler = (event) => {
    dispatchImage({ type: "USER_INPUT", val: event.target.value });
  };

  const nameBlurHandler = () => {
    dispatchName({ type: "INPUT_BLUR" });
    console.log("formIsValid " + formIsValid);
  };

  const descBlurHandler = () => {
    dispatchDesc({ type: "INPUT_BLUR" });
  };

  const addressBlurHandler = () => {
    dispatchAddress({ type: "INPUT_BLUR" });
    console.log("formIsValid " + formIsValid);
  };

  const phoneBlurHandler = () => {
    dispatchPhone({ type: "INPUT_BLUR" });
  };

  const imageBlurHandler = () => {
    dispatchImage({ type: "INPUT_BLUR" });
  };

  const submitCardHandler = (event) => {
    event.preventDefault();

    let card = {
      bizName: nameState.value,
      bizDescription: descState.value,
      bizAddress: addressState.value,
      bizPhone: phoneState.value,
      bizImage: imageState.value,
    };

    if (props.card._id) {
      card.id = props.card._id;
    }

    props.clickHandler(card);
  };

  const backStepHandler = () => {
    props.addMode(false);
    props.editMode(false);
  };

  return (
    <div className="col-lg-4 col-md-8 col">
      <form className="card-from" onSubmit={submitCardHandler}>
        <div className="form-group">
          <label className="form-label">Business Name</label>
          <input
            type="text"
            id="formBasicBusinessName"
            value={nameState.value}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            className={`form-control form-input ${
              nameState.isValid === false ? "invalid" : ""
            }`}
          />
          {nameState.isValid === false ? (
            <label className="error form-label">
              Name must contain at least 2 characters*
            </label>
          ) : null}

          <label className="error form-label"></label>
        </div>
        <div className="form-group">
          <label className="form-label">Business Address</label>
          <input
            type="text"
            id="formBasicBusinessAddress"
            value={addressState.value}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            className={`form-control form-input ${
              addressState.isValid === false ? "invalid" : ""
            }`}
          />
          {addressState.isValid === false ? (
            <label className="error form-label">
              Address must contain at least 2 characters*
            </label>
          ) : null}
        </div>
        <div className="form-group">
          <label className="form-label">Business Phone</label>
          <input
            type="text"
            id="formBasicBusinessPhone"
            value={phoneState.value}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
            className={`form-control form-input ${
              phoneState.isValid === false ? "invalid" : ""
            }`}
          />
          {phoneState.isValid === false ? (
            <label className="error form-label">Must enter valid phone *</label>
          ) : null}
        </div>
        <div className="form-group">
          <label className="form-label">Business Image</label>
          <input
            type="text"
            id="formBasicBusinessImage"
            value={imageState.value}
            onChange={imageChangeHandler}
            onBlur={imageBlurHandler}
            className={`form-control form-input ${
              imageState.isValid === false ? "invalid" : ""
            }`}
          />
          {imageState.isValid === false ? (
            <label className="error form-label">Must enter image url*</label>
          ) : null}
        </div>
        <div className="form-group">
          <label className="form-label">Business Description</label>
          <textarea
            type="text"
            id="formBasicBusinessDescription"
            value={descState.value}
            onChange={descChangeHandler}
            onBlur={descBlurHandler}
            className={`form-control form-input ${
              descState.isValid === false ? "invalid" : ""
            }`}
          />
          {descState.isValid === false ? (
            <label className="error form-label">
              Desc must contain at least 6 characters*
            </label>
          ) : null}
        </div>
        <div className="form-group">
          <Button
            type="submit"
            className="btn-primary mr-3"
            disabled={!formIsValid}
          >
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
    </div>
  );
}
export default CardForm;
