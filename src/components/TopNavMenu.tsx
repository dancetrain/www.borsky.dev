import React from "react";

const topNavMenuStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "right",

  margin: "0",
  padding: "0",
  listStyle: "none"
}

const liStyle: React.CSSProperties = {
  padding: "0 0 0 1rem"
}

const TopNavMenu: React.FC = () => {
  return (
      <ul style={topNavMenuStyles}>
        <li style={liStyle}>Articles</li>
        <li style={liStyle}>About</li>
        <li style={liStyle}>Tools</li>
      </ul>
  )
};
export default TopNavMenu;
