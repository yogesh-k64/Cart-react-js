import React, { Fragment, useState } from "react";
import "./App.css";
import cartData from "./cart.json";
import Items from "./Items";
import Parcel from "./Parcel";

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [toggle, setToggle] = useState(false)

  const handleSelection = (item, event) => {
    const checked = event.target.checked;

    if (checked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) => {
        return prev.filter((i) => i.Name !== item.Name);
      });
    }
  };

  const placeOrderHandler = (order = selectedItems) => {
    let totalPrice = 0;
    let totalWeight = 0;
    let weightRanges = [
      { min: 0, max: 200 },
      { min: 200, max: 500 },
      { min: 500, max: 1000 },
      { min: 1000, max: 5000 },
    ];
    let sortedArr = selectedItems.sort((a, b) => b.Weight - a.Weight);

    let maxWeight = sortedArr[0].Weight;
    console.log(sortedArr, maxWeight);
    let selectedRange;
    for (let range of weightRanges) {
      if (range.min <= maxWeight && range.max > maxWeight) {
        selectedRange = range;
        break;
      }
    }
    console.log(selectedRange);
    let parcelArr = [];
    let tempIndex = 0;
    for (let i = 0; i < sortedArr.length; i++) {
      let val = sortedArr[i];
      totalWeight += val.Weight;
      totalPrice += val.Price;
      if (selectedRange.min <= totalWeight && selectedRange.max > totalWeight) {

        if (totalPrice <= 250) {
          parcelArr.push(
            i == 0
              ? sortedArr.slice(tempIndex, 1)
              : sortedArr.slice(tempIndex, i + 1)
          );
          tempIndex = i + 1;
        } else {
          parcelArr.push(sortedArr.slice(tempIndex, i));
          tempIndex = i;
        }
        totalPrice = 0;
        totalWeight = 0;
      }
    }
    if (tempIndex !== sortedArr.length - 1) {
      totalPrice = 0;
      totalWeight = 0;
      let priceIndex = tempIndex;
      for (let i = tempIndex; i < sortedArr.length; i++) {
        let val = sortedArr[i];
        totalWeight += val.Weight;
        totalPrice += val.Price;
        if (totalPrice > 250) {

          parcelArr.push(sortedArr.slice(priceIndex, i));
          priceIndex = i;
          totalPrice = sortedArr[i].Price;
        } 
      }
      parcelArr.push(sortedArr.slice(priceIndex));
    }

    setParcels(parcelArr);
    setToggle(value=>!value)
  };


  return (
    <div className="App">
      {toggle ? (
        <div>
          <h2>Cart</h2>
          {parcels.map((pack,index)=>{
            return <Parcel parcel={pack} number={index+1}/>
          })}
          
        </div>
      ) : (
        <Fragment>
          <h2>Select Product</h2>
          <Items
            item={{
              Name: "Name",
              Price: "Price",
              Weight: "Weight",
            }}
            title={true}
          />
          {cartData.map((item) => (
            <Items key={item.Name} item={item} select={handleSelection} />
          ))}
          <input
            className="orderButton"
            type={"button"}
            value="Place Order"
            onClick={() => placeOrderHandler()}
          />
        </Fragment>
      )}
    </div>
  );
};

export default App;
