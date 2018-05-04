import styled from 'styled-components';

const GameboardContainer = styled.div`
    width: 100%;
`
const GameboardH1 = styled.h1`
`
const DiceAreaContainer = styled.div`
`
const ScoreAreaContainer = styled.div`
`
const DogmeatModalContainer = styled.div`
    z-index: 10;
    position: absolute;
    display: flex;
    justify-content: center;
    box-shadow: 0 0 2px 2px rgba(225,225,225,0.5);
`

export {
    GameboardContainer,
    GameboardH1,
    DiceAreaContainer,
    ScoreAreaContainer,
    DogmeatModalContainer
}