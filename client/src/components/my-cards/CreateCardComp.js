import { Form, Button } from "react-bootstrap";
import validateCard from "../../helpers/cardHelper";
import { toast } from "react-toastify";

function CreateCardComp({ clickHandler }) {
  return (
    <Form className="card-from">
      <Form.Group className="mb-3" controlId="formBasicBusinessName">
        <Form.Label>Business Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicBusinessDescription">
        <Form.Label>Business Description</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicBusinessAddress">
        <Form.Label>Business Address</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicBusinessPhone">
        <Form.Label>Business Phone</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicBusinessImage">
        <Form.Label>Business Image</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          var errorOrData = validateCard(
            "formBasicBusinessName",
            "formBasicBusinessDescription",
            "formBasicBusinessAddress",
            "formBasicBusinessPhone",
            "formBasicBusinessImage"
          );
          if (typeof errorOrData == "string") {
            toast(errorOrData);
          } else {
            clickHandler(errorOrData);
          }
        }}
      >
        Create Card
      </Button>
    </Form>
  );
}
export default CreateCardComp;
