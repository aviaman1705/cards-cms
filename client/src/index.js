import { render } from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextPrvider } from "./state/auth-context";

render(
  <AuthContextPrvider>
    <App />
  </AuthContextPrvider>,
  document.getElementById("root")
);
