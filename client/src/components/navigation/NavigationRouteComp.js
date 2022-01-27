import { Switch, Route, Redirect } from "react-router-dom";
import { tabs } from "../../helpers/Tabs";

function NavigationRouteComp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      {tabs.map((tab, index) => (
        <Route key={index} path={tab.href} exact>
          {<tab.page set={props.set} user={props.user}></tab.page>}
        </Route>
      ))}
    </Switch>
  );
}

export default NavigationRouteComp;
