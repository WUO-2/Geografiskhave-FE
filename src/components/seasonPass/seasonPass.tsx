import "./seasonPass.scss";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";

const SeasonPass = () => {
  const { authStore } = useStore();
  const [daysLeft, setDaysLeft] = useState<number>();
  useEffect(() => {
    const expiration = new Date(authStore.seasonPass); 
    const today = new Date();
    const difference = expiration.getTime() - today.getTime();
    console.log(difference); // Difference in milliseconds
    const daysLeft = Math.ceil(difference / (1000 * 3600 * 24)); // Convert milliseconds to days

    setDaysLeft(daysLeft);
  }, [authStore.seasonPass]);

  
  return (
    <>
      <div className="SeasonPass">
        <div
          className={`SeasonPass_Header ${daysLeft! < 31 ? "Warning" : ""} ${
            daysLeft! < 0 ? "Expired" : ""
          }`}
        >
          <h1>Årskort</h1>
        </div>
        <div className="SeasonPass_Info">
          <div className="SeasonPass_Info_Name"> 
            <h2>Navn</h2>
            {authStore.userFirebase?.displayName}
          </div>

          <div className="SeasonPass_Info_Date">
          <h2>Udløbsdato</h2>
          {new Date(authStore.seasonPass).toLocaleDateString('da-DK').replace(/\./g, '/')}
          <br />
            {daysLeft} dage tilbage</div>
        </div>
      </div>
    </>
  );
};

export default SeasonPass;
