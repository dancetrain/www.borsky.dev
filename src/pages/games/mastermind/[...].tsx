import React from 'react';
import { Router } from "@reach/router"
import Layout from "../../../components/Layout";
import MastermindGame from "../../../components/games/Mastermind/Mastermind.game";


const Mastermind = () => {
  return (
    <Layout>
      <h1>Mastermind</h1>
      <p>
        Mastermind is a code-breaking game. The goal is to guess the secret code.
        The code consists of four colored pegs. More info on <a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)">Wikipedia</a>
      </p>
      <Router basepath={"/games/mastermind"} primary={false}>
        <MastermindGame path={"/:gameId"} />
        <MastermindGame path={"/"} default={true} />
      </Router>
    </Layout>
  );
};


export default Mastermind;
