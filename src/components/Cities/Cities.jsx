import React from "react";
import "../Cities/cities.scss";
import { Button, Menu } from "antd";
import { cities } from "../../cities";
import { useDispatch } from "react-redux";
import { fetchWeatherAction } from "../../store/features/weatherSlice";

const Cities = (city) => {
  const dispatch = useDispatch();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      className="cities"
      defaultSelectedKeys={["1"]}
      items={cities.map((city, index) => {
        return {
          key: index,
          label: (
            <Button
              onClick={() => dispatch(fetchWeatherAction(city))}
              className="singleCity"
              type="ghost"
            >
              {city}
            </Button>
          ),
        };
      })}
    />
  );
};

export default Cities;
