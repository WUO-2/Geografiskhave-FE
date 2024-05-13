import { IBadge, IBadges } from "../../interfaces/IUser";
import "./badge.scss";
import React from "react";

const Badge = ({ completed, badge }: IBadges) => {
  return (
    <div className="Badge">
      <img
        className={`Badge_Image ${completed ? "Badge_Completed" : ""}`}
        src={badge.imageURL}
        alt={"Badge"}
      />
    </div>
  );
};

export default Badge;
