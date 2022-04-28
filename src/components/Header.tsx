import React from "react";
import TopNavMenu from "./TopNavMenu";

type HeaderProps = {
  style?: React.CSSProperties
}

const headerStyles: React.CSSProperties = {
  padding: '1rem 2rem',

  display: "flex",
  flexDirection: 'row',
  justifyContent: 'space-between',
}

const headerDark: React.CSSProperties = {
  background: "#343a40",
  color: "#e7e7e7"
}

const Header: React.FC<HeaderProps> = ({style}) => {


  return (
      <header style={{...headerStyles,...headerDark, ...style}}>
        <div>
          www.borsky.dev
        </div>
        <div>
          <TopNavMenu />
        </div>
      </header>
  )
};
export default Header;
