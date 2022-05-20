import React from "react";
import { Link } from "gatsby"

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
        <li style={liStyle}>
          <Link to={"/"}>Articles</Link>
        </li>
        <li style={liStyle}>
          <Link to={"/about"}>About</Link>
        </li>
        <li style={liStyle}>
          <Link to={"/tools"}>Tools</Link>
        </li>
        <li style={liStyle}>
          <Link to={"/games"}>Games</Link>
        </li>
      </ul>
  )
};
export default TopNavMenu;
