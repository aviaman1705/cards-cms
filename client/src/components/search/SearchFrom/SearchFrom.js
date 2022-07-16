import { useEffect, useReducer, useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
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
  //const [formIsValid, setFormIsValid] = useState(true);

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
      const loadedCities = [];
      for (const key in response) {
        loadedCities.push({
          id: key,
          title: response[key].title,
        });
      }
      setCities(loadedCities);
    });

    getCategories((response) => {
      const loadedCategories = [];
      for (const key in response) {
        loadedCategories.push({
          id: key,
          title: response[key].title,
        });
      }
      setCategories(loadedCategories);
    });
  }, []);

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

    console.log(`categoryState ${categoryState.value}`);
    console.log(`cityState ${cityState.value}`);

    if (!categoryState.isValid || categoryState.value === -1) {
      dispatchCategory({ type: "USER_SUBMIT", val: -1 });
      return;
    }

    if (!cityState.isValid || cityState.value === -1) {
      dispatchCity({ type: "USER_SUBMIT", val: -1 });
      return;
    }

    searchBusiness(categoryState.value, cityState.value, (response) => {
      props.setCards(response);
    });
  };

  return (
    <Form onSubmit={searchHandler}>
      <Row className="justify-content-md-center">
        <Col lg={3}>
          <select
            className="form-control"
            onChange={onChangeCityHandler}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT">בחר עיר...</option>
            {cities.map((city, index) => (
              <option key={index}>{city.title}</option>
            ))}
          </select>
        </Col>
        <Col lg={3}>
          <select
            className="form-control"
            onChange={onChangeCategoryHandler}
            defaultValue={"DEFAULT"}
            required
          >
            <option value="DEFAULT">בחר קטגוריה...</option>
            {categories.map((category, index) => (
              <option key={index}>{category.title}</option>
            ))}
          </select>
        </Col>
        <Col lg={2}>
          <Button id="search-from-button" type="submit">
            חפש
          </Button>
        </Col>
      </Row>
    </Form>
    // <form>
    //   <div class="form-row">
    //     <div class="col-7">
    //       <input type="text" class="form-control" placeholder="City" />
    //     </div>
    //     <div class="col">
    //       <input type="text" class="form-control" placeholder="State" />
    //     </div>
    //     <div class="col">
    //       <input type="text" class="form-control" placeholder="Zip" />
    //     </div>
    //   </div>
    // </form>
    // <div id="search-from-wrapper">
    //   <form onSubmit={searchHandler}>
    //     <div className="search-form-group">
    //       <select
    //         className="search-from-control"
    //         onChange={onChangeCityHandler}
    //         defaultValue={"DEFAULT"}
    //       >
    //         <option value="DEFAULT">בחר עיר...</option>
    //         {cities.map((city, index) => (
    //           <option key={index}>{city.name}</option>
    //         ))}
    //       </select>
    //     </div>
    //     <div className="search-form-group">
    //       <select
    //         className="search-from-control"
    //         onChange={onChangeCategoryHandler}
    //         defaultValue={"DEFAULT"}
    //         required
    //       >
    //         <option value="DEFAULT">בחר קטגוריה...</option>
    //         {categories.map((category, index) => (
    //           <option key={index}>{category.title}</option>
    //         ))}
    //       </select>
    //     </div>
    //     <Button className="search-from-button" type="submit">
    //       חפש
    //     </Button>
    //   </form>
    // </div>
  );
};

export default SearchFrom;
