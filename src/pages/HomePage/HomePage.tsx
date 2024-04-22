import React from "react";
import { observer } from "mobx-react-lite";
import "./HomePage.scss";
import FrontpageProfile from "../../components/profile/frontpageProfile/frontpageProfile";
import TreasureHunt from "../../components/shared/treasureHuntHomePage/treasureHunt";
import Card from "../../components/shared/cards/card"
import Ticket from "../../assets/icons/ticket.svg"
import FAQ from "../../assets/icons/FAQ.svg"
import Event from "../../assets/icons/event.svg"
import Button from "../../components/shared/buttons/button";

const HomePage = () => {
  return (
    <div className="HomePage">
      <FrontpageProfile/>
      <div className="frontpage_content">
        <h2>Start skattejagt</h2>
        <TreasureHunt currentTask={0}/>
        <div>
          <h2>Praktisk</h2>
          <div className="single-container">
            <Card
            text="Priser"
            icon={Ticket}
            link="https://geografiskhave.dk/priser-abningstider/"/>
          </div>
          <div className="double-container">
            <Card
            text="Events"
            icon={Event}
            link="https://geografiskhave.dk/all-events/"/>
            <Card
            text="Godt at vide"
            icon={FAQ}
            link="https://geografiskhave.dk/godt-at-vide/"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(HomePage);
