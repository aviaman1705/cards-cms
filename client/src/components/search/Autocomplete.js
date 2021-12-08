import React, { useState } from "react";
import { getSearchResults } from "../../helpers/FetchHelper";
import CardComp from "../my-cards/CardComp";

function Autocomplete() {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };

  const onChangeHandler = (text) => {
    if (text.length > 0) {
      getSearchResults(localStorage.getItem("token"), text, (response) => {
        setSuggestions(response);
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
        <div className="row">
          {suggestions.map((c, index) => (
            <div className="col-lg-3 col-md-6 col" key={index}>
              <CardComp
                editBtnClass="d-none"
                deleteBtnClass="d-none"
                card={c}
              ></CardComp>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Autocomplete;
