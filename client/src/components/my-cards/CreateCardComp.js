import { Form, Button, Col, Row } from "react-bootstrap";
import validateCard from "../../helpers/cardHelper";

function CreateCardComp({ clickHandler, addMode, editMode }) {
  return (
    <Col lg={4} md={8} xs={12}>
      <Form className="card-from">
        <Form.Group className="mb-3" controlId="formBasicBusinessName">
          <Form.Label>Business Name</Form.Label>
          <Form.Control type="text" />
          <Form.Label className="error"></Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessDescription">
          <Form.Label>Business Description</Form.Label>
          <Form.Control type="text" />
          <Form.Label className="error"></Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessAddress">
          <Form.Label>Business Address</Form.Label>
          <Form.Control type="text" />
          <Form.Label className="error"></Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessPhone">
          <Form.Label>Business Phone</Form.Label>
          <Form.Control type="text" />
          <Form.Label className="error"></Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessImage">
          <Form.Label>Business Image</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3">
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

              if (typeof errorOrData == "object") {
                clickHandler(errorOrData);
              }
            }}
          >
            Create Card
          </Button>

          <Button
            id="back-btn"
            className="btn btn-secondary"
            onClick={() => {
              addMode(false);
              editMode(false);
            }}
          >
            Back
          </Button>
        </Form.Group>
      </Form>
    </Col>
  );
}
export default CreateCardComp;
