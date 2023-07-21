import React from "react";
import useTheme from "../../hooks/useTheme";
import "./styles.css";
const Input = ({ label, ...rest }) => {
 const { dark } = useTheme();
 return (
  <div className="custom-input-container">
   <label id="custom-input-label" className={dark && "white-text"}>
    {label}
   </label>
   <input id={"custom-input"} {...rest} className={dark ? `${rest.className}  white-text` : rest.className} />
  </div>
 );
};

export default Input;
