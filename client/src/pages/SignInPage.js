import SignInComp from "../components/sign-in/SignInComp";
import "./Form.css";

const SignInPage = (props) => {
  return (
    <div className="container form-container">
      <SignInComp set={props.set}></SignInComp>
    </div>
  );
};
export default SignInPage;
