import { Form, Button, Col, Row } from "react-bootstrap";
import validateCard from "../../helpers/cardHelper";

function CardItemComp({ card, textBtn, clickHandler, addMode, editMode }) {
  return (
    <Col lg={4} md={8} xs={12}>
      {!card && (
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
            <Form.Label>Business Address</Form.Label>
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
                  clickHandler(errorOrData);
                }
              }}
            >
              {textBtn}
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
      )}
      {card && (
        <Form className="card-from">
          <Form.Group controlId="formBasicBusinessName">
            <Form.Label>Business Name</Form.Label>
            <Form.Control type="text" defaultValue={card.bizName} />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessDescription">
            <Form.Label>Business Description</Form.Label>
            <Form.Control type="text" defaultValue={card.bizDescription} />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessAddress">
            <Form.Label>Business Address</Form.Label>
            <Form.Control type="text" defaultValue={card.bizAddress} />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessPhone">
            <Form.Label>Business Phone</Form.Label>
            <Form.Control type="text" defaultValue={card.bizPhone} />
            <Form.Label className="error"></Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicBusinessImage">
            <Form.Label>Business Image</Form.Label>
            <Form.Control type="text" defaultValue={card.bizImage} />
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
                  errorOrData.id = card._id;
                  clickHandler(errorOrData);
                }
              }}
            >
              {textBtn}
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
      )}
    </Col>
  );
}
export default CardItemComp;
