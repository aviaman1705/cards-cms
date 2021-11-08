import { Container } from "react-bootstrap";
import SimpleRegistrationComp from "../components/simple-registration/SimpleRegistrationComp";
import { registerNewAccount } from "../helpers/FetchHelper";
import { toast } from "react-toastify";
import { createBrowserHistory } from "history";

function SimpleRegistrationPage() {
  const history = createBrowserHistory({ forceRefresh: true });

  return (
    <Container className="h-100">
      <SimpleRegistrationComp
        clickHandler={registerUser}
        text="Simple Registration"
      ></SimpleRegistrationComp>
    </Container>
  );

  function registerUser(data) {
    registerNewAccount(data, (data) => {
      if (data._id) {
        toast("Account Created Successfully");

        setTimeout(() => {
          history.push("/sign-in");
        }, 3000);
      } else {
        toast("Eror Acount was not created");
      }
    });
  }
}
export default SimpleRegistrationPage;
