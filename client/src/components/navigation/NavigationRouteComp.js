import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { tabs } from "../../helpers/tabs";
import AboutPage from "../../pages/AboutPage";
import HomePage from "../../pages/HomePage";
import MyCardsPage from "../../pages/MyCardsPage";
import MyFavePage from "../../pages/MyFavePage";
import RegistrationPage from "../../pages/RegistrationPage";
import SignInPage from "../../pages/SignInPage";
import AuthContext from "../../store/auth-context";

function NavigationRouteComp(props) {
  const authCtx = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/login">
        {!authCtx.isLoggedIn && <SignInPage />}
        {authCtx.isLoggedIn && <Redirect to="/" />}
      </Route>

      <Route path="/my-favorites">
        {!authCtx.isLoggedIn && <SignInPage />}
        {authCtx.isLoggedIn && <MyFavePage />}
      </Route>

      <Route path="/my-cards">
        {!authCtx.isLoggedIn && <SignInPage />}
        {authCtx.isLoggedIn && <MyCardsPage />}
      </Route>

      <Route path="/registration">
        {!authCtx.isLoggedIn && <RegistrationPage />}
        {authCtx.isLoggedIn && <Redirect to="/" />}
      </Route>

      <Route path="/about">
        <AboutPage />
      </Route>

      <Route path="*">
        <Redirect to="/" />
      </Route>

      {/* {tabs.map((tab, index) => (
        <Route key={index} path={tab.href} exact>
          {
            
}
        </Route>
      ))} */}
    </Switch>
  );
}

export default NavigationRouteComp;
