import React from "react";
import Button from "../../shared/buttons/button";
import "./quitMenu.scss";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const QuitMenu = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="QuitMenu">
      <div className="QuitMenu_Wrapper">
        <div className="QuitMenu_Wrapper_Button">
          <Button
            text="Forsæt"
            size="small"
            color="orange"
            onClick={() => onClick()}
          />
          <Button
            text="Start forfra"
            size="small"
            color="green"
            onClick={() => navigate("/skattejagt")}
          />
          <Button
            text="Afslut"
            size="small"
            color="green"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default QuitMenu;
