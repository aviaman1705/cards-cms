import { registerNewAccount, insertNewCard } from "../helpers/FetchHelper";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import SimpleRegistrationComp from "../components/simple-registration/SimpleRegistrationComp";
import CreateCardComp from "../components/my-cards/CreateCardComp";
import { useState } from "react";
import { signInUser } from "../helpers/FetchHelper";
import { createBrowserHistory } from "history";

function BusinessRegistrationPage({ set }) {
  const [isStep1, setIsStep1] = useState(true);
  const history = useHistory();

  return (
    <Container>
      {isStep1 && (
        <SimpleRegistrationComp
          clickHandler={registerUser}
          text="Business Registration"
        ></SimpleRegistrationComp>
      )}
      {!isStep1 && <CreateCardComp clickHandler={createCard}></CreateCardComp>}
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
          localStorage.setItem("token", response.token);
        });

        setIsStep1(false);
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
