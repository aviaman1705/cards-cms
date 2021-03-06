import { SocialIcon } from "react-social-icons";

import "./Footer.css";
function Footer() {
  return (
    <footer className="footer bd-footer">
      <div className="container py-5">
        <div className="row">
          <div className="col-4">
            <p className="copyright">Avi Aman @ 2021</p>
          </div>
          <div className="col-4">
            <ul className="list">
              <li>
                <a href="/#">Trems</a>
              </li>
              <li>
                <a href="/#">Privacy </a>
              </li>
              <li>
                <a href="/#">Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-4 text-center">
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

export default Footer;
