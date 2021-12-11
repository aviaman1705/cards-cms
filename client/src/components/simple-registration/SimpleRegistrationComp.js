import { Form, Button } from "react-bootstrap";
import validateSimpleRegistration from "../../helpers/simpleRegistrationHelper";
import { toast } from "react-toastify";
const notify = (message) => toast(message);
function SimpleRegistrationComp({ text = "", clickHandler = (f) => f }) {
  return (
    <Form className="user-form">
      <h1 className="user-form-title">{text}</h1>
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
        <Form.Label className="error"></Form.Label>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          var errorOrData = validateSimpleRegistration(
            "formBasicEmail",
            "formBasicPassword",
            "formBasicName"
          );

          if (typeof errorOrData == "object") {
            clickHandler(errorOrData);
          }
        }}
      >
        Register
      </Button>
    </Form>
  );
}

export default SimpleRegistrationComp;
