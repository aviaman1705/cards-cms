import { useReducer, useState, useEffect } from "react";
import Button from "../UI/Button/Button";
import { signInUser, getMeData } from "../../helpers/FetchHelper";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { emailReducer, passwordReducer } from "../../helpers/RegisterHelper";

const SignInComp = (props) => {
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

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

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

  const loginHandler = (event) => {
    event.preventDefault();

    signInUser(
      {
        email: emailState.value,
        password: passwordState.value,
      },
      (response) => {
        if (response.token === undefined) {
          setServerError(true);
        }

        if (response.token) {
          toast("Welcome to U");
          localStorage.setItem("token", response.token);
          getMeData(response.token, (data) => {
            props.set(data);
            history.push("/home");
          });
        }
      }
    );
  };

  return (
    <div className="form-warpper row">
      <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col">
        <form className="login-form" onSubmit={loginHandler}>
          <h2 className="user-form-title">Sign In</h2>
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

            {serverError === true ? (
              <label className="error form-label">
                Invalid email or password*
              </label>
            ) : null}
          </div>
          <div className="form-group">
            <Button
              type="submit"
              className="submit-btn"
              disabled={!formIsValid}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignInComp;
