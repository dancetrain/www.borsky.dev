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
}

const defaultMainStyles: React.CSSProperties = {
  padding: '0 2rem'
}

type LayoutProps = {
  mainStyles?: React.CSSProperties
}

const Layout: React.FC<LayoutProps> = (
    {
      mainStyles,
      children
    }) => {
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
    <main style={{...defaultMainStyles,...mainStyles}}>
      {children}
    </main>

    <Footer/>
  </div>
}

export default Layout;
