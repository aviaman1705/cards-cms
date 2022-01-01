import { Col, Row } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <footer className="footer bd-footer">
      <div className="container py-5">
        <Row>
          <Col lg={4}>
            <p className="copyright">Avi Aman @ 2021</p>
          </Col>
          <Col lg={4}>
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
          </Col>
          <Col lg={4} className="text-center">
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
          </Col>
        </Row>
      </div>
    </footer>
  );
}

export default Footer;
