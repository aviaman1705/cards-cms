import NavigationRouteComp from "./NavigationRouteComp";
import NavigationBarComp from "./NavigationBarComp";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
function SinglePageAppComp({ set, user }) {
  return (
    <Router>
      {" "}
      <NavigationBarComp user={user}></NavigationBarComp>
      <div className="flex-container ">
        <NavigationRouteComp set={set} user={user}></NavigationRouteComp>
      </div>
    </Router>
  );
}
export default SinglePageAppComp;
