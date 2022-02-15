import { useEffect, useState } from "react";
import { getCategories, getCities } from "../../../helpers/FetchHelper";
import Button from "../../UI/Button/Button";
import DropDown from "../../UI/DropDown/DropDown";

import "./SearchFrom.css";

const SearchFrom = (props) => {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCity, setsSlectedCity] = useState("");
  const [selectedCategory, setsSlectedCategory] = useState("");

  useEffect(() => {
    getCities(localStorage.getItem("token"), (response) => {
      setCities(response);
    });

    getCategories(localStorage.getItem("token"), (response) => {
      setCategories(response);
    });
  }, []);

  const onSelectedCity = (city) => {
    setsSlectedCity(city);
  };

  const onSelectedCategory = (category) => {
    setsSlectedCategory(category);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    console.log("selectedCategory " + selectedCategory);
    console.log("selectedCity " + selectedCity);
  };

  return (
    <form className="row" onSubmit={searchHandler}>
      <div className="col-lg-2">
        <DropDown
          defaultText="בחר עיר..."
          items={cities}
          onSelectedOption={onSelectedCity}
        />
      </div>
      <div className="col-lg-2">
        <DropDown
          defaultText="בחר קטגוריה..."
          items={categories}
          onSelectedOption={onSelectedCategory}
        />
      </div>
      <div className="col-lg-2">
        <Button type="submit" className="submit-btn">
          חפש
        </Button>
      </div>
    </form>
  );
};

export default SearchFrom;
