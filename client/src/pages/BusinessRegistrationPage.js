import { registerNewAccount, insertNewCard } from "../helpers/FetchHelper";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import SimpleRegistrationComp from "../components/simple-registration/SimpleRegistrationComp";
import CardItemComp from "../components/my-cards/CardItemComp";
import { useState } from "react";
import { signInUser, getMeData } from "../helpers/FetchHelper";
import { useHistory } from "react-router-dom";

function BusinessRegistrationPage({ set }) {
  const [isStep1, setIsStep1] = useState(true);
  const history = useHistory();

  return (
    <Container className="h-100">
      {isStep1 && (
        <SimpleRegistrationComp
          clickHandler={registerUser}
          text="Business Registration"
        ></SimpleRegistrationComp>
      )}
      {/* {!isStep1 && <CardItemComp textBtn="Create" clickHandler={createCard} />} */}
    </Container>
  );

  function registerUser(data) {
    data.biz = true;

    let email = data.email;
    let password = data.password;

    registerNewAccount(data, (data) => {
      if (data._id) {
        toast("Account Created Successfully");

        signInUser({ email: email, password: password }, (response) => {
          if (response.token) {
            localStorage.setItem("token", response.token);
            getMeData(response.token, (data) => {
              set(data);
              // setIsStep1(false);
              history.push("/my-cards");
            });
          } else {
            toast("Fail to log in");
          }
        });
      } else {
        toast("Eror Acount was not created");
      }
    });
  }

  function createCard(data) {
    insertNewCard(data, localStorage.getItem("token"), (data) => {
      history.push("/my-cards");
    });
  }
}
export default BusinessRegistrationPage;
