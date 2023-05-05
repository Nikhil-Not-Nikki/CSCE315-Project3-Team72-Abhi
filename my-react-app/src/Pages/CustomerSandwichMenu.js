import React, {useState, useEffect, useContext} from "react";
import Menu from "../HelperClasses/Menu"
import {View, TextInput} from 'react-native';
import Button from "../HelperClasses/Button"
import { UserContext } from "../App"
import './Customer.css'

const Spacer = require('react-spacer');

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here 
    // is better than directly setting `setValue(value + 1)`
}


function CustomerSandwichMenu(props) {
  const { isColorblind, setColorblind } = useContext(UserContext)
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

  const menu_object = new Menu(props.json);

  let current_transaction = props.transaction;

  useEffect(() =>{
    updateText(currentPage);
  }, [])
  
  
  const MultilineTextInputExample = () => {

    return (
      <View
        style={{
          borderColor: '#000000',
          borderWidth: 1,
        }}>
        <TextInput
          editable={false}
          multiline={true}
          numberOfLines={20}
          maxLength={40}
          onChangeText={text => updateOrderText(text)}
          value={orderText}
          style={{padding: 10, width: 250}}
        />
      </View>
    );
  };

  

  
  function updateText(currentPage) {

    for (var i = 0; i < 9; i++) {
      switch(i) {
        case 0:
          updateMenuButton1Text(menu_object.sandwich_name_array[i + (currentPage * 9)]);
          break;
        case 1:
          if ((i + (currentPage * 9)) < menu_object.sandwich_name_array.length) {
            updateMenuButton2Text(menu_object.sandwich_name_array[i + (currentPage * 9)]);
          }
          else {
            updateMenuButton2Text(null);
          }
          break;
        case 2:
          if ((i + (currentPage * 9)) < menu_object.sandwich_name_array.length) {
            updateMenuButton3Text(menu_object.sandwich_name_array[i + (currentPage * 9)]);
          }
          else {
            updateMenuButton3Text(null);
          }
          break;
        case 3:
          if ((i + (currentPage * 9)) < menu_object.sandwich_name_array.length) {
            updateMenuButton4Text(menu_object.sandwich_name_array[i + (currentPage * 9)]);
          }
          else {
            updateMenuButton4Text(null);
          }
          break;
        case 4:
          if ((i + (currentPage * 9)) < menu_object.sandwich_name_array.length) {
            updateMenuButton5Text(menu_object.sandwich_name_array[i + (currentPage * 9)]);
          }
          else {
            updateMenuButton5Text(null);
          }
          break;
        case 5:
          if ((i + (currentPage * 9)) < menu_object.sandwich_name_array.length) {
            updateMenuButton6Text(menu_object.sandwich_name_array[i + (currentPage * 9)]);
          }
          else {
            updateMenuButton6Text(null);
          }
          break;
        case 6:
          if ((i + (currentPage * 9)) < menu_object.sandwich_name_array.length) {
            updateMenuButton7Text(menu_object.sandwich_name_array[i + (currentPage * 9)]);
          }
          else {
            updateMenuButton7Text(null);
          }
          break;
        case 7:
          if ((i + (currentPage * 9)) < menu_object.sandwich_name_array.length) {
            updateMenuButton8Text(menu_object.sandwich_name_array[i + (currentPage * 9)]);
          }
          else {
            updateMenuButton8Text(null);
          }
          break;
        case 8:
          if ((i + (currentPage * 9)) < menu_object.sandwich_name_array.length) {
            updateMenuButton9Text(menu_object.sandwich_name_array[i + (currentPage * 9)]);
          }
          else {
            updateMenuButton9Text(null);
          }
          break;
      }
    }

    updateOrderText(current_transaction.to_string());

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
    current_transaction.add_to_transaciton(menu_object.sandwich_id_array[0 + (currentPage * 9)] - 1); 
    console.log(menu_object.sandwich_id_array[0 + (currentPage * 9)]);
    updateOrderText(current_transaction.to_string());
    forceUpdate();
    menu_object.printMenu();
  }

  function menuButton2Click() {
    current_transaction.add_to_transaciton(menu_object.sandwich_id_array[1 + (currentPage * 9)] - 1); 
    updateOrderText(current_transaction.to_string());
    forceUpdate();
  }

  function menuButton3Click() {
    current_transaction.add_to_transaciton(menu_object.sandwich_id_array[2 + (currentPage * 9)] - 1); 
    updateOrderText(current_transaction.to_string());
    forceUpdate();
  }

  function menuButton4Click() {
    current_transaction.add_to_transaciton(menu_object.sandwich_id_array[3 + (currentPage * 9)] - 1); 
    updateOrderText(current_transaction.to_string());
    forceUpdate();
  }

  function menuButton5Click() {
    current_transaction.add_to_transaciton(menu_object.sandwich_id_array[4 + (currentPage * 9)] - 1); 
    updateOrderText(current_transaction.to_string());
    forceUpdate();
  }

  function menuButton6Click() {
    current_transaction.add_to_transaciton(menu_object.sandwich_id_array[5 + (currentPage * 9)] - 1); 
    updateOrderText(current_transaction.to_string());
    forceUpdate();
  }

  function menuButton7Click() {
    current_transaction.add_to_transaciton(menu_object.sandwich_id_array[6 + (currentPage * 9)] - 1); 
    updateOrderText(current_transaction.to_string());
    forceUpdate();
  }

  function menuButton8Click() {
    current_transaction.add_to_transaciton(menu_object.sandwich_id_array[7 + (currentPage * 9)] - 1); 
    updateOrderText(current_transaction.to_string());
    forceUpdate();
  }

  function menuButton9Click() {
    current_transaction.add_to_transaciton(menu_object.sandwich_id_array[8 + (currentPage * 9)] - 1); 
    updateOrderText(current_transaction.to_string());
    forceUpdate();
  }

  function nextButtonClick() {
    var new_page = currentPage + 1;
    updatePage(new_page);
    console.log(currentPage);
    updateText(new_page);
  }

  function previousButtonClick() {
    var new_page = currentPage - 1
    updatePage(new_page);
    console.log(currentPage);
    updateText(new_page);
  }

  const [message, setMessage] = useState("");

  function TestStatus() {
    var url = "http://localhost:3001";
    var test = "inventory";

    fetch(`${url}/api?test=${test}`)
    fetch(url, {body: "param1,param2,param3"})
    .then((res) => res.json())
    .then((data) => setMessage(data.message));

    console.log(message)
  }

  const descriptions = [
    "Grilled Patty on Texas Toast topped with Gig-em sauce, Grilled Onions, and American Cheese",
    "Chicken Tenders on a Toasted Bun topped with Gig-em sauce, Grilled Onions, and American Cheese",
    "Served with Lettuce, Tomato, Pickles, and Cheese",
    "Old fashioned American Grilled Cheese on Texas Toast",
    "Grilled Patty on Texas Toast topped with Gig-em sauce, Grilled Onions, and American Cheese",
    "Chicken Tenders on a Toasted Bun topped with Gig-em sauce, Grilled Onions, and American Cheese",
    "Served with Lettuce, Tomato, Pickles, and Cheese",
    "Old fashioned American Grilled Cheese on Texas Toast",
    "Grilled Patty on Texas Toast topped with Gig-em sauce, Grilled Onions, and American Cheese",
    "Chicken Tenders on a Toasted Bun topped with Gig-em sauce, Grilled Onions, and American Cheese",
    "Served with Lettuce, Tomato, Pickles, and Cheese",
    "Old fashioned American Grilled Cheese on Texas Toast"
  ]

  const images = [
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/013/442/172/non_2x/fast-food-sandwich-on-transparent-background-free-png.png"
  ]

  const functions = [
    menuButton1Click,
    menuButton2Click,
    menuButton3Click,
    menuButton4Click,
    menuButton5Click,
    menuButton6Click,
    menuButton7Click,
    menuButton8Click,
    menuButton9Click
  ]

  const texts = [
    menuButton1Text,
    menuButton2Text,
    menuButton3Text,
    menuButton4Text,
    menuButton5Text,
    menuButton6Text,
    menuButton7Text,
    menuButton8Text,
    menuButton9Text
  ]

  function CustomerMenuItem(props) {
    const index = props.index;
    const name = menu_object.sandwich_name_array[index + (currentPage * 9)];
    const price = menu_object.sandwich_price_array[index + (currentPage * 9)];
    const description = descriptions[index + (currentPage * 9)];
    const img = images[index + (currentPage * 9)];
    const click = functions[index];
    const text = texts[index];

    return(
        <div class="customer-container">
            <div class="customer-image"> 
              <img src={img}/>
            </div>
            <div class={`customer-text ${isColorblind ? "colorblind" : ""}`}>
              Item name: {name}<br/>
              Item price: {price}<br/>
              Item description: {description}<br/>
            </div>
            <div class="customer-button">
              <Button onClick={click}>{text}</Button>
            </div>
        </div>
    )
  }
  
  return (
    <div className="logo-background">
      <div class="menu-buttons">
      <div class="center">
        <CustomerMenuItem index={0}/>
        <CustomerMenuItem index={1}/>
        <CustomerMenuItem index={2}/>
      </div>
      <div class="center">
        <CustomerMenuItem index={3}/>
        <CustomerMenuItem index={4}/>
        <CustomerMenuItem index={5}/>
      </div>
      <div class="center">
        <CustomerMenuItem index={6}/>
        <CustomerMenuItem index={7}/>
        <CustomerMenuItem index={8}/>
      </div>
      <div class="button-container">
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

  export default CustomerSandwichMenu;