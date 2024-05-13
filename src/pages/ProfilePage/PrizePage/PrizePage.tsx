import { EPrizePage } from "../../../interfaces/EProfilePage";
import { useState } from "react";
import Prize from "../../../components/prize/prize";
import toast from "../../../assets/images/Toast.jpg";
import is from "../../../assets/images/is.jpg";
import slikkepind from "../../../assets/images/slikkepinde.jpg";
import kakao from "../../../assets/images/Kakao.jpg";

import "./PrizePage.scss";

const PrizePage = () => {
  const [page, setPage] = useState<EPrizePage>(EPrizePage.PAID);

  //TODO: Should be in store
  const prizes = [
    {
      name: "Skarø is",
      price: 45,
      imageUrl: is,
      description: "Nyd en forfriskende kugle is fra Skarø! Denne lækre præmie gælder for 2x is med én kugle. Præmien kan indløses i Geografisk Haves café, og køb kan ikke fortrydes."
    },
    {
      name: "Klassisk toast",
      price: 35,
      imageUrl: toast,
    },
    {
      name: "Slikkepind",
      price: 0,
      imageUrl: slikkepind,
      description: "Præmien gælder for 2x slikkepind. Den kan kun indløses én gang i Geografisk Haves café, og køb kan ikke fortrydes."
    },
    {
      name: "Kakao",
      price: 0,
      imageUrl: kakao,
    },
  ];

  const handleGetFreePrizes = () => {
    return prizes.filter((prize) => prize.price === 0);
  };

  const handleGetPaidPrizes = () => {
    return prizes.filter((prize) => prize.price > 0);
  };

  return (
    <div className="PrizePage">
      <div className="PrizePage_Interaction">
        <button
          className={`PrizePage_Interaction_Button ${page === EPrizePage.PAID ? "PrizePage_Interaction_Button_Active" : ""}`}
          onClick={() => setPage(EPrizePage.PAID)}
        >
          Brug mønter
        </button>
        <button
          className={`PrizePage_Interaction_Button ${page === EPrizePage.FREE ? "PrizePage_Interaction_Button_Active" : ""}`}
          onClick={() => setPage(EPrizePage.FREE)}
        >
          Præmier
        </button>
      </div>
      <div className="PrizePage_PrizesContainer">
        {page === EPrizePage.PAID &&
          handleGetPaidPrizes().map((prize) => (
            <Prize key={prize.name} {...prize} />
          ))}
        {page === EPrizePage.FREE &&
          handleGetFreePrizes().map((prize) => (
            <Prize key={prize.name} {...prize} />
          ))}
      </div>
    </div>
  );
};

export default PrizePage;
