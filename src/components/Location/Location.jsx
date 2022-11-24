import React from "react";
import "../Location/location.scss";

function Location({ weather: { name } }) {
  return (
    <>
      <div className="location">
        <p className="city">{`${name}`}</p>
      </div>
    </>
  );
}

export default Location;
