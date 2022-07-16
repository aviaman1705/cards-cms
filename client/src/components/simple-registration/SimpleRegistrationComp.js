import { useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../UI/Button/Button";
import { emailReducer, passwordReducer } from "../../helpers/RegisterHelper";

import { signup } from "../../firebase/firebase";
import "./SimpleRegistrationComp.css";

const SimpleRegistrationComp = (props) => {
  const history = useHistory();

  const [serverError, setServerError] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailChangeHandler = (event) => {
    setServerError(false);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setServerError(false);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const emailBlurHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const passwordBlurHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const registerHandler = async (event) => {
    event.preventDefault();

    if (emailState.isValid !== true) {
      dispatchEmail({});
      return;
    }

    if (passwordState.isValid !== true) {
      dispatchPassword({});
      return;
    }

    signup(emailState.value, passwordState.value)
      .then((userCredential) => {
        // Signed in
        setTimeout(() => {
          // const user = userCredential.user;
          history.push("/sign-in");
        }, 2000);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setServerError(true);
      });
  };

  return (
    <section className="form my-4 mx-5">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-lg-5 img-wrapper">
            <img
              src="images/business-card-1.jpg"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-lg-7 px-5">
            <h1 className="font-weight-bold py-3 text-end">הרשמה</h1>
            <form onSubmit={registerHandler}>
              <div className="form-row">
                <div className="col-lg-7 float-end">
                  <input
                    type="email"
                    value={emailState.value}
                    placeholder="מייל"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    className={`form-control my-3 p-2 ${
                      emailState.isValid === false ? "invalid" : ""
                    }`}
                  />
                  {emailState.isValid === false ? (
                    <label className="error form-label">
                      חובה להזין מייל תקין
                    </label>
                  ) : null}
                  {serverError === true ? (
                    <label className="error form-label">
                      מייל כבר קיים במערכת
                    </label>
                  ) : null}
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7 float-end">
                  <input
                    type="password"
                    placeholder="סיסמא"
                    value={passwordState.value}
                    onBlur={passwordBlurHandler}
                    onChange={passwordChangeHandler}
                    className={`form-control my-3 p-2 ${
                      passwordState.isValid === false ? "invalid" : ""
                    }`}
                  />
                  {passwordState.isValid === false ? (
                    <label className="error form-label">
                      סיסמא חייבת להכיל 6 תווים לפחות
                    </label>
                  ) : null}
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7 float-end">
                  <Button type="password" className="btn1 mt-3 mb-5">
                    הרשמה
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleRegistrationComp;
