import React from 'react';
import {
    IndividualDieContainer,
    DieImage
} from './Styled/Dice.styled';

const Die = (props) => {
    return (
        <IndividualDieContainer
            onClick={() => {props.removeDieFromDiceInPlay(props.dieId)}}
        >
            <DieImage 
            src={props.die.img_src}
            />
        </IndividualDieContainer>
    );
};

export default Die;