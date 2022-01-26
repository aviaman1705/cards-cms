import SimpleRegistrationComp from "../components/simple-registration/SimpleRegistrationComp";
import "./Form.css";

const RegistrationPage = () => {
  return (
    <div className="container form-container">
      <SimpleRegistrationComp text="Business Registration"></SimpleRegistrationComp>
    </div>
  );
};

export default RegistrationPage;
