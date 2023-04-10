import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {View, TextInput} from 'react-native';


class Menu {

  burger_name_array = [];
  burger_id_array = [];
  burger_price_array = [];
  burger_materials_array = [];

  sandwich_name_array = [];
  sandwich_id_array = [];
  sandwich_price_array = [];
  sandwich_materials_array = [];

  extras_name_array = [];
  extras_id_array = [];
  extras_price_array = [];
  extras_materials_array = [];

  sweets_name_array = [];
  sweets_id_array = [];
  sweets_price_array = [];
  sweets_materials_array = [];

  basket_name_array = [];
  basket_id_array = [];
  basket_price_array = [];
  basket_materials_array = [];
  

  constructor(json) {
      for (const x in json) {
          if ((json[x]["type"] == "burger") && (!this.burger_name_array.includes(json[x]["name"]))){
            this.burger_name_array.push(json[x]["name"]);
            this.burger_id_array.push(json[x]["id"]);
            this.burger_price_array.push(json[x]["cost"]);
            this.burger_materials_array.push(json[x]["materials"]);
          }
          if ((json[x]["type"] == "sandwich") && (!this.sandwich_name_array.includes(json[x]["name"]))){
            this.sandwich_name_array.push(json[x]["name"]);
            this.sandwich_id_array.push(json[x]["id"]);
            this.sandwich_price_array.push(json[x]["cost"]);
            this.sandwich_materials_array.push(json[x]["materials"]);
          }
          if ((json[x]["type"] == "sweets") && (!this.sweets_name_array.includes(json[x]["name"]))){
            this.sweets_name_array.push(json[x]["name"]);
            this.sweets_id_array.push(json[x]["id"]);
            this.sweets_price_array.push(json[x]["cost"]);
            this.sweets_materials_array.push(json[x]["materials"]);
          }
          if ((json[x]["type"] == "extras") && (!this.extras_name_array.includes(json[x]["name"]))){
            this.extras_name_array.push(json[x]["name"]);
            this.extras_id_array.push(json[x]["id"]);
            this.extras_price_array.push(json[x]["cost"]);
            this.extras_materials_array.push(json[x]["materials"]);
          }
          if ((json[x]["type"] == "basket") && (!this.basket_name_array.includes(json[x]["name"]))){
            this.basket_name_array.push(json[x]["name"]);
            this.basket_id_array.push(json[x]["id"]);
            this.basket_price_array.push(json[x]["cost"]);
            this.basket_materials_array.push(json[x]["materials"]);
          }
      }
  }

  get_burger_name_array() {
    return this.burger_name_array;
  }

  get_extras_name_array() {
    return this.extras_name_array;
  }

  get_sweets_name_array() {
    return this.sweets_name_array;
  }

  get_sandwich_name_array() {
    return this.sandwich_name_array;
  }

  get_baskets_name_array() {
    return this.basket_name_array;
  }

  printMenu() {
    console.log("----------Burgers-----------");
    for (var i = 0; i < this.burger_name_array.length; i++) {
      console.log(this.burger_name_array[i])
    }
    console.log("---------Extras------------");
    for (var i = 0; i < this.extras_name_array.length; i++) {
      console.log(this.extras_name_array[i])
    }
    console.log("----------Sweets-----------");
    for (var i = 0; i < this.sweets_name_array.length; i++) {
      console.log(this.sweets_name_array[i])
    }
    console.log("----------Basket-----------");
    for (var i = 0; i < this.basket_name_array.length; i++) {
      console.log(this.basket_name_array[i])
    }
    console.log("-----------Sandwich----------");
    for (var i = 0; i < this.sandwich_name_array.length; i++) {
      console.log(this.sandwich_name_array[i])
    }
    console.log("---------------------");
  }
}

class Transaction {

  item_names = [];
  item_prices = [];
  item_amounts = [];
  item_ids = [];
  json;

  constructor (_json) {
    this.clear_transaciton();
    this.json = _json;
  }

  clear_transaciton() {
    this.item_names = [];
    this.item_prices = [];
    this.item_amounts = [];
    this.item_ids = [];
  }

  get_size() {
    return this.item_names.length;
  }

  add_to_transaciton(id) {
    let name = this.json[id]["name"];
    let cost = this.json[id]["cost"];
    let index = this.item_names.indexOf(name);
    if (index > -1) {
      // if the item is already on the order, it just increments the amount 
      this.item_amounts[index] += 1;
    }
    else {
      this.item_names.push(name);
      this.item_prices.push(cost);
      this.item_amounts.push(1);
      this.item_ids.push(id);
    }
  }
}

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  },
  gray: {
    default: "#969997",
    hover: "#d4d6d5"
  }
};

const Spacer = require('react-spacer');

function clickMe() {
  alert("You clicked me!");
}

/*const MultilineTextInputExample = () => {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View
      style={{
        backgroundColor: value,
        borderColor: '#000000',
        borderWidth: 1,
      }}>
      <TextInput
        editable={false}
        multiline={true}
        numberOfLines={10}
        maxLength={40}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={{padding: 10}}
      />
    </View>
  );
};*/

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: black;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  height: 100px;
  width: 100px;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  display: inline-block;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "gray"
};

const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`;

const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;

  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

function TabGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <div>
        {types.map((type) => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </div>
      <p />
      <p> Your payment selection: {active} </p>
    </>
  );
}

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}



const types = ["Cash", "Credit Card", "Bitcoin"];

function ToggleGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <div>
      {types.map((type) => (
        <ButtonToggle active={active === type} onClick={() => setActive(type)}>
          {type}
        </ButtonToggle>
      ))}
    </div>
  );
}

function App() {

  var url = "http://localhost:3001/user"
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  
  let current_transaction = new Transaction(message);

  function BurgerMenu() {
    var currentMenu = ["Revs Burger", "Doublestack Burger", "idk", "burger 4", "burger 5", "burger 6", "burger 7", "burger 8", "burger 9"]
    const [currentPage, updatePage] = useState(0);
    const [orderText, updateOrderText] = useState("Current Order");
    //const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
    const forceUpdate = useForceUpdate();
  
    const [menuButton1Text, updateMenuButton1Text] = useState(currentMenu[currentPage * 9]);
    const [menuButton2Text, updateMenuButton2Text] = useState(currentMenu[(currentPage * 9) + 1]);
    const [menuButton3Text, updateMenuButton3Text] = useState(currentMenu[(currentPage * 9) + 2]);
    const [menuButton4Text, updateMenuButton4Text] = useState(currentMenu[(currentPage * 9) + 3]);
    const [menuButton5Text, updateMenuButton5Text] = useState(currentMenu[(currentPage * 9) + 4]);
    const [menuButton6Text, updateMenuButton6Text] = useState(currentMenu[(currentPage * 9) + 5]);
    const [menuButton7Text, updateMenuButton7Text] = useState(currentMenu[(currentPage * 9) + 6]);
    const [menuButton8Text, updateMenuButton8Text] = useState(currentMenu[(currentPage * 9) + 7]);
    const [menuButton9Text, updateMenuButton9Text] = useState(currentMenu[(currentPage * 9) + 8]);
  
    const menu_object = new Menu(message);
  
    useEffect(() =>{
      updateText();
    }, [])
    
    
    const MultilineTextInputExample = () => {
      // If you type something in the text box that is a color, the background will change to that
      // color.
      return (
        <View
          style={{
            borderColor: '#000000',
            borderWidth: 1,
          }}>
          <TextInput
            editable={false}
            multiline={true}
            numberOfLines={10}
            maxLength={40}
            onChangeText={text => updateOrderText(text)}
            value={orderText}
            style={{padding: 10}}
          />
        </View>
      );
    };
  
    
    function updateText() {
  
      for (var i = 0; i < 9; i++) {
        switch(i) {
          case 0:
            updateMenuButton1Text(menu_object.burger_name_array[i + (currentPage * 9)]);
            break;
          case 1:
            if ((i + (currentPage * 9)) < menu_object.burger_name_array.length) {
              updateMenuButton2Text(menu_object.burger_name_array[i + (currentPage * 9)]);
            }
            else {
              updateMenuButton2Text(null);
            }
          case 2:
            if ((i + (currentPage * 9)) < menu_object.burger_name_array.length) {
              updateMenuButton3Text(menu_object.burger_name_array[i + (currentPage * 9)]);
            }
            else {
              updateMenuButton3Text(null);
            }
          case 3:
            if ((i + (currentPage * 9)) < menu_object.burger_name_array.length) {
              updateMenuButton4Text(menu_object.burger_name_array[i + (currentPage * 9)]);
            }
            else {
              updateMenuButton4Text(null);
            }
          case 4:
            if ((i + (currentPage * 9)) < menu_object.burger_name_array.length) {
              updateMenuButton5Text(menu_object.burger_name_array[i + (currentPage * 9)]);
            }
            else {
              updateMenuButton5Text(null);
            }
          case 5:
            if ((i + (currentPage * 9)) < menu_object.burger_name_array.length) {
              updateMenuButton6Text(menu_object.burger_name_array[i + (currentPage * 9)]);
            }
            else {
              updateMenuButton6Text(null);
            }
          case 6:
            if ((i + (currentPage * 9)) < menu_object.burger_name_array.length) {
              updateMenuButton7Text(menu_object.burger_name_array[i + (currentPage * 9)]);
            }
            else {
              updateMenuButton7Text(null);
            }
          case 7:
            if ((i + (currentPage * 9)) < menu_object.burger_name_array.length) {
              updateMenuButton8Text(menu_object.burger_name_array[i + (currentPage * 9)]);
            }
            else {
              updateMenuButton8Text(null);
            }
          case 8:
            if ((i + (currentPage * 9)) < menu_object.burger_name_array.length) {
              updateMenuButton9Text(menu_object.burger_name_array[i + (currentPage * 9)]);
            }
            else {
              updateMenuButton9Text(null);
            }
        }
      }
  
      forceUpdate();
      /*updateMenuButton1Text(currentMenu[currentPage * 9]);
      updateMenuButton2Text(currentMenu[(currentPage * 9) + 1]);
      updateMenuButton3Text(currentMenu[(currentPage * 9) + 2]);
      updateMenuButton4Text(currentMenu[(currentPage * 9) + 3]);
      updateMenuButton5Text(currentMenu[(currentPage * 9) + 4]);
      updateMenuButton6Text(currentMenu[(currentPage * 9) + 5]);
      updateMenuButton7Text(currentMenu[(currentPage * 9) + 6]);
      updateMenuButton8Text(currentMenu[(currentPage * 9) + 7]);
      updateMenuButton9Text(currentMenu[(currentPage * 9) + 8]);*/
    }
  
    //updateText();
  
    function menuButton1Click() {
      var orderText = orderText + "\n" + message[0]["name"] + " @ $" + message[0]["cost"]; 
      updateOrderText(orderText);
      forceUpdate();
      menu_object.printMenu();
    }
  
    function menuButton2Click() {
      console.log(menuButton2Text);
      var orderText = orderText + "\n" + message[1]["name"] + " @ $" + message[1]["cost"]; 
      updateOrderText(orderText);
      forceUpdate();
      console.log(orderText);
    }
  
    function menuButton3Click() {
      console.log(menuButton3Text);
      var orderText = orderText + "\n" + message[2]["name"] + " @ $" + message[2]["cost"]; 
      updateOrderText(orderText);
      forceUpdate();
      console.log(orderText);
    }
  
    function menuButton4Click() {
      console.log(menuButton4Text);
      var orderText = orderText + "\n" + message[3]["name"] + " @ $" + message[3]["cost"]; 
      updateOrderText(orderText);
      forceUpdate();
      console.log(orderText);
    }
  
    function menuButton5Click() {
      console.log(menuButton5Text);
      var orderText = orderText + "\n" + message[4]["name"] + " @ $" + message[4]["cost"]; 
      updateOrderText(orderText);
      forceUpdate();
      console.log(orderText);
    }
  
    function menuButton6Click() {
      console.log(menuButton6Text);
      var orderText = orderText + "\n" + message[5]["name"] + " @ $" + message[5]["cost"]; 
      updateOrderText(orderText);
      forceUpdate();
      console.log(orderText);
    }
  
    function menuButton7Click() {
      console.log(menuButton7Text);
      var orderText = orderText + "\n" + message[6]["name"] + " @ $" + message[6]["cost"]; 
      updateOrderText(orderText);
      forceUpdate();
      console.log(orderText);
    }
  
    function menuButton8Click() {
      console.log(menuButton8Text);
      var orderText = orderText + "\n" + message[7]["name"] + " @ $" + message[7]["cost"]; 
      updateOrderText(orderText);
      forceUpdate();
      console.log(orderText);
    }
  
    function menuButton9Click() {
      console.log(menuButton9Text);
      var orderText = orderText + "\n" + message[8]["name"] + " @ $" + message[8]["cost"]; 
      updateOrderText(orderText);
      forceUpdate();
      console.log(orderText);
    }
  
    function nextButtonClick() {
      var new_page = currentPage + 1;
      updatePage(new_page);
      console.log(currentPage);
      updateText();
    }
  
    function previousButtonClick() {
      var new_page = currentPage - 1
      updatePage(new_page);
      console.log(currentPage);
      updateText();
    }
  
    return (
      <div>
        <div class="menu-buttons">
        <div class="center">
          <Button onClick={menuButton1Click}>{menuButton1Text}</Button>
          <Button onClick={menuButton2Click}>{menuButton2Text}</Button>
          <Button onClick={menuButton3Click}>{menuButton3Text}</Button>
          <Button onClick={menuButton4Click}>{menuButton4Text}</Button>
          <Button onClick={menuButton5Click}>{menuButton5Text}</Button>
          <Button onClick={menuButton6Click}>{menuButton6Text}</Button>
          <Button onClick={menuButton7Click}>{menuButton7Text}</Button>
          <Button onClick={menuButton8Click}>{menuButton8Text}</Button>
          <Button onClick={menuButton9Click}>{menuButton9Text}</Button>
          <Button onClick={previousButtonClick}>Previous</Button>
          <Button onClick={nextButtonClick}>Next</Button>
        </div>
        <Spacer grow='0.1' />
        <MultilineTextInputExample value={orderText} onChange={e => updateOrderText(e.target.value)}/>
      </div>
      <div>
        
      </div>
      </div>
    );
  }



  return (
    <>
      <BurgerMenu />
    </>
  );
}

export default App;
