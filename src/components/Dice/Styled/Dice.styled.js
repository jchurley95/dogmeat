import styled from 'styled-components';

const AllDiceContainer = styled.div`
`
const DiceInPlayContainer = styled.div`
    display: flex;
    justify-content: space-around;
`
const DiceNotInPlayContainer = styled.div`
    display: flex;
    justify-content: space-around;
`
const IndividualDieContainer = styled.div`
    &:hover {
        cursor: pointer;
    }
`
const DieImage = styled.img`
    height: 50px;
    width: 50px;
`

export {
    AllDiceContainer,
    DiceInPlayContainer,
    DiceNotInPlayContainer,
    IndividualDieContainer,
    DieImage
}