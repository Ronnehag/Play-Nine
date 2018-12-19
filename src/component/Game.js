import React, { Component } from 'react';
import { Stars, Button, Answer, Numbers, DoneFrame } from './GameElements';


export default class Game extends Component {
    static randomNumber = () => Math.floor(Math.random() * 9) + 1;
    static initialState = () => ({
        selectedNumbers: [],
        usedNumbers: [],
        numberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: '',
        gameTime: 60,
        timer: null
    });
    state = Game.initialState();

    componentDidMount = () => {
        this.initTimer();
    }

    initTimer = () => {
        const timer = setInterval(() => {
            if (this.state.gameTime === 0) clearInterval(timer);
            this.setState(prevState => ({
                gameTime: prevState.gameTime - 1
            }), this.updateDoneStatus());

        }, 1000);

        this.setState({
            timer: timer
        });
    }

    resetGame = () => this.setState(Game.initialState());

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerIsCorrect: null
        }));
    }
    deselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers
                .filter(number => number !== clickedNumber),
            answerIsCorrect: null
        }));
    }
    redraw = () => {
        if (this.state.redraws === 0) { return; } // Call lose
        this.setState(prevState => ({
            numberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            selectedNumbers: [],
            redraws: prevState.redraws - 1,
        }), this.updateDoneStatus);
    }
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers
                .concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: Game.randomNumber()
        }), this.updateDoneStatus);
    }
    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.numberOfStars ===
                prevState.selectedNumbers
                    .reduce((acc, val) => acc + val, 0)
        }));
    }

    possibleCombinations = (arr, num) => {
        if (arr.indexOf(num) >= 0) { return true; }
        if (arr[0] > num) { return false; }
        if (arr[arr.length - 1] > num) {
            arr.pop();
            return this.possibleCombinations(arr, num); // Recursive call
        }
        let listSize = arr.length, combinationsCount = (1 << listSize)
        for (let i = 1; i < combinationsCount; i++) {
            let combinationSum = 0;
            for (let j = 0; j < listSize; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (num === combinationSum) { return true; }
        }
        return false;
    }

    possibleSolutions = ({ numberOfStars, usedNumbers }) => {
        const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(number =>
            usedNumbers.indexOf(number) === -1
        );
        return this.possibleCombinations(possibleNumbers, numberOfStars);
    }

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done, nice!' };
            } else if (prevState.gameTime === 0 || (prevState.redraws === 0 &&
                !this.possibleSolutions(prevState))) {
                return { doneStatus: 'Game Over' };
            }
        });
    }

    render() {
        const { selectedNumbers, doneStatus,
            usedNumbers, redraws,
            numberOfStars, answerIsCorrect
        } = this.state;
        return (
            <div className="container">
                <h3 className="text-center">Play Nine</h3>
                <hr />
                <h4 className="text-center">Time remaining: {this.state.gameTime < 0 ? 0 : this.state.gameTime}</h4>
                <hr />
                <div className="row">
                    <Stars
                        numberOfStars={numberOfStars}
                    />
                    <Button
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        answerIsCorrect={answerIsCorrect}
                        selectedNumbers={selectedNumbers}
                        redraw={this.redraw}
                        redraws={redraws}
                    />
                    <Answer
                        selectedNumbers={selectedNumbers}
                        deselectNumber={this.deselectNumber}
                    />
                </div>
                <br />
                {doneStatus ?
                    <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} />
                    :
                    <Numbers usedNumbers={usedNumbers} selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} />
                }
            </div>
        )
    }
}