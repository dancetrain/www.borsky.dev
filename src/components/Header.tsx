import React from "react";
import TopNavMenu from "./TopNavMenu";
import { Link } from "gatsby";

type HeaderProps = {
  style?: React.CSSProperties;
};

const headerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "0 2rem",
};

const divStyle: React.CSSProperties = {
  lineHeight: "3rem",
};

const headerDark: React.CSSProperties = {
  background: "#343a40",
  color: "#e7e7e7",
};

const Header: React.FC<HeaderProps> = ({ style }) => {
  return (
    <header style={{ ...headerStyles, ...headerDark, ...style }}>
      <div style={divStyle}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          Pavel Borsky
        </Link>
      </div>
      <div>
        <TopNavMenu style={divStyle} />
      </div>
    </header>
  );
};
export default Header;
