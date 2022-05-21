import React from 'react';
import Layout from "../../components/Layout";
import MastermindGame from "../../components/games/Mastermind/Mastermind.game";


const Mastermind = () => {
  // create context



  return (
    <Layout>
      <h1>Mastermind</h1>
      <p>
        Mastermind is a code-breaking game for two players. The goal is to guess the secret code.
        The code consists of four colored pegs. The player who guesses the code correctly
        first wins.</p>

      <MastermindGame />
    </Layout>
  );
};


export default Mastermind;
