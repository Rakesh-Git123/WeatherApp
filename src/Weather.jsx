import "./Weather.css";
import searchicon from "./assets/search.png";
import clear from "./assets/clear.png";
import wind from "./assets/wind.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import rain from "./assets/rain.png";
import haze from "./assets/haze.png";
import snow from "./assets/snow.png";
import thunderstorm from "./assets/thunderstorm.png"
import humidity from "./assets/humidity.png";
import background from "./assets/background.jpeg"
import { useEffect, useState } from "react";
import Loading from "./Loading";


const Weather = () => {
    const [Apidata, setApidata] = useState({});
    const [Fetched, setFetched] = useState(false);
    const [search, Setsearch] = useState("");
    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "11d": thunderstorm,
        "11n": thunderstorm,
        "13d": snow,
        "13n": snow,
        "50d": haze,
        "50n": haze
    }
    const fetchData = async (city) => {

        try {
            if (city === "") {
                alert("Please enter a city")
                return;
            }
            setFetched(false);
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=dd365ea291a16fc307ccbbed50b03524`)
            let data = await res.json();
            if (data.cod === "404") {
                alert("City not found. Please enter a valid city.")
                setFetched(true)
                return;
            }
            setApidata(data);
            Setsearch("");
            setFetched(true);
        }
        catch (err) {
            console.log("Server error");
        }

    }
    useEffect(() => {
        fetchData("New Delhi");
    }, []);

    if (!Fetched) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <div className="weather" style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <div className="search-bar">
                    <input type="text" placeholder="Search" value={search} onChange={(e) => Setsearch(e.target.value)} />
                    <img className="searchimg" src={searchicon} alt="" onClick={() => { fetchData(search) }} />
                </div>
                <img className="weatherimg" src={allIcons[Apidata.weather[0].icon]} alt="Not found" />
                <div className="temprature">
                    <p>{Math.floor(Apidata.main.temp)}</p>
                    <div className="temp1">
                        <p>°C</p>
                        <p>{Apidata.weather[0].main}</p>
                    </div>
                </div>
                <p className="location">{Apidata.name}</p>
                <div className="footer">
                    <div className="footer1">
                        <img className="humidityimg" src={humidity} alt="" />
                        <div className="footer12">
                            <p><b>{Apidata.main.humidity}%</b></p>
                            <p><b>Humidity</b></p>
                        </div>

                    </div>
                    <div className="footer2">
                        <img className="windimg" src={wind} alt="" />
                        <div className="footer21">
                            <p><b>{Apidata.wind.speed} km/h</b></p>
                            <p><b>Wind Speed</b></p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Weather;