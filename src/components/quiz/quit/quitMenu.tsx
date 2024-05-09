import React from "react";
import Button from "../../shared/buttons/button";
import "./quitMenu.scss";

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
            onClick={() => console.log("bob")}
          />
          <Button
            text="Afslut"
            size="small"
            color="green"
            onClick={() => console.log("ton")}
          />
        </div>
      </div>
    </div>
  );
};

export default QuitMenu;