import React, { useState } from "react";
import { getSearchResults, addFaveoriteCard } from "../../helpers/FetchHelper";
import CardsComp from "../my-cards/CardsComp";

function Autocomplete() {
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
    <div className="container">
      <h1 className="p-4 text-center">Search</h1>

      <input
        type="text"
        className="col-md-12 form-control mb-5"
        onChange={(e) => onChangeHandler(e.target.value)}
        value={text}
      />

      {suggestions && (
        <CardsComp
          cards={suggestions}
          onAdd={addCardToFave}
          btnAddStatus={true}
        ></CardsComp>
      )}

      {suggestions.length == 0 && searchStarted && (
        <h3 id="no-results-title" className="text-center">
          No Results Found
        </h3>
      )}
    </div>
  );

  function addCardToFave(card) {
    setSuggestions(suggestions.filter((item) => item._id !== card._id));

    addFaveoriteCard(
      { bizNumber: card.bizNumber },
      localStorage.getItem("token"),
      (data) => {
        alert("Item added to favorites");
      },
      (error) => {
        alert(error);
      }
    );
  }
}
export default Autocomplete;
