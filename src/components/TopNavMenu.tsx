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
  padding: "0 0.5rem"
}

const TopNavMenu: React.FC<{style?: React.CSSProperties}> = ({style}) => {
  return (
      <ul style={{...topNavMenuStyles,...style}}>
        <li style={liStyle} className={"menu-link"}>
          <Link to={"/"}>Articles</Link>
        </li>
        <li style={liStyle} className={"menu-link"}>
          <Link to={"/about"}>About</Link>
        </li>
        <li style={liStyle} className={"menu-link"}>
          <Link to={"/tools"}>Tools</Link>
        </li>
        <li style={liStyle} className={"menu-link"}>
          <Link to={"/games"}>Games</Link>
        </li>
      </ul>
  )
};
export default TopNavMenu;
