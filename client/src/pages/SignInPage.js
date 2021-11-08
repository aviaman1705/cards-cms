import { signInUser } from "../helpers/FetchHelper";
import { Container } from "react-bootstrap";
import SignInComp from "../components/sign-in/SignInComp";
import { toast } from "react-toastify";
import { getMeData } from "../helpers/FetchHelper";
import { useHistory } from "react-router-dom";

function SignInPage({ set }) {
  const history = useHistory();

  return (
    <Container className="h-100">
      <SignInComp clickHandler={signIn}></SignInComp>
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
        toast("Fail to log in");
      }
    });
  }
}
export default SignInPage;
