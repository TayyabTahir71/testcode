import { Button } from "@mui/material";
import React from "react";

const Index = ({ title, type = "primary", ...rest }) => {
 return (
  <Button {...rest} id={type === "primary" ? "custom-button-primary" : "custom-button-secondary"}>
   {title}
  </Button>
 );
};

export default Index;
