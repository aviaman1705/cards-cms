import { Form, Button, Col } from "react-bootstrap";
import validateCard from "../../helpers/cardHelper";

function EditCardComp({ clickHandler, card, addMode, editMode }) {
  let currentUser = card;

  return (
    <Col lg={4} md={8} xs={12}>
      <Form className="card-from">
        <Form.Group className="mb-3" controlId="formBasicBusinessName">
          <Form.Label>Business Name</Form.Label>
          <Form.Control type="text" defaultValue={card.bizName} />
          <Form.Label className="error"></Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessDescription">
          <Form.Label>Business Description</Form.Label>
          <Form.Control type="text" defaultValue={card.bizDescription} />
          <Form.Label className="error"></Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessAddress">
          <Form.Label>Business Address</Form.Label>
          <Form.Control type="text" defaultValue={card.bizAddress} />
          <Form.Label className="error"></Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessPhone">
          <Form.Label>Business Phone</Form.Label>
          <Form.Control type="text" defaultValue={card.bizPhone} />
          <Form.Label className="error"></Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessImage">
          <Form.Label>Business Image</Form.Label>
          <Form.Control type="text" defaultValue={card.bizImage} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessPhone">
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
                errorOrData.id = currentUser._id;
                clickHandler(errorOrData);
              }
            }}
          >
            Edit Card
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
export default EditCardComp;
