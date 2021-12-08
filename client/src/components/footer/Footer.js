import { Nav } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { tabs } from "../../helpers/tabs";

function Footer({ user }) {
  return (
    <footer className="bd-footer bg-dark">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <p className="copyright">Avi Aman @ 2021</p>
          </div>
          <div className="col-lg-4">
            <ul className="list">
              <li>
                <a href="#">Trems</a>
              </li>
              <li>
                <a href="#">Privacy </a>
              </li>
              <li>
                <a href="#">Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 text-center">
            <div className="social">
              <SocialIcon
                className="ms-3"
                url="https://facebook.com"
                target="_blank"
              />
              <SocialIcon
                className="ms-3"
                url="https://twitter.com"
                target="_blank"
              />
              <SocialIcon
                className="ms-3"
                url="https://google-plus.com"
                target="_blank"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function redirect(page) {
  console.log(page);
}

export default Footer;
