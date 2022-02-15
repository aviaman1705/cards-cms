import React from "react";
import { useState } from "react";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import "./DropDown.css";

const DropDown = (props) => {
  const [title, setTitle] = useState(props.defaultText);

  const handleSelect = (e) => {
    setTitle(e);
    props.onSelectedOption(e);
  };

  return (
    <>
      <DropdownButton
        title={title}
        id="dropdown-menu-align-right"
        onSelect={handleSelect}
      >
        <Dropdown.Item eventKey={props.defaultText}>
          {props.defaultText}
        </Dropdown.Item>
        {props.items.map((item) => (
          <Dropdown.Item key={item._id} eventKey={item._id}>
            {item.title}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </>
  );
};

export default DropDown;
