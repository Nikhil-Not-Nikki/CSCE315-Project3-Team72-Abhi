import React, { useState, useEffect } from "react";
import Menu from "../HelperClasses/Menu"
import {View, TextInput} from 'react-native';
import styled from "styled-components";
import Button from "../HelperClasses/Button"

const Spacer = require('react-spacer');

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here 
    // is better than directly setting `setValue(value + 1)`
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


function EditTransaction(props) {
    const [currentPage, updatePage] = useState(0);
    const [orderText, updateOrderText] = useState("Current Order");
    //const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
    const forceUpdate = useForceUpdate();
  
    const menu_object = new Menu(props.json);

    let current_transaction = props.transaction;
  
    useEffect(() =>{
      updateText();
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
  
    
    function updateText() {
      updateOrderText(current_transaction.to_string());
      forceUpdate();
    }
  
    //updateText();

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

    function CompleteTransaction() {
      var url = "http://localhost:3001";

      var current_string = "";
      for (var i = 0; i < current_transaction.get_size(); i++) {
        current_string += current_transaction.item_amounts[i] + " ";
        current_string += current_transaction.item_names[i] + "|";
      }
      current_string += current_transaction.get_total() + "|";
      current_string += current_transaction.employee_name;
      console.log(current_string);

      clearTransaction();

    }

    function clearTransaction() {
      current_transaction.clear_transaction();
      updateOrderText(current_transaction.to_string());
    }

    return (
      <div class="logo-background">
        <div class="menu-buttons">
        <div class="center">
          <Button onClick={CompleteTransaction}>Complete Transaction</Button>
          <Button onClick={clearTransaction}>Clear Transaction</Button>
        </div>
        <Spacer grow='0.1' />
        <MultilineTextInputExample value={orderText} onChange={e => updateOrderText(e.target.value)}/>
      </div>
      <div>
        
      </div>
      </div>
    );
  }

  export default EditTransaction;