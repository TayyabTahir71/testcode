import React, { useState, useEffect, useRef } from "react";
import Icons from "../../assets/icons";
import { Box } from "@mui/material";
const { UpIcon, DownIcon } = Icons;
function DropdownButton({ icon, label, dark, value, children, onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      const specificNode = document.querySelector(".switch-label");
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.tagName !== specificNode.tagName) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);



  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <Box sx={{ ...styleSheet.filterButton, ...styleSheet.flex }} style={{ gap: 18 }} onClick={() => setIsOpen(!isOpen)}>
        <Box onClick={onClick} sx={{ ...styleSheet.flex, justifyContent: "flex-start" }} style={{ gap: 8.8 }}>
          {icon && <img src={icon} alt='' />}
          <span style={styleSheet.label}>
            {label} <span className={dark ? "switch-label switch-label-dark" : "switch-label"}>{value}</span>
          </span>
        </Box>
        {label !== "Reset all" && (
          <Box>
            <img alt='' src={isOpen ? UpIcon : DownIcon} />
          </Box>
        )}
      </Box>

      {isOpen && label !== "Reset all" && <Box sx={styleSheet.dropdownContainer}>{children}</Box>}
    </div>
  );
}

export default DropdownButton;

const styleSheet = {
  flex: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 },
  button: { px: "20px", py: "2px", pr: "0px", border: " 1px solid #ececf0", borderRadius: "10px" },
  filterButton: { px: "12px", py: "9px", border: " 1px solid #ececf0", borderRadius: "10px", cursor: "pointer" },
  label: { fontStyle: "normal", fontWeight: 600, fontSize: "12px", lineHeight: "20px", letterSpacing: "-0.01em", color: "#878F9A" },
  dropdownContainer: {
    background: "#FFFFFF",
    padding: "12px",
    minWidth: "183px",
    minHeight: "130px",
    position: "absolute",
    zIndex: 9999,
    boxShadow: "0px 32px 72px -8px rgba(91, 95, 99, 0.08)",
    borderRadius: "12px",
  },
};
