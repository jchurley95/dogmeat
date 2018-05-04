import React from 'react';
import Die from './Die';
import {
    DiceNotInPlayContainer
} from './Styled/Dice.styled';

const DiceNotInPlay = (props) => {
    return (
        <DiceNotInPlayContainer>
            {
                props.diceNotInPlay.map((die, index) => {
                    return (
                        <Die 
                            key={index}
                            dieId={index}
                            die={die}
                        />
                    )
                })
            }
        </DiceNotInPlayContainer>
    );
};

export default DiceNotInPlay;