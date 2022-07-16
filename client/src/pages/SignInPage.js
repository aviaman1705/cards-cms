import SignInForm from "../components/SignIn/SignInForm";
import "./Form.css";

const SignInPage = (props) => {
  return (
    <div className="container form-container">
      <SignInForm set={props.set} />
    </div>
  );
};
export default SignInPage;
