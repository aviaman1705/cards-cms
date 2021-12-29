import { registerNewAccount, insertNewCard } from "../helpers/FetchHelper";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import SimpleRegistrationComp from "../components/simple-registration/SimpleRegistrationComp";
import { useState } from "react";
import { signInUser, getMeData } from "../helpers/FetchHelper";
import { useHistory } from "react-router-dom";

function BusinessRegistrationPage() {
  const [isStep1, setIsStep1] = useState(true);
  let [error, setError] = useState("");
  const history = useHistory();

  return (
    <Container className="h-100">
      {isStep1 && (
        <SimpleRegistrationComp
          serverError={error}
          clickHandler={registerUser}
          text="Business Registration"
        ></SimpleRegistrationComp>
      )}
    </Container>
  );

  function registerUser(data) {
    data.biz = true;

    let userData = { email: data.email, password: data.password };

    registerNewAccount(data, (data) => {
      if (data._id) {
        signInUser(
          { email: userData.email, password: userData.password },
          (response) => {
            if (response.token) {
              toast("Account was created successfully");
              setTimeout(() => {
                history.push("/sign-in");
              }, 2000);
            } else {
              toast("Fail to log in");
            }
          }
        );
      } else {
        setError("User already registered.");
      }
    });
  }
}

export default BusinessRegistrationPage;
