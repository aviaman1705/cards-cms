import { useEffect, useReducer, useState } from "react";
import {
  getCategories,
  getCities,
  searchBusiness,
} from "../../../helpers/FetchHelper";
import { selectOptionReducer } from "../../../helpers/SearchHelper";
import Button from "../../UI/Button/Button";

import "./SearchFrom.css";

const SearchFrom = (props) => {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formIsValid, setFormIsValid] = useState(false);

  const [cityState, dispatchCity] = useReducer(selectOptionReducer, {
    value: "",
    isValid: null,
  });

  const [categoryState, dispatchCategory] = useReducer(selectOptionReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    getCities((response) => {
      setCities(response);
    });
    getCategories((response) => {
      setCategories(response);
    });
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(cityState.isValid);
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [cityState.isValid]);

  const onChangeCityHandler = (event) => {
    let selectedCity = cities.find((city) => city.title === event.target.value);

    if (selectedCity === undefined) {
      dispatchCity({ type: "USER_SELECT", val: -1 });
    } else {
      dispatchCity({ type: "USER_SELECT", val: selectedCity._id });
    }
  };

  const onChangeCategoryHandler = (event) => {
    let selectedCategory = categories.find(
      (category) => category.title === event.target.value
    );

    if (selectedCategory === undefined) {
      dispatchCategory({ type: "USER_SELECT", val: -1 });
    } else {
      dispatchCategory({ type: "USER_SELECT", val: selectedCategory._id });
    }
  };

  const searchHandler = (event) => {
    event.preventDefault();

    searchBusiness(categoryState.value, cityState.value, (response) => {
      props.setCards(response);
    });
  };

  return (
    <form
      id="search-form"
      className="row needs-validation"
      noValidate
      onSubmit={searchHandler}
    >
      <div className="col-6 mx-auto">
        <div id="search-from-input-container" className="row">
          <div className="col-md-4 text-right">
            <label
              htmlFor="selectOptionCity"
              className="form-label search-from-label"
            >
              עיר
            </label>
            <select
              id="selectOptionCity"
              onChange={onChangeCityHandler}
              defaultValue={"DEFAULT"}
              required
              className={`form-control search-form-select ${
                cityState.isValid === false ? "is-invalid" : ""
              }`}
            >
              <option value="DEFAULT">בחר עיר...</option>
              {cities.map((city) => (
                <option key={city._id}>{city.title}</option>
              ))}
            </select>
            <div className="invalid-feedback search-form-error">
              אנא בחר עיר.
            </div>
          </div>
          <div className="col-md-4">
            <label
              htmlFor="selectOptionCategory"
              className="form-label search-from-label"
            >
              קטוגריה
            </label>
            <select
              id="selectOptionCategory"
              onChange={onChangeCategoryHandler}
              defaultValue={"DEFAULT"}
              required
              className={`form-control search-form-select ${
                categoryState.isValid === false ? "is-invalid" : ""
              }`}
            >
              <option value="DEFAULT">בחר קטגוריה...</option>
              {categories.map((category) => (
                <option key={category._id}>{category.title}</option>
              ))}
            </select>
            <div className="invalid-feedback search-form-error">
              אנא בחר קטגוריה.
            </div>
          </div>
          <div className="col-md-4">
            <Button
              type="submit"
              id="search-from-btn"
              className="submit-btn"
              disabled={!formIsValid}
            >
              חפש עסקים
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchFrom;
