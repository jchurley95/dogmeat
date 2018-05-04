import React from 'react';
import {
    ScoreAreaContainer
} from './Styled/Gameboard.styled';

const ScoreArea = (props) => {
    return (
        <ScoreAreaContainer>
            Score: {props.score}
        </ScoreAreaContainer>
    );
};

export default ScoreArea;