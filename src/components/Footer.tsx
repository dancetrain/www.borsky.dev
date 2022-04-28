import React from "react";

const footerStyles: React.CSSProperties = {
  padding: '1rem 2rem',
  display: "flex",
  flexDirection: 'row',
  justifyContent: 'space-between',
}

const Footer: React.FC = () => {
  const today = new Date().getUTCFullYear()

  return (
      <div style={footerStyles}>
        <div>
          &copy; Copyright 2021-{today}
        </div>
        <div>
          Build with Gatsby
        </div>
      </div>
  )
};
export default Footer;
