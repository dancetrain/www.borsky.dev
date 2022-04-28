import React, { CSSProperties } from "react";
import Layout from "../components/Layout";

const textStyle: CSSProperties = {
  fontSize: '40px'
}

const IndexPage: React.FC = () => {
  return <Layout>
    <main style={textStyle}>
      <p>Hey! I'm Pavel</p>
      <p>I'm a developer based in Barcelona, Spain</p>
      <p>I work in ZeptoLab as a Lead Software Engineer</p>
    </main>
  </Layout>
}

export default IndexPage;
