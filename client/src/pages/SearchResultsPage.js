import Autocomplete from "../components/search/Autocomplete";

function SearchResultsPage(props) {
  return (
    <div className="container" id="search-container">
      <Autocomplete user={props.user} />
    </div>
  );
}
export default SearchResultsPage;
