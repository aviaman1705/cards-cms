import { render } from "react-dom";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextPrvider } from "./state/auth-context";

render(
  <AuthContextPrvider>
    <App />
  </AuthContextPrvider>,
  document.getElementById("root")
);
