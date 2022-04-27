import React from "react";

type HeaderProps = {
    style?: React.CSSProperties
}

const headerStyles: React.CSSProperties = {
    height: '40px',
    padding: '8px 16px'
}

const Header: React.FC<HeaderProps> = ({style}) => {


  return (
    <header style={{...headerStyles, ...style}}>

    </header>
  )
};
export default Header;
