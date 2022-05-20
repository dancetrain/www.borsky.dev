import React from 'react';
import MasterMindGameBoard from "./MasterMindGame.board";


const MasterMindGame = () => {

  return (
    <div style={{
      width: '1024px',
      height: '768px',
    }}>
      <MasterMindGameBoard />
    </div>
  );
};

export default MasterMindGame;
