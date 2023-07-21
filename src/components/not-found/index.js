import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const Index = () => {
 const navigate = useNavigate();
 return (
  <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
   <h1>Page Not Found</h1>
   <Button onClick={() => navigate("/")} variant="contained">
    Home
   </Button>
  </div>
 );
};

export default Index;
