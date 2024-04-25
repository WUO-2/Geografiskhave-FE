import React from "react";
import Button from "../../shared/buttons/button";
import "./wrong.scss";

const Wrong = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="Wrong">
      <div className="Wrong_Wrapper">
        <div className="Wrong_Wrapper_Info">
          <h1 className="Wrong_Wrapper_Info_Title">Øv!</h1>
          <p className="Wrong_Wrapper_Info_Paragraph">Forkert svar</p>
        </div>
        <div className="Wrong_Wrapper_Button">
          <Button
            text="Prøv igen"
            size="small"
            color="green"
            onClick={() => onClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default Wrong;
