import React from 'react';
import Layout from "../../components/Layout";
import MasterMindGame from "../../components/games/MasterMindGame/MasterMindGame";


const Mastermind = () => {

  // todo play game logic
  return (
    <Layout>
      <h1>Mastermind</h1>

      <MasterMindGame />
    </Layout>
  );
};


export default Mastermind;
