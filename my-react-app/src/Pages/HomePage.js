import './HomePage.css';
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../App"

const WEATHER_API_KEY = "8bcd0e91ddae6063e218fd0e037293f1";

const weatherResponses = [
    "clear, a perfect day for Rev's American Grill!",
    "a little rainy, but water never hurt anyone, let's go to Rev's!",
    "a mystery. Either way, head to Rev's for a burger!",
    "cloudy, so come inside and enjoy a burger at Rev's!"
];

function HomePage(props) {
    const [responseIndex, setResponseIndex] = useState(2);
    const { isColorblind, setColorblind } = useContext(UserContext);
    navigator.geolocation.getCurrentPosition((pos) => {
            let lat = pos.coords.latitude;
            let lon = pos.coords.longitude;

            let weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
            axios.get(weather_api_url)
                .then(function (resp) {
                    if(resp.data.weather[0].main === "Rain") {
                        setResponseIndex(1);
                    }
                    else if(resp.data.weather[0].main === "Clear") {
                        setResponseIndex(0);
                    }
                    else if(resp.data.weather[0].main == "Clouds") {
                        setResponseIndex(3);
                    }
                });
        }
    );

    return (
        <div className="logo-background">
            <div class="wrapper">
                <div class="home-page-content">
                    <div class={`init-greeting ${isColorblind ? 'colorblind' : ''}`}>
                        Welcome To Rev's American Grill
                    </div>
                    <div class={`weather-info ${isColorblind ? 'colorblind' : ''}`}>
                        The weather is looking <span class="weather-data">{weatherResponses[responseIndex]}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;