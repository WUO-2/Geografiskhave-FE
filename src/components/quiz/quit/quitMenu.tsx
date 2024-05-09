import React from "react";
import Button from "../../shared/buttons/button";
import "./quitMenu.scss";
import {IQuit} from "../../../interfaces/IQuit"

const QuitMenu = ({forsæt, start_forfra, afslut}: IQuit) => {
  return (
    <div className="QuitMenu">
      <div className="QuitMenu_Wrapper">
        <div className="QuitMenu_Wrapper_Button">
          <Button
            text="Forsæt"
            size="small"
            color="orange"
            onClick={() => forsæt()}
          />
          <Button
            text="Start forfra"
            size="small"
            color="green"
            onClick={() => start_forfra()}
          />
          <Button
            text="Afslut"
            size="small"
            color="green"
            onClick={() => afslut()}
          />
        </div>
      </div>
    </div>
  );
};

export default QuitMenu;