import { useHistory } from "react-router-dom";
import { useState, useContext, useReducer } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import {
  UPDATE_FORM,
  onInputChange,
  onFocusOut,
  validateInput,
} from "../../lib/formUtils";

const initialState = {
  email: { value: "", touched: false, hasError: true, error: "" },
  password: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const formsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, touched, isFormValid } =
        action.data;
      return {
        ...state,
        // update the state of the particular field,
        // by retaining the state of other fields
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
    default:
      return state;
  }
};

const AuthForm = () => {
  const [formState, dispatch] = useReducer(formsReducer, initialState);

  const [showError, setShowError] = useState(false);
  const [serverError, setServerError] = useState("");

  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let isFormValid = true;

    for (const name in formState) {
      const item = formState[name];
      const { value } = item;
      const { hasError, error } = validateInput(name, value);
      if (hasError) {
        isFormValid = false;
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          data: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        });
      }
    }
    if (!isFormValid) {
      setShowError(true);
    } else {
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCR6JFZuAdYXT-tn_WHvNKVq1XK_LoSSuI";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCR6JFZuAdYXT-tn_WHvNKVq1XK_LoSSuI";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: formState.email.value,
          password: formState.password.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            setShowError(false);
            return res.json();
          } else {
            res.json().then((data) => {
              if (data && data.error && data.error.message) {
                if (data.error.message.includes("PASSWORD")) {
                  setServerError("Incorrect email or password");
                } else {
                  setServerError("Email already exsists");
                }
              }

              setShowError(true);
            });
          }
        })
        .then((data) => {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authCtx.login(data.idToken, expirationTime.toString());
          history.replace("/");
        })
        .catch((err) => {
          //alert(err.message);
        });
    }

    // Hide the error message after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      {showError && !formState.isFormValid && (
        <div className="form_error">Please fill all the fields correctly</div>
      )}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={formState.email.value}
            onChange={(e) => {
              onInputChange("email", e.target.value, dispatch, formState);
            }}
            onBlur={(e) => {
              onFocusOut("email", e.target.value, dispatch, formState);
            }}
          />{" "}
          {formState.email.touched && formState.email.hasError && (
            <div className="error">{formState.email.error}</div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={formState.password.value}
            onChange={(e) => {
              onInputChange("password", e.target.value, dispatch, formState);
            }}
            onBlur={(e) => {
              onFocusOut("password", e.target.value, dispatch, formState);
            }}
          />
          {formState.password.touched && formState.password.hasError && (
            <div className="error">{formState.password.error}</div>
          )}
          {serverError && <div className="error">{serverError}</div>}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

// import { useHistory } from "react-router-dom";
// import { useState, useRef, useContext, useReducer } from "react";
// import AuthContext from "../../store/auth-context";

// import classes from "./AuthForm.module.css";
// import { emailReducer, passwordReducer } from "../../helpers/ValidationHelper";

// const AuthForm = () => {
//   const history = useHistory();
//   const authCtx = useContext(AuthContext);

//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);

//   const [emailState, dispatchEmail] = useReducer(emailReducer, {
//     value: "",
//     isValid: null,
//   });

//   const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
//     value: "",
//     isValid: null,
//   });

//   const emailChangeHandler = (event) => {
//     dispatchEmail({ type: "USER_INPUT", val: event.target.value });
//   };

//   const passwordChangeHandler = (event) => {
//     dispatchPassword({ type: "USER_INPUT", val: event.target.value });
//   };

//   const emailBlurHandler = () => {
//     dispatchEmail({ type: "INPUT_BLUR" });
//   };

//   const passwordBlurHandler = () => {
//     dispatchPassword({ type: "INPUT_BLUR" });
//   };

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState);
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();

//     setIsLoading(true);
//     let url;
//     if (isLogin) {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCR6JFZuAdYXT-tn_WHvNKVq1XK_LoSSuI";
//     } else {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCR6JFZuAdYXT-tn_WHvNKVq1XK_LoSSuI";
//     }

//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify({
//         //email: enteredEmail,
//         //password: enteredPassword,
//         returnSecureToken: true,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         setIsLoading(false);
//         if (res.ok) {
//           return res.json();
//         } else {
//           res.json().then((data) => {
//             let errorMessage = "Authentication failed!";
//             if (data && data.error && data.error.message) {
//               errorMessage = data.error.message;
//             }
//             alert(errorMessage);
//             throw new Error(errorMessage);
//           });
//         }
//       })
//       .then((data) => {
//         const expirationTime = new Date(
//           new Date().getTime() + +data.expiresIn * 1000
//         );
//         authCtx.login(data.idToken, expirationTime.toString());
//         history.replace("/");
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   };

//   return (
//     <section className={classes.auth}>
//       <h1>{isLogin ? "Login" : "Sign Up"}</h1>
//       <form onSubmit={submitHandler}>
//         <div className={classes.control}>
//           <label htmlFor="email">Your Email</label>
//           <input
//             type="email"
//             id="email"
//             value={emailState.value}
//             placeholder="email"
//             onChange={emailChangeHandler}
//             onBlur={emailBlurHandler}
//             className={`form-control my-3 p-2 ${
//               emailState.isValid === false ? "invalid" : ""
//             }`}
//             required
//           />

//           {emailState.isValid === false ? (
//             <label className="error form-label">חובה להזין מייל תקין</label>
//           ) : null}
//         </div>
//         <div className={classes.control}>
//           <label htmlFor="password">Your Password</label>
//           <input
//             type="password"
//             placeholder="password"
//             value={passwordState.value}
//             onBlur={passwordBlurHandler}
//             onChange={passwordChangeHandler}
//             className={`form-control my-3 p-2 ${
//               passwordState.isValid === false ? "invalid" : ""
//             }`}
//             id="password"
//             required
//           />
//           {passwordState.isValid === false ? (
//             <label className="error form-label">
//               סיסמא חייבת להכיל 6 תווים לפחות
//             </label>
//           ) : null}
//           {/* {serverError === true ? (
//             <label className="error form-label">מייל או סיסמא לא נכונים</label>
//           ) : null} */}
//         </div>
//         <div className={classes.actions}>
//           {!isLoading && (
//             <button>{isLogin ? "Login" : "Create Account"}</button>
//           )}
//           {isLoading && <p>Sending Request...</p>}
//           <button
//             type="button"
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? "Create new account" : "Login with existing account"}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default AuthForm;
