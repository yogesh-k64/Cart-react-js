import React from "react";
import "./Parcel.css";

function Parcel(props) {
  const parcel = props.parcel;
  const parcelNumber = props.number;
  let courier;

  const weightRanges = [
    { min: 0, max: 200, money: 5 },
    { min: 200, max: 500, money: 10 },
    { min: 500, max: 1000, money: 15 },
    { min: 1000, max: 5000, money: 20 },
  ];

  let totalWeight = 0;

  parcel.length !== 1
    ? parcel.map((current) => (totalWeight += current.Weight))
    : (totalWeight = parcel[0].Weight);
  let totalPrice = 0;

  parcel.length !== 1
    ? parcel.map((current) => (totalPrice += current.Price))
    : (totalPrice = parcel[0].Price);

  weightRanges.map((range) => {
    if (range.min <= totalWeight && totalWeight < range.max) {
      console.log(parcelNumber, range);
      courier = range.money;
    }
  });
  console.log(parcel);
  // debugger
  return (
    <div className="parcelContainer">
      <h5 className="column">parcel {parcelNumber}</h5>

      <div className="column">
        Items -{" "}
        {parcel.map((packOne, index) => {
          // debugger
          return (
            <span>
              {packOne.Name}
              {index === parcel.length - 1 ? "." : ", "}
            </span>
          );
        })}
      </div>
      <div className="column">Total weight - {totalWeight}g</div>
      <div className="column">Total price - {totalPrice}$</div>
      <div className="column">Courier price - {courier}$</div>
    </div>
  );
}

export default Parcel;
