import NavigationRouteComp from "./NavigationRouteComp";
import NavigationBarComp from "./NavigationBarComp";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
function SinglePageAppComp({ set, user }) {
  return (
    <Router>
      {" "}
      <NavigationBarComp user={user}></NavigationBarComp>
      <NavigationRouteComp set={set} user={user}></NavigationRouteComp>
      <Redirect exact from="/" to="home" />
    </Router>
  );
}
export default SinglePageAppComp;
