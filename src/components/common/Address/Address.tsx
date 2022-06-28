import React from 'react';
import navigateIcon from "../../../Images/navigateIcon.svg";
import metroIcon from "../../../Images/metroIcon.svg";
import style from "./Address.module.scss";

const Address = () => {
  return (
    <div className={style.addressBlock} style={{display: "flex", flexDirection: "row"}}>
      <img className={style.navigateIcon} src={navigateIcon} alt={"navigateIcon"}/>
      <p className={style.textStyle} >Минск, ул. Чюрлёниса, 6.</p>
      <img className={style.metroIcon} src={metroIcon} alt={"metroIcon"}/>
      <p>Малиновка</p>
    </div>
  );
};

export default Address;