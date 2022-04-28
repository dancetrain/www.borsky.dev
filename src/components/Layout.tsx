import React from "react";
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from "gatsby";
import '../assets/styles/global.css'
import Footer from "./Footer";
import Header from "./Header";

const pageStyles: React.CSSProperties = {
  minHeight: "100vh",
  fontFamily: "'Montserrat', sans-serif",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0 2rem'
}

const Layout: React.FC = ({children}) => {
  const {site} = useStaticQuery(
      graphql`
        query {
          site {
            siteMetadata {
              siteTitle
              description
              author
            }
          }
        }
      `,
  );
  return <div style={pageStyles}>
    <Helmet
        title={site.siteMetadata.siteTitle}
    >
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"/>
    </Helmet>
    <Header/>
    {children}
    <Footer/>
  </div>
}

export default Layout;
