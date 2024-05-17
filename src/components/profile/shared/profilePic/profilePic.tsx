import { IProfileImage } from "../../../../interfaces/IProfileImage";
import "./profilePic.scss";
import edit from "../../../../assets/icons/pencil.svg";

const profilePic = ({ imgSrc, alt, onClick, editable }: IProfileImage) => {
  return (
    <div className="ProfilePic_Container">
      <img
        src={imgSrc}
        alt={alt}
        onClick= {onClick}
        className="ProfilePic"
      />
      {editable && (
        <div className="ProfilePic_Overlay">
          <img src={edit} alt="edit" />{" "}
        </div>
      )}
    </div>
  );
};

export default profilePic;
