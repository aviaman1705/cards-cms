import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SignInPage from "../pages/SignInPage";
import BusinessRegistrationPage from "../pages/BusinessRegistrationPage";
import MyCardsPage from "../pages/MyCardsPage";
import SearchResultsPage from "../pages/SearchResultsPage";
import { BiArchive, BiCreditCard, BiHome, BiLeftIndent } from "react-icons/bi";
import MyFavePage from "../pages/MyFavePage";

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
    name: "Registration",
    href: "/registration",
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
    name: "My Favorites",
    href: "/my-favorites",
    page: MyFavePage,
    displayForLoggedin: true,
    hideForLoggedout: true,
    icon: <BiCreditCard></BiCreditCard>,
  },
  {
    name: "Search Results",
    href: "/search-results",
    page: SearchResultsPage,
    displayForLoggedin: true,
    hideForLoggedout: true,
    icon: <BiArchive></BiArchive>,
  },
  {
    name: "Sign In",
    href: "/sign-in",
    page: SignInPage,
    displayForLoggedin: false,
    icon: <BiLeftIndent></BiLeftIndent>,
  },
];
