import React, { useState, useEffect } from "react";
import Menu from "../HelperClasses/Menu"
import {View, TextInput} from 'react-native';
import styled from "styled-components";

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
          <Button onClick={TestStatus}>Test</Button>
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