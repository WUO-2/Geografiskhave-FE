import "./splash.scss";
import React, {useEffect, useState} from "react";
import Logo from "../../assets/logo/Geografisk_Have_Logo.svg"

const Splash = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`Splash ${loaded ? 'loaded' : ''}`}>
        <img className="logo" src={Logo} alt="Geografisk Have Logo" />
    </div>
  );
};



export default Splash;