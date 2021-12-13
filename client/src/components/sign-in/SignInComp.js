import validateSignIn from "../../helpers/signInHelper";
import { Form, Button } from "react-bootstrap";

function SignInComp({ serverError, clickHandler = (f) => f }) {
  return (
    <Form className="user-form">
      <h1 className="user-form-title">Sign In</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" />
        <Form.Label className="error"></Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
        <Form.Label className="error">{serverError}</Form.Label>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          var errorOrData = validateSignIn(
            "formBasicEmail",
            "formBasicPassword"
          );
          if (typeof errorOrData == "object") {
            clickHandler(errorOrData);
          }
        }}
      >
        Sign in
      </Button>
    </Form>
  );
}
export default SignInComp;
