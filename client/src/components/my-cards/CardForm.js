import { Form, Button, Col, Row } from "react-bootstrap";
import validateCard from "../../helpers/cardHelper";

function CardForm(props) {
  return (
    <Col lg={4} md={8} xs={12}>
      {!props.card && (
        <Form className="card-from">
          <Form.Group controlId="formBasicBusinessName">
            <Form.Label>Business Name</Form.Label>
            <Form.Control type="text" />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessDescription">
            <Form.Label>Business Description</Form.Label>
            <Form.Control type="text" />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessAddress">
            Y<Form.Label>Business Address</Form.Label>
            <Form.Control type="text" />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessPhone">
            <Form.Label>Business Phone</Form.Label>
            <Form.Control type="text" />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessImage">
            <Form.Label>Business Image</Form.Label>
            <Form.Control type="text" />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group>
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
                  props.clickHandler(errorOrData);
                }
              }}
            >
              {props.textBtn}
            </Button>

            <Button
              id="back-btn"
              className="btn btn-secondary"
              onClick={() => {
                props.addMode(false);
                props.editMode(false);
              }}
            >
              Back
            </Button>
          </Form.Group>
        </Form>
      )}
      {props.card && (
        <Form className="card-from">
          <Form.Group controlId="formBasicBusinessName">
            <Form.Label>Business Name</Form.Label>
            <Form.Control type="text" defaultValue={props.card.bizName} />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessDescription">
            <Form.Label>Business Description</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.card.bizDescription}
            />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessAddress">
            <Form.Label>Business Address</Form.Label>
            <Form.Control type="text" defaultValue={props.card.bizAddress} />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessPhone">
            <Form.Label>Business Phone</Form.Label>
            <Form.Control type="text" defaultValue={props.card.bizPhone} />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessImage">
            <Form.Label>Business Image</Form.Label>
            <Form.Control type="text" defaultValue={props.card.bizImage} />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessPhone">
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
                  errorOrData.id = props.card._id;
                  props.clickHandler(errorOrData);
                }
              }}
            >
              {props.textBtn}
            </Button>

            <Button
              id="back-btn"
              className="btn btn-secondary"
              onClick={() => {
                props.addMode(false);
                props.editMode(false);
              }}
            >
              Back
            </Button>
          </Form.Group>
        </Form>
      )}
    </Col>
  );
}
export default CardForm;
