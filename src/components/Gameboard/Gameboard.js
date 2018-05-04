import React, { Component } from 'react';
import AllDice from '../Dice/AllDice';
import DiceImgSrcList from '../../DiceImgSrcList';
import {
    GameboardContainer,
    GameboardH1
} from './Styled/Gameboard.styled';

class Gameboard extends Component {
    constructor() {
        super();

        this.state = {
            dice: [
                {
                    pointValue: 100,
                    dieValue: 1,
                    img_src: DiceImgSrcList.diceOneSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 2,
                    img_src: DiceImgSrcList.diceTwoSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 3,
                    img_src: DiceImgSrcList.diceThreeSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 4,
                    img_src: DiceImgSrcList.diceFourSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 50,
                    dieValue: 5,
                    img_src: DiceImgSrcList.diceFiveSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 6,
                    img_src: DiceImgSrcList.diceSixSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                }
            ],
            diceInPlay: [
                {
                    pointValue: 100,
                    dieValue: 1,
                    img_src: DiceImgSrcList.diceOneSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 2,
                    img_src: DiceImgSrcList.diceTwoSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 3,
                    img_src: DiceImgSrcList.diceThreeSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 4,
                    img_src: DiceImgSrcList.diceFourSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 50,
                    dieValue: 5,
                    img_src: DiceImgSrcList.diceFiveSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                },
                {
                    pointValue: 0,
                    dieValue: 6,
                    img_src: DiceImgSrcList.diceSixSrc,
                    removed: false,
                    numberOfOccurrencesThisRoll: 1
                }
            ],
            diceNotInPlay: [],
            diceRemovedThisTurn: [],
            clickedDieCannotBeRemoved: false
        }
    }

    whatHappensWhenUserClicksADieInPlay = (die, diceInPlay, index) => {
        var canBeRemoved = this.checkIfDieCanBeRemoved(die, diceInPlay);
        var numberOfOccurrencesOfDieValueThisRoll = this.determineNumberOfOccurrencesOfAnIndividualDieValueThisRoll(die.dieValue, diceInPlay);
        if (canBeRemoved && numberOfOccurrencesOfDieValueThisRoll < 3) {
            this.removeDieFromDiceInPlay(index);
        } 
        else if (canBeRemoved && numberOfOccurrencesOfDieValueThisRoll >= 3) {

        }
    }

    checkWhichDiceCanBeRemovedFromPlay = (diceInPlay) => {
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
        var numberOfOccurrencesOfDieValueThisRoll = this.determineNumberOfOccurrencesOfAnIndividualDieValueThisRoll(die, diceInPlay);
        if (numberOfOccurrencesOfDieValueThisRoll >= 3) {
            canBeRemoved = true;
        }
        else if (die.dieValue === 1 || die.dieValue === 5) {
            canBeRemoved = true;
        }
        return canBeRemoved;
    }

    removeDieFromDiceInPlay = (index) => {
        var newState = {...this.state}
        newState.diceInPlay[index].removed = this.checkIfDieCanBeRemoved(newState.diceInPlay[index], newState.diceInPlay);
        if (newState.diceInPlay[index].removed === true) {
            newState.clickedDieCannotBeRemoved = false;
            newState.diceInPlay = newState.diceInPlay.filter((die, index) => {
                if (die.removed === true) {
                    newState.diceNotInPlay.push(die);
                }
                return die.removed === false;
            })
    
        }
        else {
            newState.clickedDieCannotBeRemoved = true;
        }

        this.setState(newState);        
    }

    removeThreeOrMoreOfAKindFromDiceInPlay = (arrayOfDiceToBeRemoved) => {
        var newState = {...this.state};
        arrayOfDiceToBeRemoved.map((die, index) => {
            var indexOfDieToBeRemovedFromDiceInPlay = newState.diceInPlay
        })
        this.setState(newState);
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

    rollTheDiceInPlay = () => {
        var newState = {...this.state}
        newState.diceInPlay.map((die, index) => {
            newState.diceInPlay[index].dieValue = this.getRandomValueBetweenOneAndSix(1, 7);
            newState.diceInPlay[index].img_src = this.matchImgSrcToDieValue(newState.diceInPlay[index].dieValue);
            newState.diceInPlay[index].pointValue = this.matchPointValueToDieValue(newState.diceInPlay[index].dieValue);
        })
        
        this.setState(newState);
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

    render() {
        
        return (
            <GameboardContainer>
                <GameboardH1>Dogmeat</GameboardH1>
                <button onClick={this.rollTheDiceInPlay}>Roll the dice</button>
                <AllDice 
                    dice={this.state.dice}
                    diceInPlay={this.state.diceInPlay}
                    diceNotInPlay={this.state.diceNotInPlay}
                    removeDieFromDiceInPlay={this.removeDieFromDiceInPlay}
                    clickedDieCannotBeRemoved={this.clickedDieCannotBeRemoved}
                />
            </GameboardContainer>
        );
    }
}

export default Gameboard;