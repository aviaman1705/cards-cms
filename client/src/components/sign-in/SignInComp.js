import validateSignIn from "../../helpers/signInHelper";
import { Form, Button, Row, Col } from "react-bootstrap";

function SignInComp(props) {
  return (
    <Row>
      <Col lg={12}>
        <h1 className="user-form-title">Sign In</h1>
      </Col>
      <Col xl={4} lg={6} md={8} sm={10} xs={12}>
        <Form className="user-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
            <Form.Label className="error">{props.serverError}</Form.Label>
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
                props.clickHandler(errorOrData);
              }
            }}
          >
            Sign in
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
export default SignInComp;
