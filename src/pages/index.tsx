import React, { CSSProperties } from "react";
import Layout from "../components/Layout";

const textStyle: CSSProperties = {
  fontSize: '40px'
}

const HomePage: React.FC = () => {
  return <Layout mainStyles={textStyle}>
      <p>Hey! I'm Pavel</p>
      <p>I'm a Software Engineer based in Barcelona, Spain</p>
      <p>Currently looking for new opportunities as a Lead Engineer</p>
  </Layout>
}

export default HomePage;
