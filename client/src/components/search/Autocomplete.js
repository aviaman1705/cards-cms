import React, { useState } from "react";
import { getSearchResults, addFaveoriteCard } from "../../helpers/FetchHelper";
import Cards from "../my-cards/Cards";
import { toast } from "react-toastify";
import "./Autocomplete.css";

function Autocomplete(props) {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchStarted, setStatusSearch] = useState(false);

  const onChangeHandler = (text) => {
    if (text.length > 0) {
      getSearchResults(localStorage.getItem("token"), text, (response) => {
        setSuggestions(response);
        setStatusSearch(true);
      });
    } else setSuggestions([]);
    setText(text);
  };

  return (
    <div className="row">
      <div className="col-12">
        <h1 id="search-title">Search</h1>
      </div>
      <div className="col-12">
        <input
          type="text"
          placeholder="Search..."
          className="col-md-12 form-control mb-5"
          onChange={(e) => onChangeHandler(e.target.value)}
          value={text}
        />

        {suggestions && (
          <div className="row">
            <Cards
              cards={suggestions}
              onAdd={addCardToFave}
              btnAddStatus={props.user._id ? true : false}
            />
          </div>
        )}

        {suggestions.length === 0 && searchStarted && (
          <h3 id="no-results-title" className="text-center">
            No Results Found
          </h3>
        )}
      </div>
    </div>
  );

  function addCardToFave(card) {
    toast("Item added to favorites");
    setTimeout(() => {
      addFaveoriteCard(
        { bizNumber: card.bizNumber },
        localStorage.getItem("token"),
        (data) => {},
        (error) => {
          toast(error);
        }
      );
    }, 500);
  }
}
export default Autocomplete;
