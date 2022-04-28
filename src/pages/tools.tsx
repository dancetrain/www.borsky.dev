import React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";

const ToolsPage: React.FC = () => {
  return <Layout>
    Tools
    <ul>
      <li><Link to={"/tools/base64"}>Base64 Decoder</Link></li>
    </ul>
  </Layout>
};
export default ToolsPage;
