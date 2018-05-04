import React from 'react';
import Die from './Die';
import DiceInPlay from './DiceInPlay';
import DiceNotInPlay from './DiceNotInPlay';
import DieCannotBeRemoved from './DieCannotBeRemoved';
import {
    AllDiceContainer
} from './Styled/Dice.styled';

const AllDice = (props) => {
    return (
        <AllDiceContainer>
            {
                props.clickedDieCannotBeRemoved &&
                <DieCannotBeRemoved />
            }
            <h2>Dice in play</h2>
            <DiceInPlay 
                removeDieFromDiceInPlay={props.removeDieFromDiceInPlay}
                diceInPlay={props.diceInPlay}
            />

            <h2>Dice not in play</h2>
            <DiceNotInPlay diceNotInPlay={props.diceNotInPlay}/>
        </AllDiceContainer>
    );
};

export default AllDice;