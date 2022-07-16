import React, { useState, useEffect, useRef } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import { upload, useAuth } from "../../firebase/firebase";
import CardDataService from "../../services/card.service";

const AddCard = ({ id, setCardId, setDefaultMode, btnText }) => {
  const currentUser = useAuth();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");
  const imageRef = useRef();
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleChange = (e) => {
    let img = e.target.files[0];
    if (img) {
      setImage(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || address === "" || phone === "" || desc === "") {
      setMessage({ error: true, msg: "כל השדות הם שדות חובה!" });
      return;
    }
    const card = {
      name: name,
      address: address,
      phone: phone,
      image: "",
      desc: desc,
    };
    console.log(card);

    try {
      if (id !== undefined && id !== "") {
        await CardDataService.updateCard(id, card);
        setCardId("");
        setMessage({ error: false, msg: "עודכן בהצלחה!" });
      } else {
        if (image) {
          upload(image, currentUser)
            .then((url) => {
              card.image = url;
              CardDataService.addCard(card)
                .then((a) => {
                  setName("");
                  setAddress("");
                  setPhone("");
                  setDesc("");
                  imageRef.current.value = "";

                  setMessage({ error: false, msg: "כרטיס נוסף בהצלחה!" });
                  setTimeout(() => {
                    setDefaultMode();
                  }, 2000);
                })
                .catch((error) => {
                  setMessage({ error: false, msg: "קרתה תקלה בזמן ההוספה!" });
                });
            })
            .catch((error) => console.log(error));
        } else {
          CardDataService.addCard(card)
            .then((a) => {
              setName("");
              setAddress("");
              setPhone("");
              setDesc("");
              imageRef.current.value = "";
              setMessage({ error: false, msg: "כרטיס נוסף בהצלחה!" });
              setTimeout(() => {
                setDefaultMode();
              }, 2000);
            })
            .catch((error) => {
              setMessage({ error: false, msg: "קרתה תקלה בזמן ההוספה!" });
            });
        }
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await CardDataService.getCard(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setAddress(docSnap.data().address);
      setPhone(docSnap.data().phone);
      setDesc(docSnap.data().desc);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="col-lg-4 p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBusinessName">
            <InputGroup>
              <InputGroup.Text id="formBusinessName">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="שם"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBusinessAddress">
            <InputGroup>
              <InputGroup.Text id="formBusinessAddress">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="כתובת"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBusinessPhone">
            <InputGroup>
              <InputGroup.Text id="formBusinessPhone">C</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBusinessImage">
            <InputGroup>
              <InputGroup.Text id="formBusinessImage">D</InputGroup.Text>
              <Form.Control
                type="file"
                ref={imageRef}
                placeholder="תמונה"
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBusinessDesc">
            <InputGroup>
              <InputGroup.Text id="formBusinessDesc">E</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="תיאור"
                value={desc}
                as="textarea"
                rows={3}
                onChange={(e) => setDesc(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                setDefaultMode();
              }}
            >
              חזרה
            </Button>
            <Button variant="primary" type="Submit">
              {btnText}
            </Button>
          </ButtonGroup>
        </Form>
      </div>
    </>
  );
};

export default AddCard;
