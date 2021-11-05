import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SignInPage from "../pages/SignInPage";
import BusinessRegistrationPage from "../pages/BusinessRegistrationPage";
import SimpleRegistrationPage from "../pages/SimpleRegistrationPage";
import MyCardsPage from "../pages/MyCardsPage";
import { BiArchive, BiCreditCard, BiHome, BiLeftIndent } from "react-icons/bi";

export const tabs = [
  {
    name: "Home",
    href: "/home",
    page: HomePage,
    displayForLoggedin: true,
    icon: <BiHome> </BiHome>,
  },
  {
    name: "About",
    href: "/about",
    page: AboutPage,
    displayForLoggedin: true,
    icon: <BiArchive></BiArchive>,
  },
  {
    name: "Simple Registration",
    href: "/simple-registration",
    page: SimpleRegistrationPage,
    displayForLoggedin: false,
    icon: <BiLeftIndent></BiLeftIndent>,
  },
  {
    name: "Business Registration",
    href: "/business-registration",
    page: BusinessRegistrationPage,
    displayForLoggedin: false,
    icon: <BiLeftIndent></BiLeftIndent>,
  },
  {
    name: "My Cards",
    href: "/my-cards",
    page: MyCardsPage,
    displayForLoggedin: true,
    hideForLoggedout: true,
    icon: <BiCreditCard></BiCreditCard>,
  },
  {
    name: "Sign In",
    href: "/sign-in",
    page: SignInPage,
    displayForLoggedin: false,
    icon: <BiLeftIndent></BiLeftIndent>,
  },
];
