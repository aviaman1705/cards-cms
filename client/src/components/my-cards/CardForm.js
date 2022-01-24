import { Form, Col } from "react-bootstrap";
import validateCard from "../../helpers/cardHelper";
import Button from "./../UI/Button/Button";

function CardForm(props) {
  const submitCardHandler = (event) => {
    event.preventDefault();
    var errorOrData = validateCard(
      "formBasicBusinessName",
      "formBasicBusinessDescription",
      "formBasicBusinessAddress",
      "formBasicBusinessPhone",
      "formBasicBusinessImage"
    );

    if (typeof errorOrData === "boolean") {
      return;
    }

    if (props.card) {
      errorOrData.id = props.card._id;
    }

    props.clickHandler(errorOrData);
  };

  const backStepHandler = () => {
    props.addMode(false);
    props.editMode(false);
  };

  return (
    <Col lg={4} md={8} xs={12}>
      {!props.card && (
        <Form className="card-from" onSubmit={submitCardHandler}>
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
            <Button type="submit" className="btn-primary mr-3">
              {props.textBtn}
            </Button>
            <Button
              type="button"
              className="btn-secondary"
              onClick={backStepHandler}
            >
              Back
            </Button>
          </Form.Group>
        </Form>
      )}
      {props.card && (
        <Form className="card-from" onSubmit={submitCardHandler}>
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
            <Button className="btn-primary mr-3" type="submit">
              {props.textBtn}
            </Button>

            <Button
              type="button"
              className="btn-secondary"
              onClick={backStepHandler}
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
