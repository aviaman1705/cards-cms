import validateSimpleRegistration from "../../helpers/simpleRegistrationHelper";
import Button from "../UI/Button/Button";

function SimpleRegistrationComp(props) {
  const registerHandler = (event) => {
    event.preventDefault();
    var errorOrData = validateSimpleRegistration(
      "formBasicEmail",
      "formBasicPassword",
      "formBasicName"
    );

    if (typeof errorOrData === "boolean") {
      return;
    }

    props.clickHandler(errorOrData);
  };

  return (
    <div className="row">
      <div className="col-12">
        <h1 className="user-form-title">Register</h1>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col">
        <form className="user-form" onSubmit={registerHandler}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" id="formBasicEmail" className="form-control" />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              id="formBasicPassword"
              className="form-control"
            />
            <label className="error form-label"></label>
          </div>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" id="formBasicName" className="form-control" />
            <label className="error form-label"></label>
          </div>
          <Button type="submit" className="btn-primary mr-3">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SimpleRegistrationComp;
