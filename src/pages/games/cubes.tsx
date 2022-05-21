import React from 'react';
import Layout from "../../components/Layout";
import Cubes from "../../components/games/Cubes/Cubes";


const Mastermind = () => {

  // todo play game logic
  return (
    <Layout>
      <h1>ThreeJS Cubes</h1>

      <Cubes />
    </Layout>
  );
};


export default Mastermind;
