import React from 'react';

import "./PrizePage.scss";
import Coin from "../../assets/Mønt.png"
import BadgeTest from "../../assets/images/badges/BadgeProfil.png"
import DefButton from "../../components/shared/buttons/button"

import Confetti from 'react-confetti';

import { useNavigate } from 'react-router-dom';

import { useStore } from "../../stores/store";

function PrizePage() {
  
  const navigate = useNavigate();
  const { treasureStore, authStore } = useStore();

  const handleUpdatePoints = async (points: number) => {
    const response = await treasureStore.updatePoints(authStore.user!.id, points);
    console.log(response.totalPoints);

  }

  return (
    <div className='prizePage'>
        <Confetti
        numberOfPieces={100}
        gravity={0.025}/>
        <h2>
            Tillykke!
        </h2>
        <p className='underTitle'>
            Nyt badge
        </p>
        <img className='badge' src={BadgeTest} alt="" />
        <h2>
            Skatteeventyrer
        </h2>
        <p className='underTitle'>
            Godt gådt! Du har gennemført din første skattejagt gennem haven.
        </p>

        <div className='yellowBubble bold'>
            Plus <img className='coin' src={Coin} alt="" /> 55 Eventyrmønter og en hemmelig præmie
        </div>

        <DefButton
        text='Indløs præmie'
        onClick={()=>{
            handleUpdatePoints(55);
            navigate("/profile");
            }}/>
    </div>
  );
}

export default PrizePage;