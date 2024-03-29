import React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";

const Tools: React.FC = () => {
  return <Layout mainStyles={{paddingTop: "1rem", marginBottom: "auto"}}>
    Tools
    <ul>
      <li><Link to={"/tools/base64"}>Base64 Decoder</Link></li>
    </ul>
  </Layout>
};
export default Tools;
