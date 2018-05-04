import React, { Component } from 'react';
import AllDice from '../Dice/AllDice';
import ScoreArea from './ScoreArea';
import DogmeatModal from './DogmeatModal';
import DiceImgSrcList from '../../DiceImgSrcList';
import {
    GameboardContainer,
    GameboardH1
} from './Styled/Gameboard.styled';

class Gameboard extends Component {
    constructor() {
        super();

        this.state = {
            diceInPlay: [
                {
                    pointValue: 100,
                    dieValue: 1,
                    img_src: DiceImgSrcList.diceOneSrc,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 2,
                    img_src: DiceImgSrcList.diceTwoSrc,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 3,
                    img_src: DiceImgSrcList.diceThreeSrc,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 4,
                    img_src: DiceImgSrcList.diceFourSrc,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 50,
                    dieValue: 5,
                    img_src: DiceImgSrcList.diceFiveSrc,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 6,
                    img_src: DiceImgSrcList.diceSixSrc,
                    numberOfOccurrencesThisRoll: 1
                }
            ],
            diceNotInPlay: [],
            diceRemovedThisTurn: [],
            clickedDieCannotBeRemoved: false,
            pointsThisTurn: 0,
            selectedAtLeastOneDie: false,
            showSelectAtLeastOneDieFlag: false,
            dogmeat: false
        }
    }

    componentWillMount() {
        this.rollTheDiceInPlay();
    }

    whatHappensWhenUserClicksADieInPlay = (die, diceInPlay, index) => {
        var canBeRemoved = this.checkIfDieCanBeRemoved(die, diceInPlay);
        var numberOfOccurrencesOfDieValueThisRoll = this.determineNumberOfOccurrencesOfAnIndividualDieValueThisRoll(die.dieValue, diceInPlay);
        if (canBeRemoved && numberOfOccurrencesOfDieValueThisRoll < 3) {
            this.removeDieFromDiceInPlay(die.dieValue, index);
        } 
        else if (canBeRemoved && numberOfOccurrencesOfDieValueThisRoll >= 3) {
            this.removeThreeOrMoreOfAKindFromDiceInPlay(die.dieValue, diceInPlay, numberOfOccurrencesOfDieValueThisRoll);
        }
        else {
            this.alertThatDieCannotBeRemoved();
        }
    }
    
    removeDieFromDiceInPlay = (dieValue, index) => {
        var newState = {...this.state};
        newState.diceNotInPlay.push(newState.diceInPlay[index])
        newState.diceInPlay.splice(index, 1);
        newState.clickedDieCannotBeRemoved = false;
        newState.selectedAtLeastOneDie = true;
        newState.pointsThisTurn += this.determineNumberOfPointsEarnedFromSingleDie(dieValue);
        this.setState(newState);
    }
    removeThreeOrMoreOfAKindFromDiceInPlay = (dieValue, diceInPlay, numberOfOccurrencesOfDieValueThisRoll) => {
        var newState = {...this.state};
        var diceThatShouldRemainInPlay = diceInPlay.filter((die, index) => {
            return die.dieValue !== dieValue;
        })
        var diceThatShouldNotRemainInPlay = diceInPlay.filter((die, index) => {
            if (die.dieValue === dieValue) {
                newState.diceNotInPlay.push(die);
            }
            return die.dieValue === dieValue;
        })
        newState.clickedDieCannotBeRemoved = false;
        newState.diceInPlay = diceThatShouldRemainInPlay;
        newState.selectedAtLeastOneDie = true;
        newState.pointsThisTurn += this.determineNumberOfPointsEarnedFromThreeOrMoreOfAKind(dieValue, numberOfOccurrencesOfDieValueThisRoll);
        this.setState(newState);
    }
    alertThatDieCannotBeRemoved = () => {
        this.setState({clickedDieCannotBeRemoved: true})
    }

    createObjectOfDiceThatCanAndCannotBeRemoved = (diceInPlay) => {
        var diceThatCanAndCannotBeRemovedThisTurn = {
            diceThatCanBeRemoved: [],
            diceThatCannotBeRemoved: []
        };
        var numberOfOccurrencesOfEachDieValueThisRoll = this.determineNumberOfOccurrencesOfEachDieValueThisRoll(diceInPlay);
        diceInPlay.map((die, index) => {
            if (numberOfOccurrencesOfEachDieValueThisRoll[die.dieValue - 1] >= 3) {
                diceThatCanAndCannotBeRemovedThisTurn["diceThatCanBeRemoved"].push(die);
            }         
            else if (die.dieValue === 1 || die.dieValue === 5) {
                diceThatCanAndCannotBeRemovedThisTurn["diceThatCanBeRemoved"].push(die);
            }
            else {
                diceThatCanAndCannotBeRemovedThisTurn["diceThatCannotBeRemoved"].push(die);
            }
        })
        return diceThatCanAndCannotBeRemovedThisTurn;
    }

    checkIfDieCanBeRemoved = (die, diceInPlay) => {
        var canBeRemoved = false;
        var numberOfOccurrencesOfDieValueThisRoll = this.determineNumberOfOccurrencesOfAnIndividualDieValueThisRoll(die.dieValue, diceInPlay);
        if (numberOfOccurrencesOfDieValueThisRoll >= 3) {
            canBeRemoved = true;
        }
        else if (die.dieValue === 1 || die.dieValue === 5) {
            canBeRemoved = true;
        }
        return canBeRemoved;
    }
    
    determineNumberOfPointsEarnedFromSingleDie = (dieValue) => {
        var points = 0;
        if (dieValue === 1) {
            points = 100;
        }
        else if (dieValue === 5) {
            points = 50;
        }

        return points;
    }

    determineNumberOfPointsEarnedFromThreeOrMoreOfAKind = (dieValue, numberOfOccurrencesOfDieValueThisRoll) => {
        var points = 0;
        var numberOfTimesToMultiplyByTwo = Math.abs(3 - numberOfOccurrencesOfDieValueThisRoll)

        if (dieValue !== 1) {
            points += dieValue * 100
            for (var i = 0; i < numberOfTimesToMultiplyByTwo; i++) {
                points += points
            }
        }
        else {
            points += dieValue * 1000
            for (var i = 0; i < numberOfTimesToMultiplyByTwo; i++) {
                points += points
            }
        }
        return points;
    }

    determineNumberOfOccurrencesOfEachDieValueThisRoll = (diceInPlay) => {
        var numberOfOccurrencesOfEachDieValueThisRoll = [
            0,
            0,
            0,
            0,
            0,
            0
        ]

        diceInPlay.map((die, index) => {
            switch (die.dieValue) {
                case 1: numberOfOccurrencesOfEachDieValueThisRoll[0]++;
                    break;
                case 2: numberOfOccurrencesOfEachDieValueThisRoll[1]++;
                    break;
                case 3: numberOfOccurrencesOfEachDieValueThisRoll[2]++;
                    break;
                case 4: numberOfOccurrencesOfEachDieValueThisRoll[3]++;
                    break;
                case 5: numberOfOccurrencesOfEachDieValueThisRoll[4]++;
                    break;
                case 6: numberOfOccurrencesOfEachDieValueThisRoll[5]++;
                    break;
            }
        })

        return numberOfOccurrencesOfEachDieValueThisRoll;
    }

    determineNumberOfOccurrencesOfAnIndividualDieValueThisRoll = (dieValue, diceInPlay) => {
        var numberOfOccurrencesOfDieValueThisRoll = 0;
        diceInPlay.map((die, index) => {
            if (die.dieValue === dieValue) {
                numberOfOccurrencesOfDieValueThisRoll++;
            }
        })

        return numberOfOccurrencesOfDieValueThisRoll;
    }

    whatHappensWhenUserClicksRollTheDiceButton = () => {
        if (this.state.selectedAtLeastOneDie) {
            this.rollTheDiceInPlay();
        }
        else {
            this.alertSelectAtLeastOneDie();
        }
    }

    alertSelectAtLeastOneDie = () => {
        this.setState({showSelectAtLeastOneDieFlag: true});
    }

    rollTheDiceInPlay = () => {
        var newState = {...this.state}
        newState.diceInPlay.map((die, index) => {
            newState.diceInPlay[index].dieValue = this.getRandomValueBetweenOneAndSix(1, 7);
            newState.diceInPlay[index].img_src = this.matchImgSrcToDieValue(newState.diceInPlay[index].dieValue);
            newState.diceInPlay[index].pointValue = this.matchPointValueToDieValue(newState.diceInPlay[index].dieValue);
        })
        newState.clickedDieCannotBeRemoved = false;
        newState.showSelectAtLeastOneDieFlag = false;
        newState.dogmeat = this.checkForDogmeat(newState.diceInPlay);
        this.setState(newState);
    }

    checkForDogmeat = (diceInPlay) => {
        var dogmeat = true;
        diceInPlay.map((die, index) => {
            var threeOrMoreOfAKind = this.determineNumberOfOccurrencesOfAnIndividualDieValueThisRoll(die.dieValue, diceInPlay) >= 3;
            if (die.dieValue === 1 || die.dieValue === 5) {
                dogmeat = false;
            }
            else if (threeOrMoreOfAKind) {
                dogmeat = false;
            }
        })
        return dogmeat;
    }

    getRandomValueBetweenOneAndSix = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    matchImgSrcToDieValue = (dieValue) => {
        var img_src = "";
        switch (dieValue) {
            case 1: img_src = DiceImgSrcList.diceOneSrc
                break;
            case 2: img_src = DiceImgSrcList.diceTwoSrc
                break;
            case 3: img_src = DiceImgSrcList.diceThreeSrc
                break;
            case 4: img_src = DiceImgSrcList.diceFourSrc
                break;
            case 5: img_src = DiceImgSrcList.diceFiveSrc
                break;
            case 6: img_src = DiceImgSrcList.diceSixSrc
                break;
        }

        return img_src;
    }

    matchPointValueToDieValue = (dieValue) => {
        var pointValue = 0;
        switch (dieValue) {
            case 1: pointValue = 100
                break;
            case 2: pointValue = 0
                break;
            case 3: pointValue = 0
                break;
            case 4: pointValue = 0
                break;
            case 5: pointValue = 50
                break;
            case 6: pointValue = 0
                break;
        }

        return pointValue;
    }

    changeShowModal = () => {
        var newState = {...this.state}
        newState.dogmeat = !newState.dogmeat;
        newState.pointsThisTurn = 0;
        this.setState(newState);
    }

    render() {
        
        return (
            <GameboardContainer>
                <DogmeatModal 
                    modalShown={this.state.dogmeat}
                    changeShowModal={this.changeShowModal}
                    modalBannerMessage = "Dogmeat!"
                    modalContent={<div>Next player's turn.</div>}
                />
                <GameboardH1>Dogmeat</GameboardH1>
                <ScoreArea score={this.state.pointsThisTurn}/>
                <button onClick={this.whatHappensWhenUserClicksRollTheDiceButton}>Roll the dice</button>
                <AllDice
                    dice={this.state.dice}
                    diceInPlay={this.state.diceInPlay}
                    diceNotInPlay={this.state.diceNotInPlay}
                    whatHappensWhenUserClicksADieInPlay={this.whatHappensWhenUserClicksADieInPlay}
                    clickedDieCannotBeRemoved={this.state.clickedDieCannotBeRemoved}
                />
            </GameboardContainer>
        );
    }
}

export default Gameboard;