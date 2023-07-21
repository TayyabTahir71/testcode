import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import ThemeContext from "../context/ThemeContext";
import useMediaQuery from "@mui/material/useMediaQuery";

const Public = ({ children }) => {
 const matches = useMediaQuery("(max-width:768px)");
 const { dark } = useContext(ThemeContext);
 return (
  <>
   <div className={dark ? "home-container dark-bg" : "home-container"}>
    <Header />
    {children}
    <Outlet />
   </div>
   {matches && <Footer />}
  </>
 );
};

export default Public;
