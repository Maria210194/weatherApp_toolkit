import React from "react";
import { Row, Col } from "antd";
import "../Forecast/Forecast.scss";

const Forecast = ({ dailyForecast }) => {
  return (
    <>
      <div className="forecastTitle">
        <p>Daily forecast</p>
      </div>
      <hr style={{ margin: "0.2rem 0" }} />
      <Row className="rowForecast">
        {dailyForecast.map((item, index) => (
          <Col className="singleForecast" key={index} span={4}>
            <div className="forecastTitle">
              <p>{item?.title}</p>
            </div>
            <div className="icon-container">
              <img
                className="imgWeather"
                src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt="icon"
              />
            </div>
            <p className="degreeForecast">{`${item?.temp.toFixed()}°`}</p>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Forecast;
