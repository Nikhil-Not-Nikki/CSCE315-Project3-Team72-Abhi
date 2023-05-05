import React, { useState, useContext } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import './RevNavbar.css'
import logo from "./revslogo.png";
import ManagerDropdownItems from "./ManagerItems";
import ServerDropdownItems from "./ServerItems";
import CustomerDropdownItems from "./CustomerItems";
import axios from 'axios';
import TTS from './TTS';
import { UserContext } from '../App'

var BigButtonOn = false;
var toggle = false;

function bigbutton() {
    window.scrollTo(0, 0)
    var bodyRect = document.body.getBoundingClientRect();
    
    var items = Array.prototype.slice.call(
      document.querySelectorAll('*')
    ).map(function(element) {
      var rect=element.getBoundingClientRect();
      return {
        element: element,
        include: (element.tagName === "BUTTON" || element.tagName === "A" || (element.onclick != null) || window.getComputedStyle(element).cursor == "pointer"),
        rect: {left: Math.max(rect.left - bodyRect.x, 0),
               top: Math.max(rect.top - bodyRect.y, 0),
               right: Math.min(rect.right - bodyRect.x, document.body.clientWidth),
               bottom: Math.min(rect.bottom - bodyRect.y, document.body.clientHeight)},
        text: element.textContent.trim().replace(/\s{2,}/g, ' ')
      };
    }).filter(item =>
      item.include && ((item.rect.right - item.rect.left) * (item.rect.bottom - item.rect.top) >= 20));
    
    items = items.filter(x => !items.some(y => x.element.contains(y.element) && !(x == y)));
    
    items.forEach(function(items) {
        console.log('item:', items);
        try {
            if(BigButtonOn === false){
                items.element.style.transform = 'scale(1.3)';
               console.log("BigButtonOn: HEHEHEHHEHEHE");
            } 
            if(BigButtonOn === true){
                items.element.style.transform = 'scale(1.0)';
            }
          } catch (error) {
            console.error('An error occurred for:',items,"  error: ", error);
          }
          finally {
            console.log('Completed successfully');
          }
      });
      BigButtonOn = !BigButtonOn;
}

function RevNavbar() {
    const { isColorblind, setColorblind } = useContext(UserContext);

    const WEATHER_API_KEY = "8bcd0e91ddae6063e218fd0e037293f1";

  const [click, setClick] = useState(false)
  const [weatherStatus, setWeatherStatus] = useState("a mystery");
  const [temperature, setTemperature] = useState(-1);

  const changeClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const calculateTemperature = (kelvin) => {
      setTemperature(Number((kelvin - 273.15) * (9/5) + 32).toFixed(2));
  }

  navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        let weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
        axios.get(weather_api_url)
            .then(function (resp) {
                calculateTemperature(resp.data.main.temp);
                setWeatherStatus(`${resp.data.weather[0].main}, ${temperature}`);
            });
    }
  );

  return (
      <>
          <section>
              <nav className={`navbar navbar-expand-lg bg-body-tertiary ${isColorblind ? "colorblind" : ""}`}>
                    <div class="container-fluid">
                        <Link to='/' className='logo'><i className='fas fa-home' />
                            <img scr={logo}></img>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <Link to="/" className={`${isColorblind ? "colorblind" : "nav-link"}`} onClick={closeMobileMenu}> Home </Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/static-menu" className={`${isColorblind ? "colorblind" : "nav-link"}`} onClick={closeMobileMenu}> Menu </Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a className={`dropdown-toggle ${isColorblind ? "colorblind" : "nav-link"}`} role="button" data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        Customers
                                    </a>
                                    <ul className="dropdown-menu">
                                        {CustomerDropdownItems.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link className='dropdown-item menu-items' to={item.path} onClick={() => setClick(false)}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a className={`dropdown-toggle ${isColorblind ? "colorblind" : "nav-link"}`} role="button" data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        Servers
                                    </a>
                                    <ul className="dropdown-menu">
                                        {ServerDropdownItems.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link className='dropdown-item menu-items' to={item.path} onClick={() => setClick(false)}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a className={`dropdown-toggle ${isColorblind ? "colorblind" : "nav-link"}`} role="button" data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        Managers
                                    </a>
                                    <ul className="dropdown-menu">
                                        {ManagerDropdownItems.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link className='dropdown-item menu-items' to={item.path} onClick={() => setClick(false)}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>

                                <li class="nav-item dropdown">
                                    <a className={`dropdown-toggle ${isColorblind ? "colorblind" : "nav-link"}`} role="button" data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        Accessibility
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button className = 'dropdown-item btn-menu' onClick={bigbutton}>Big-Button Mode</button>
                                            <button className = 'dropdown-item btn-menu' onClick={() => setColorblind(!isColorblind)}>Color Blind Mode</button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div class="other-options">
                            <div class={`weather-text ${isColorblind ? "colorblind" : ""}`}>
                                The weather near you is <span class="weather-data">{weatherStatus}</span>ºF
                            </div>
                            <TTS />
                            <button class=" btn btn-secondary btn-lg login-button">Login</button>
                        </div>

                </div>
              </nav>
          </section>
      </>
  )
}

export default RevNavbar;