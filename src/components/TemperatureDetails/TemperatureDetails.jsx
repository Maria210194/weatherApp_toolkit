import React from "react";
import "../TemperatureDetails/TemperatureDetails.scss";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { FaTemperatureHigh } from "react-icons/fa";
import { FiWind, FiSunset } from "react-icons/fi";
import { BsFillSunFill } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";

import { formatToLocalTime } from "../../store/features/weatherSlice";

const TemperatureDetails = ({ weather }) => {
  return (
    <>
      <div className="detailsBox">
        <p>{weather?.weather[0].description}</p>
      </div>
      <div className="bigDetails">
        <img
          src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
          alt="meteo"
        />
        <p className="gradesToday">{weather?.main.temp.toFixed()}°</p>
        <div className="todayBox">
          <div className="todayInfo">
            <WiHumidity />
            Humidity:
            <span className="realFeel">
              {weather?.main.humidity.toFixed()}%
            </span>
          </div>

          <div className="todayInfo">
            <FiWind />
            Wind:
            <span className="realFeel">
              {" "}
              {weather?.wind.speed.toFixed()} km/h
            </span>
          </div>
        </div>
      </div>
      <div className="sunRise">
        <BsFillSunFill />
        <p style={{ margin: "0", paddingLeft: "1%" }} className="">
          Sunrise:{" "}
          <span>{formatToLocalTime(+weather?.sys?.sunrise, "hh:mm a")}</span>
        </p>
        <p className="separator">|</p>

        <FiSunset />
        <p>
          Sunset:{" "}
          <span>{formatToLocalTime(+weather?.sys?.sunset, "hh:mm a")}</span>
        </p>
        <p className="separator">|</p>

        <ArrowUpOutlined />
        <p>
          High: <span>{weather?.main.temp_max.toFixed()}°</span>
        </p>
        <p className="separator">|</p>

        <ArrowDownOutlined />
        <p>
          Low: <span>{weather?.main.temp_min.toFixed()}°</span>
        </p>
      </div>
    </>
  );
};

export default TemperatureDetails;
