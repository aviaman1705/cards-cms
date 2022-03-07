import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SignInPage from "../pages/SignInPage";
import RegistrationPage from "../pages/RegistrationPage";
import MyCardsPage from "../pages/MyCardsPage";
import SearchResultsPage from "../pages/SearchResultsPage";
import { BiArchive, BiCreditCard, BiHome, BiLeftIndent } from "react-icons/bi";
import MyFavePage from "../pages/MyFavePage";

export const tabs = [
  {
    name: "כניסה",
    href: "/sign-in",
    page: SignInPage,
    displayForLoggedin: false,
    icon: <BiLeftIndent></BiLeftIndent>,
  },
  {
    name: "תוצאות חיפוש",
    href: "/search-results",
    page: SearchResultsPage,
    displayForLoggedin: true,
    hideForLoggedout: true,
    icon: <BiArchive></BiArchive>,
  },
  {
    name: "מועדפים",
    href: "/my-favorites",
    page: MyFavePage,
    displayForLoggedin: true,
    hideForLoggedout: true,
    icon: <BiCreditCard></BiCreditCard>,
  },
  {
    name: "העסקים שלי",
    href: "/my-cards",
    page: MyCardsPage,
    displayForLoggedin: true,
    hideForLoggedout: true,
    icon: <BiCreditCard></BiCreditCard>,
  },
  {
    name: "הרשמה",
    href: "/registration",
    page: RegistrationPage,
    displayForLoggedin: false,
    icon: <BiLeftIndent></BiLeftIndent>,
  },
  {
    name: "אודות",
    href: "/about",
    page: AboutPage,
    displayForLoggedin: true,
    icon: <BiArchive></BiArchive>,
  },
  {
    name: "עמוד הבית",
    href: "/home",
    page: HomePage,
    displayForLoggedin: true,
    icon: <BiHome> </BiHome>,
  },
];
