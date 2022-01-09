import { Container } from "react-bootstrap";
import Autocomplete from "../components/search/Autocomplete";

function SearchResultsPage(props) {
  return (
    <Container id="search-container">
      <Autocomplete user={props.user} />
    </Container>
  );
}
export default SearchResultsPage;
