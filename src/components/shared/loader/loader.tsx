import React from "react";
import "./loader.scss";
const loader = () => {
  return (
    <div className="Loader">
      <p className="Loader_Text">Loading...</p>
      <div className="Loader_Spinner"></div>
    </div>
  );
};

export default loader;
