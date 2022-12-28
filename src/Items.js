import React from "react";
import "./Item.css";

function Items(props) {
  const item = props.item;
  return (
    <div className="itemContainer">
      <span className="col">{item.Name}</span>
      <span className="col">{item.Price}</span>
      <span className="col">{item.Weight}</span>
      {props.title ? (
        <span className={"col"}>Select</span>
      ) : (
        <input
          className="col"
          type={"checkbox"}
          onChange={(e) => props.select(item, e)}
        />
      )}
    </div>
  );
}

export default Items;
