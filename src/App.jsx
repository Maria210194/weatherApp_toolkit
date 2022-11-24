import { useState, useEffect } from "react";

import "antd/dist/antd.css";
import { Layout } from "antd";
const { Content } = Layout;

import Cities from "./components/Cities";
import Inputs from "./components/Inputs";
import Location from "./components/Location/Location";
import TemperatureDetails from "./components/TemperatureDetails";
import Forecast from "./components/Forecast";

import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherAction } from "./store/features/weatherSlice";

function App() {
  const [city, setCity] = useState("Barcellona");
  const state = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherAction(city));
    setCity("");
  }, [dispatch]);

  const { weather, error } = state;

  console.log(state);

  return (
    <Layout className="App">
      <Content>
        <div className="container">
          <Cities city={city} />
          <Inputs city={city} setCity={setCity} />
          {weather && !error ? (
            <div>
              <Location weather={state.weather} />
              <TemperatureDetails weather={state.weather} />
              <Forecast dailyForecast={state.weather?.dailyForecast} />
            </div>
          ) : (
            <h1 className="notFound">City not found</h1>
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default App;
