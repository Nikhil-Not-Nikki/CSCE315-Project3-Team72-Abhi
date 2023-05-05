import React from 'react';
import { Link } from 'react-router-dom'
import './button.css'
import styled from "styled-components";

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
  font-size: small;
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

export default Button