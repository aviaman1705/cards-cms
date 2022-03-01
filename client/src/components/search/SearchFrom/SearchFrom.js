import { useEffect, useReducer, useState } from "react";
import { getCategories, getCities } from "../../../helpers/FetchHelper";
import { selectOptionReducer } from "../../../helpers/SearchHelper";
import Button from "../../UI/Button/Button";

import "./SearchFrom.css";

const SearchFrom = (props) => {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCity, setsSlectedCity] = useState("");
  const [selectedCategory, setsSlectedCategory] = useState("");

  const [formIsValid, setFormIsValid] = useState(false);

  const [cityState, dispatchCity] = useReducer(selectOptionReducer, {
    value: "",
    isValid: null,
  });

  const [categoryState, dispatchCategory] = useReducer(selectOptionReducer, {
    value: "",
    isValid: null,
  });

  const DUMMY_CATEGORIES = [
    {
      _id: 1,
      title: "category 1",
    },
    {
      _id: 2,
      title: "category 2",
    },
    {
      _id: 3,
      title: "category 3",
    },
    {
      _id: 4,
      title: "category 4",
    },
  ];

  const DUMMY_CITIES = [
    {
      _id: 1,
      title: "city 1",
    },
    {
      _id: 2,
      title: "city 2",
    },
    {
      _id: 3,
      title: "city 3",
    },
    {
      _id: 4,
      title: "city 4",
    },
  ];

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(cityState.isValid);
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [cityState.isValid]);

  useEffect(() => {
    // getCities(localStorage.getItem("token"), (response) => {
    //   setCities(response);
    // });
    // getCategories(localStorage.getItem("token"), (response) => {
    //   setCategories(response);
    // });
  }, []);

  const onChangeCityHandler = (event) => {
    let selectedCity = DUMMY_CITIES.find(
      (city) => city.title === event.target.value
    );

    if (selectedCity === undefined) {
      dispatchCity({ type: "USER_SELECT", val: -1 });
    } else {
      dispatchCity({ type: "USER_SELECT", val: selectedCity._id });
    }
  };

  const onChangeCategoryHandler = (event) => {
    let selectedCategory = DUMMY_CATEGORIES.find(
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
    console.log("selectedCategory " + selectedCategory);
    console.log("selectedCity " + selectedCity);
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
              {DUMMY_CITIES.map((city) => (
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
              {DUMMY_CATEGORIES.map((category) => (
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
