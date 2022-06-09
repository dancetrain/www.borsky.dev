import React from 'react';
import { Router } from "@reach/router"
import Layout from "../../../components/Layout";
import MastermindGame from "../../../components/games/Mastermind/Mastermind.game";


const Mastermind = () => {
  return (
    <Layout>
      <h1>Mastermind</h1>
      <p>
        Mastermind is a code-breaking game for two players. The goal is to guess the secret code.
        The code consists of four colored pegs. The player who guesses the code correctly
        first wins.
      </p>
      <Router basepath={"/games/mastermind"} primary={false}>
        <MastermindGame path={"/:gameId/"} />
        <MastermindGame path={"/"} default={true} />
      </Router>
    </Layout>
  );
};


export default Mastermind;
