import NavigationRouteComp from "./NavigationRouteComp";
import NavigationBarComp from "./NavigationBarComp";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
function SinglePageAppComp(props) {
  return (
    <Router>
      {" "}
      <NavigationBarComp user={props.user}></NavigationBarComp>
      <div className="flex-container ">
        <NavigationRouteComp
          set={props.set}
          user={props.user}
        ></NavigationRouteComp>
      </div>
    </Router>
  );
}
export default SinglePageAppComp;
