import React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";

const Games: React.FC = () => {
  return <Layout>
    Games
    <ul>
      <li>
        <Link to={"/games/cubes"}>ThreeJS flying Cubes</Link>
      </li>
      <li>
        <Link to={"/games/mastermind"}>Master Mind</Link>
      </li>
    </ul>
  </Layout>
};
export default Games;
