import React, { CSSProperties } from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";


const HomePage: React.FC = () => {
  return <Layout mainStyles={{paddingTop: '1rem', marginBottom: 'auto', fontSize: '30px'}}>
      <p>Hey! My name is Pavel</p>
      <p>I'm a Software Engineer based in Barcelona, Spain with more 12 years of commercial development <small>My first HTML courses I've finished in 1998</small></p>
      <p>Currently looking for new opportunities, you can find my <Link to={"cv"}>Skills / CV here</Link></p>
  </Layout>
}

export default HomePage;
