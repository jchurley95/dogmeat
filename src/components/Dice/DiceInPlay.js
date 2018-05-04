import React from 'react';
import Die from './Die';
import {
    DiceInPlayContainer
} from './Styled/Dice.styled';

const DiceInPlay = (props) => {
    return (
        <DiceInPlayContainer>
            {
                props.diceInPlay.map((die, index) => {
                    return (
                        <Die 
                            key={index}
                            dieId={index}
                            die={die}
                            removeDieFromDiceInPlay={props.removeDieFromDiceInPlay}
                        />
                    )
                })
            }
        </DiceInPlayContainer>
    );
};

export default DiceInPlay;