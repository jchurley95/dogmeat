import React from 'react';
import {
    IndividualDieContainer,
    DieImage
} from './Styled/Dice.styled';

const Die = (props) => {
    return (
        <IndividualDieContainer
            onClick={() => {props.whatHappensWhenUserClicksADieInPlay(props.die, props.diceInPlay, props.dieId)}}
        >
            <DieImage 
            src={props.die.img_src}
            />
        </IndividualDieContainer>
    );
};

export default Die;