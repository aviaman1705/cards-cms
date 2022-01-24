import { Form, Row, Col } from "react-bootstrap";
import validateSimpleRegistration from "../../helpers/simpleRegistrationHelper";
import Button from "../UI/Button/Button";

function SimpleRegistrationComp(props) {
  const registerHandler = (event) => {
    event.preventDefault();
    var errorOrData = validateSimpleRegistration(
      "formBasicEmail",
      "formBasicPassword",
      "formBasicName"
    );

    if (typeof errorOrData === "boolean") {
      return;
    }

    props.clickHandler(errorOrData);
  };

  return (
    <Row>
      <Col lg={12}>
        <h1 className="user-form-title">{props.text}</h1>
      </Col>
      <Col xl={4} lg={6} md={8} sm={10} xs={12}>
        <Form className="user-form" onSubmit={registerHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
            <Form.Label className="error">{props.serverError}</Form.Label>
          </Form.Group>
          <Button type="submit" className="btn-primary mr-3">
            Register
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default SimpleRegistrationComp;
