import "./seasonPass.scss";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";

const SeasonPass = () => {
  const { authStore } = useStore();
const [daysLeft, setDaysLeft] = useState<number>();
    useEffect(() => {
        const expiration = new Date(authStore.seasonPass); // Assuming authStore.seasonPass is in a valid date format
        console.log(expiration);
        const today = new Date();
        console.log(today);
        const difference = expiration.getTime() - today.getTime();
        console.log(difference) // Difference in milliseconds
        const daysLeft = Math.ceil(difference / (1000 * 3600 * 24)); // Convert milliseconds to days
    
        setDaysLeft(daysLeft);
    }, [authStore.seasonPass]);

    // className={`defButton ${size=="small"? "smallBoldText": "bold"} ${size} ${color}`}

  return (
    <>
      <div className="SeasonPass">
        <div className={`SeasonPass_Header ${daysLeft! < 31 ? "Warning" : ""} ${daysLeft! < 0 ? "Expired" : ""}`}><h1>Årskort</h1></div>
        <div className="SeasonPass_Info">{daysLeft}</div>
      </div>
    </>
  );
};

export default SeasonPass;
