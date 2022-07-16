import { useReducer, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { emailReducer, passwordReducer } from "../../helpers/RegisterHelper";
import { login } from "../../firebase/firebase";
import AuthContext from "../../store/auth-context";
//import AuthContext from "../../state/auth-context";

const SignInComp = (props) => {
  //const ctx = useContext(AuthContext);
  const authCtx = useContext(AuthContext);
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

  const loginHandler = (event) => {
    event.preventDefault();

    if (emailState.isValid !== true) {
      dispatchEmail({});
      return;
    }

    if (passwordState.isValid !== true) {
      dispatchPassword({});
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCR6JFZuAdYXT-tn_WHvNKVq1XK_LoSSuI",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailState.value,
          password: passwordState.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toString());
        //history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });

    // login(emailState.value, passwordState.value)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     const expirationTime = new Date(
    //       new Date().getTime() + +userCredential.expiresIn * 1000
    //     );
    //     authCtx.login(userCredential.idToken, expirationTime.toString());
    //     //ctx.onLogin(user);
    //     history.push("/home");
    //   })
    //   .catch((error) => {
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     setServerError(true);
    //   });
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
            <h1 className="font-weight-bold py-3 text-end">כניסה</h1>
            <form onSubmit={loginHandler}>
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
                  {serverError === true ? (
                    <label className="error form-label">
                      מייל או סיסמא לא נכונים
                    </label>
                  ) : null}
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7 float-end">
                  <button type="password" className="btn1 mt-3 mb-5">
                    כניסה
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignInComp;
