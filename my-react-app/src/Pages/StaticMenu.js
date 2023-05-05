import React, { useState, useEffect, useContext } from "react";
import Menu from "../HelperClasses/Menu"
import { UserContext } from '../App'
import './StaticMenu.css'
const Spacer = require('react-spacer');

function getBasketTuple(menu_object) {
    const tupleArray = [];
    for (let i = 0; i < menu_object.basket_id_array.length; i++) {
      tupleArray.push([menu_object.basket_id_array[i], menu_object.basket_name_array[i], menu_object.basket_price_array[i]]);
    }
    return tupleArray;
  }

function getBurgerTuple(menu_object) {
    const tupleArray = [];
    for (let i = 0; i < menu_object.burger_id_array.length; i++) {
      tupleArray.push([menu_object.burger_id_array[i], menu_object.burger_name_array[i], menu_object.burger_price_array[i]]);
    }
    return tupleArray;
  }

function getSandwichTuple(menu_object) {
    const tupleArray = [];
    for (let i = 0; i < menu_object.sandwich_id_array.length; i++) {
      tupleArray.push([menu_object.sandwich_id_array[i], menu_object.sandwich_name_array[i], menu_object.sandwich_price_array[i]]);
    }
    return tupleArray;
  }

function getSweetsTuple(menu_object) {
    const tupleArray = [];
    for (let i = 0; i < menu_object.sweets_id_array.length; i++) {
      tupleArray.push([menu_object.sweets_id_array[i], menu_object.sweets_name_array[i], menu_object.sweets_price_array[i]]);
    }
    return tupleArray;
  }

function getExtrasTuple(menu_object) {
    const tupleArray = [];
    for (let i = 0; i < menu_object.extras_id_array.length; i++) {
      tupleArray.push([menu_object.extras_id_array[i], menu_object.extras_name_array[i], menu_object.extras_price_array[i]]);
    }
    return tupleArray;
  }


function StaticMenu(props) 
{
    const { isColorblind, setColorblind } = useContext(UserContext)

    const menu_object = new Menu(props.json);
    
    const baskets = getBasketTuple(menu_object);
    const burgers = getBurgerTuple(menu_object);
    const sandwich = getSandwichTuple(menu_object);
    const sweets = getSweetsTuple(menu_object);
    const extras = getExtrasTuple(menu_object);


    return (
            <div class = {`body ${isColorblind ? "colorblind" : ""}`}>
                <div class = {`row ${isColorblind ? "colorblind" : ""}`}>
                    <div class = {`section left ${isColorblind ? "colorblind" : ""}`}>
                        <div class = "block1">
                            <div class = {`title ${isColorblind ? "colorblind" : ""}`}> 
                                <h1 class={`${isColorblind ? "colorblind" : ""}`}>Burgers</h1>
                                <p class = {`description ${isColorblind ? "colorblind" : ""}`}> 100% Beef Burgers, All-American Grown. Combos include and a small fountain drink.</p>
                            </div>
                            <div class ={`panel ${isColorblind ? "colorblind" : ""}`}>
                                    {
                                        burgers.map((str)  => (
                                            <p class = 'meal'>{str[1]} ...... {str[2]}</p>
                                        ))
                                    }
                            </div>
                        </div>

                        <div class = "block2">
                            <div class = {`title ${isColorblind ? "colorblind" : ""}`}> 
                                <h1>Baskets</h1>
                            </div>
                            <div class ={`panel ${isColorblind ? "colorblind" : ""}`}>
                                    {
                                        baskets.map((str)  => (
                                            <p>{str[1]} ...... {str[2]}</p>
                                        ))
                                    }
                                <p class = {`description ${isColorblind ? "colorblind" : ""}`}>All combos include a fountain drink.</p>
                            </div>
                        </div>
                    </div>

                    <div class = 'section middle'>
                            <div class = 'midblockmisc'>
                                <img src={'https://images.sirved.com/ChIJlb7tVZiDRoYRJ6E4_nDMyKY/YAsfUc3NUm.png'}/>
                            </div>
                            <div class = "block3">
                                <div class = {`title ${isColorblind ? "colorblind" : ""}`}> 
                                    <h1>Sandwiches</h1>
                                    <p class = {`description ${isColorblind ? "colorblind" : ""}`}> Tasty Sandwiches even Reveille will bark for. All Combos include a small fountain drink.</p>
                                </div>
                                <div class ={`panel ${isColorblind ? "colorblind" : ""}`}>
                                        {sandwich.map((str)  => (
                                            <p class = 'meal'>{str[1]} ...... {str[2]}</p>
                                        ))}
                                </div>
                            </div>
                                
                    </div>

                    <div class = 'section right'>
                        <div class = "block4">
                            <div class = {`title ${isColorblind ? "colorblind" : ""}`}> 
                                <h1>Shakes 'N Sweets</h1>
                                <p class = {`description ${isColorblind ? "colorblind" : ""}`}>Sweets come in many forms, Just like Aggies do.</p>
                            </div>
                            <div class ={`panel ${isColorblind ? "colorblind" : ""}`}>
                                {
                                    sweets.map((str)  => (
                                        <p class = 'meal'>{str[1]} ...... {str[2]}</p>
                                    ))
                                }
                            </div>
                        </div>

                        <div class = "block5">
                            <div class = {`title ${isColorblind ? "colorblind" : ""}`}> 
                                <h1>Extras</h1>
                            </div>
                            <div class ={`panelextras ${isColorblind ? "colorblind" : ""}`}>
                                {
                                    extras.map((str)  => (
                                        <p>{str[1]} ...... {str[2]}</p>
                                    ))
                                }
                                <p class = {`description ${isColorblind ? "colorblind" : ""}`}>For those who want a little extra~</p>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>

                

    );

}

export default StaticMenu;

