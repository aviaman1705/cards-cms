import React from "react";
import { useContext, useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import "./DropDown.css";

const DropDown = (props) => {
  const [title, setTitle] = useState(props.defaultText);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (e) => {
    setSelectedValue(e);
    setTitle(e);
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
          <Dropdown.Item key={item._id} eventKey={item.title}>
            {item.title}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </>
  );
};

export default DropDown;
