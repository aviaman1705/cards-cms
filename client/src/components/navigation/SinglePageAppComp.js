import NavigationRouteComp from "./NavigationRouteComp";
import NavigationBarComp from "./NavigationBarComp";
import { BrowserRouter as Router } from "react-router-dom";

import "./Header.css";
function SinglePageAppComp(props) {
  return (
    <Router>
      {" "}
      <NavigationBarComp user={props.user}></NavigationBarComp>
      <NavigationRouteComp
        set={props.set}
        user={props.user}
      ></NavigationRouteComp>
    </Router>
  );
}
export default SinglePageAppComp;
