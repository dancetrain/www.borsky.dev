import React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";

const Games: React.FC = () => {
  return (
    <Layout mainStyles={{ paddingTop: "1rem", marginBottom: "auto" }}>
      Games
      <ul>
        <li>
          <Link to={"/games/mastermind"}>Master Mind</Link>
        </li>
      </ul>
    </Layout>
  );
};
export default Games;
