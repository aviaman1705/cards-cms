import { Switch, Route } from "react-router-dom";
import { tabs } from "../../helpers/tabs";

function NavigationRouteComp(props) {
  return (
    <Switch>
      {tabs.map((tab, index) => (
        <Route key={index} path={tab.href}>
          {<tab.page set={props.set} user={props.user}></tab.page>}
        </Route>
      ))}
    </Switch>
  );
}

export default NavigationRouteComp;
