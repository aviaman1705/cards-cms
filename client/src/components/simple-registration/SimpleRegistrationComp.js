import { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewAccount, signInUser } from "../../helpers/FetchHelper";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: emailRegex.test(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: emailRegex.test(state.value) };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 6 };
  }
  return { value: "", isValid: false };
};

const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 2 };
  }
  return { value: "", isValid: false };
};

const SimpleRegistrationComp = (props) => {
  const history = useHistory();

  const [formIsValid, setFormIsValid] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        emailState.isValid && passwordState.isValid && nameState.isValid
      );
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid, nameState.isValid]);

  const emailChangeHandler = (event) => {
    setServerError(false);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setServerError(false);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const nameChangeHandler = (event) => {
    setServerError(false);
    dispatchName({ type: "USER_INPUT", val: event.target.value });
  };

  const emailBlurHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const passwordBlurHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const nameBlurHandler = () => {
    dispatchName({ type: "INPUT_BLUR" });
  };

  const registerHandler = (event) => {
    event.preventDefault();

    let userData = {
      email: emailState.value,
      password: passwordState.value,
      name: nameState.value,
      biz: true,
    };

    registerNewAccount(userData, (data) => {
      if (data._id === undefined) {
        setServerError(true);
      }

      if (data._id) {
        signInUser(
          { email: userData.email, password: userData.password },
          (response) => {
            if (response.token) {
              toast("Account was created successfully");
              setTimeout(() => {
                history.push("/sign-in");
              }, 2000);
            } else {
              toast("Fail to log in");
            }
          }
        );
      }
    });
  };

  return (
    <div className="form-warpper row">
      <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col">
        <form className="login-form" onSubmit={registerHandler}>
          <h2 className="user-form-title">Register</h2>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              id="formBasicEmail"
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              className={`form-control form-input ${
                emailState.isValid === false ? "invalid" : ""
              }`}
            />
            {emailState.isValid === false ? (
              <label className="error form-label">
                Must enter valid email*
              </label>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              id="formBasicPassword"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              className={`form-control form-input ${
                passwordState.isValid === false ? "invalid" : ""
              }`}
            />
            {passwordState.isValid === false ? (
              <label className="error form-label">
                Password must contain at least 6 characters*
              </label>
            ) : null}
          </div>

          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              id="formBasicName"
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

            {serverError === true ? (
              <label className="error form-label">Email allready exists*</label>
            ) : null}
          </div>
          <div className="form-group">
            <Button
              type="submit"
              className="submit-btn"
              disabled={!formIsValid}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleRegistrationComp;
