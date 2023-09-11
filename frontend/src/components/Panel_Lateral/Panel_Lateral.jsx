import React from "react";
import RocketLogo from "../../assets/img/ROCKETNETLOGO.png";
import RocketLogo2 from "../../assets/img/ROCKETNET-LOGO2.png";
import "../Panel_Lateral/Panel_Lateral.css";

function Panel_Lateral() {
  return (
    <div className="panel-lateral">
      <img className="logo" src={RocketLogo} alt="Logo RocketNet" />
      <img className="logo2" src={RocketLogo2} alt="Logo RocketNet 2"/>
    </div>
  );
}

export default Panel_Lateral;
