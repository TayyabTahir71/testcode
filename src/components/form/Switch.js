import * as React from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "./styles.css";
const CustomSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(({ theme }) => ({
 width: 39,
 height: 22,
 padding: 0,
 "& .MuiSwitch-switchBase": {
  padding: 0,
  margin: 2,
  transitionDuration: "300ms",
  "&.Mui-checked": {
   transform: "translateX(16px)",
   color: "#fff",
   "& + .MuiSwitch-track": {
    backgroundColor: "#4D54FD",
    opacity: 1,
    border: 0,
   },
   "&.Mui-disabled + .MuiSwitch-track": {
    opacity: 0.5,
   },
  },
  "&.Mui-focusVisible .MuiSwitch-thumb": {
   color: "#33cf4d",
   border: "6px solid #fff",
  },
  "&.Mui-disabled .MuiSwitch-thumb": {
   color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
  },
  "&.Mui-disabled + .MuiSwitch-track": {
   opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
  },
 },
 "& .MuiSwitch-thumb": {
  boxSizing: "border-box",
  width: 18,
  height: 18,
 },
 "& .MuiSwitch-track": {
  borderRadius: 26 / 2,
  backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
  opacity: 1,
  transition: theme.transitions.create(["background-color"], {
   duration: 500,
  }),
 },
}));

const Index = ({ label, dark, ...rest }) => {
 return <FormControlLabel control={<CustomSwitch sx={{ m: 1 }} {...rest} />} label={<span className={dark ? "switch-label switch-label-dark" : "switch-label"}>{label}</span>} />;
};

export default Index;

export const SwitchBase = ({ ...rest }) => <CustomSwitch sx={{ m: 1 }} {...rest} />;
