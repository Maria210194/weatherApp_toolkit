import React from "react";
import { Input } from "antd";
import "../Inputs/Inputs.scss";

import { fetchWeatherAction } from "../../store/features/weatherSlice";
import { useDispatch } from "react-redux";

const Inputs = ({ city, setCity }) => {
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      dispatch(fetchWeatherAction(city));
      setCity(" ");
    }
  };
  return (
    <div className="inputBox">
      <div className="inputCity">
        <Input
          placeholder="Search..."
          onKeyPress={(event) => handleSearch(event)}
          onChange={(event) => setCity(event.currentTarget.value)}
          value={city}
        />
      </div>
    </div>
  );
};

export default Inputs;
