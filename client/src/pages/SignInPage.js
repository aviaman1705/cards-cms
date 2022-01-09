import { signInUser } from "../helpers/FetchHelper";
import { Container } from "react-bootstrap";
import SignInComp from "../components/sign-in/SignInComp";
import { getMeData } from "../helpers/FetchHelper";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import "./Form.css";
function SignInPage({ set }) {
  const history = useHistory();
  let [error, setError] = useState("");

  return (
    <Container id="login-container">
      <SignInComp clickHandler={signIn} serverError={error}></SignInComp>
    </Container>
  );

  function signIn(data) {
    signInUser(data, (response) => {
      if (response.token) {
        toast("Welcome to U");
        localStorage.setItem("token", response.token);
        getMeData(response.token, (data) => {
          set(data);
          history.push("/home");
        });
      } else {
        setError("email or password incorrect.");
      }
    });
  }
}
export default SignInPage;
