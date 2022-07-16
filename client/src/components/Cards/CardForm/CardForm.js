import { useEffect, useReducer, useState } from "react";
import {
  addressReducer,
  descReducer,
  imageReducer,
  phoneReducer,
  nameReducer,
} from "../../../helpers/CardHelper";
import { upload, useAuth } from "../../../firebase/firebase";
import CardDataService from "../../../services/card.service";
import Button from "../../UI/Button/Button";

import "./CardForm.css";
import { async } from "@firebase/util";

function CardForm(props) {
  const currentUser = useAuth();

  const [formIsValid, setFormIsValid] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const submitCardHandler = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    console.log(`loading = ${loading}`);

    let card = {
      // id: props.card?.id,
      bizName: nameState.value,
      bizDescription: descState.value,
      bizAddress: addressState.value,
      bizPhone: phoneState.value,
      bizImage: "url",
      user_id: currentUser.uid,
    };

    await CardDataService.addCard(card);
    //props.clickHandler(card);
    setLoading(false);
    clearForm();
    // if (photo) {
    //   upload(photo, currentUser)
    //     .then((url) => {
    //       let card = {
    //         id: props.card?.id,
    //         bizName: nameState.value,
    //         bizDescription: descState.value,
    //         bizAddress: addressState.value,
    //         bizPhone: phoneState.value,
    //         bizImage: url,
    //         user_id: currentUser.uid,
    //       };

    //       await CardDataService.addCard(card);
    //       //props.clickHandler(card);
    //       setLoading(false);
    //       clearForm();
    //     })
    //     .catch((error) => console.log(error));
    // } else {
    //   let card = {
    //     id: props.card?.id,
    //     bizName: nameState.value,
    //     bizDescription: descState.value,
    //     bizAddress: addressState.value,
    //     bizPhone: phoneState.value,
    //     bizImage: "",
    //     user_id: currentUser.uid,
    //   };

    //   setTimeout(function () {
    //     await CardDataService.addCard(card);
    //     clearForm();
    //   }, 2000);
    //}
  };

  const backStepHandler = () => {
    props.addMode(false);
    props.editMode(false);
  };

  const validate = () => {
    let isValid = true;

    if (nameState.isValid === false) {
      dispatchName({});
      isValid = false;
    }

    if (addressState.isValid === false) {
      dispatchAddress({});
      isValid = false;
    }

    if (phoneState.isValid === false) {
      dispatchPhone({});
      isValid = false;
    }

    if (descState.isValid === false) {
      dispatchDesc({});
      isValid = false;
    }

    return isValid;
  };

  const clearForm = () => {
    setLoading(false);
    dispatchName({ type: "EMPTY_FORM" });
    dispatchAddress({ type: "EMPTY_FORM" });
    dispatchPhone({ type: "EMPTY_FORM" });
    dispatchImage({ type: "EMPTY_FORM" });
    dispatchDesc({ type: "EMPTY_FORM" });
  };

  return (
    <div className="col-lg-4 col-md-8 col">
      <form onSubmit={submitCardHandler}>
        {loading === true && <div className="spinner-border"></div>}
        <div className="mb-3">
          <label htmlFor="businessTxt" className="form-label">
            שם עסק
          </label>
          <input
            type="text"
            id="businessTxt"
            className={`form-control ${
              nameState.isValid === false
                ? "invalid"
                : nameState.isValid === true
                ? "valid"
                : ""
            }`}
            placeholder="שם עסק"
            value={nameState.value}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameState.isValid === false ? (
            <div className="invalid-feedback">שם חייב להכיל 2 תווים לפחות*</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="addressTxt" className="form-label">
            כתובת
          </label>
          <input
            type="text"
            id="addressTxt"
            className={`form-control ${
              addressState.isValid === false
                ? "invalid"
                : addressState.isValid === true
                ? "valid"
                : ""
            }`}
            placeholder="כתובת"
            value={addressState.value}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
          />
          {addressState.isValid === false ? (
            <div className="invalid-feedback">
              {" "}
              כתובת חייבת להכיל 2 תווים לפחות*
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="phoneTxt" className="form-label">
            טלפון
          </label>
          <input
            type="text"
            id="phoneTxt"
            className={`form-control ${
              phoneState.isValid === false
                ? "invalid"
                : phoneState.isValid === true
                ? "valid"
                : ""
            }`}
            placeholder="טלפון"
            value={phoneState.value}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          />
          {phoneState.isValid === false ? (
            <div className="invalid-feedback"> הזן מספר טלפון תקין*</div>
          ) : null}
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            aria-label="תמונה"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descTextarea" className="form-label">
            תיאור
          </label>
          <textarea
            id="descTextarea"
            className={`form-control ${
              descState.isValid === false
                ? "invalid"
                : descState.isValid === true
                ? "valid"
                : ""
            }`}
            value={descState.value}
            onChange={descChangeHandler}
            onBlur={descBlurHandler}
            rows="4"
            placeholder="תיאור"
          ></textarea>
          {descState.isValid === false && (
            <div className="invalid-feedback">
              תיאור חייב להכיל 6 תווים לפחות*
            </div>
          )}
        </div>

        <div className="mb-3">
          {props.serverError && <div>שגיאת שרת</div>}
          <Button
            type="button"
            className="btn btn-secondary mx-3"
            onClick={backStepHandler}
          >
            חזרה
          </Button>
          <Button type="submit" className="btn btn-primary">
            {props.textBtn}
          </Button>
        </div>
      </form>
    </div>
  );
}
export default CardForm;
