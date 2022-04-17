import React from "react";
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from "gatsby";
import '../assets/styles/global.css'

const Layout: React.FC = ({children}) => {
  const {site} = useStaticQuery(
      graphql`
          query {
              site {
                  siteMetadata {
                      title
                      description
                      author
                  }
              }
          }
      `,
  );
    return <>
        <Helmet
            title={site.siteMetadata.title}
        >
            <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet" />
        </Helmet>
        <main>
            {children}
        </main>
    </>
}

export default Layout;
