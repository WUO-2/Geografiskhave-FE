import "./prize.scss";
import { IPrize } from "../../interfaces/IPrize";
import Mønt from "../../assets/Mønt.png";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/store";


const Prize = ({ name, price, imageUrl, description }: IPrize) => {
  const {authStore} = useStore();
  
  const getCoinText = (price: number) => {
    return price > 0 ? price.toString() + " Eventyrmønter" : "Gratis præmie";
  };

  const navigate = useNavigate();

  const handlePay = () => {
    authStore.setSelectedItem(
      {
        name: name,
        price: price,
        imageUrl: imageUrl,
        description: description,
      }
    )
    navigate("/pay");
  }

  

  return (
    <div onClick={handlePay} className="Prize" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="Prize_Info">
        {price > 0 && (
          <div className="Prize_Info_CoinContainer">
            <img src={Mønt} alt="mønt" />
          </div>
        )}
        <div className="Prize_Info_Text">
          <p className="Prize_Info_Text_Title">{name}</p>{" "}
          <p className="Prize_Info_Text_Price">{getCoinText(price)}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Prize;
