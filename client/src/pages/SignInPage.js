import SignInComp from "../components/sign-in/SignInComp";
import "./Form.css";

const SignInPage = (props) => {
  return (
    <div className="container" id="login-container">
      <SignInComp set={props.set}></SignInComp>
    </div>
  );
};
export default SignInPage;
