import { Container } from "react-bootstrap";

function HomePage() {
  return (
    <Container id="home-container">
      <div id="wrap-content">
        <h1 id="title-page">Welcome To Our Business CMS</h1>
        <h2 id="subtitle-page">Create Cards for your business</h2>
        <p className="text-home">
          Join To hundreds of businesses already registered with it
        </p>
      </div>
    </Container>
  );
}
export default HomePage;
