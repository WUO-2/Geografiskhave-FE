import React from "react";
import { observer } from "mobx-react-lite";
import "./HomePage.scss";
import FrontpageProfile from "../../components/profile/frontpageProfile/frontpageProfile";
import TreasureHunt from "../../components/shared/treasureHuntHomePage/treasureHunt";
import Card from "../../components/shared/cards/card";
import Ticket from "../../assets/icons/ticket.svg";
import FAQ from "../../assets/icons/FAQ.svg";
import Event from "../../assets/icons/event.svg";
import Button from "../../components/shared/buttons/button";
import Header from "../../components/shared/header/header";
import { getAuth } from "firebase/auth";

const HomePage = () => {
  const auth = getAuth()
  console.log(auth.currentUser?.emailVerified);
  return (
    <>
      <Header currentPage="Hjem" />
      <div className="HomePage">
        <FrontpageProfile />
        <div className="frontpage_content">
          <h2>Start skattejagt</h2>
          <TreasureHunt />
          <div>
            <h2>Praktisk</h2>
            <div className="single-container">
              <Card
                text="Køb billet"
                icon={Ticket}
                link="https://www.place2book.com/da/sw2/sales/39pfs0v0xy"
              />
            </div>
            <div className="double-container">
              <Card
                text="Events"
                icon={Event}
                link="https://geografiskhave.dk/all-events/"
              />
              <Card
                text="FAQ"
                icon={FAQ}
                link="https://geografiskhave.dk/godt-at-vide/"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(HomePage);
