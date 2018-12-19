import React from 'react';

export const Stars = ({ numberOfStars }) => {
    let stars = [];
    for (let i = 0; i < numberOfStars; i++) {
        stars.push(<i className="fa fa-star" key={i}></i>);
    }
    return (
        <div className="col-5">
            {stars}
        </div>
    )
}

export const Answer = ({ selectedNumbers, deselectNumber }) => {

    return (
        <div className="col-5">
            {selectedNumbers.map((number, i) =>
                <span key={i} onClick={() => deselectNumber(number)}>{number}</span>
            )}
        </div>
    )
}

export const Button = ({ selectedNumbers, acceptAnswer, redraws, redraw, checkAnswer, answerIsCorrect }) => {
    let btn;
    switch (answerIsCorrect) {
        case true:
            btn =
                <button className="btn btn-success" onClick={acceptAnswer}>
                    <i className="fa fa-check"></i>
                </button>
            break;

        case false:
            btn =
                <button className="btn btn-danger">
                    <i className="fa fa-times"></i>
                </button>
            break;

        default:
            btn =
                <button className="btn btn-primary" onClick={checkAnswer} disabled={selectedNumbers.length === 0}>
                    =
                </button>
            break;
    }

    return (
        <div className="col-2 text-center">
            {btn}
            <br /> <br />
            <button className="btn btn-warning btn-sm" onClick={redraw}
                disabled={redraws === 0}>
                <i className="fa fa-sync"></i> {redraws}
            </button>
        </div>
    )
}

export const Numbers = ({ selectedNumbers, usedNumbers, selectNumber }) => {

    const numberClassName = (number) => {
        if (usedNumbers.indexOf(number) >= 0) {
            return "used";
        }
        if (selectedNumbers.indexOf(number) >= 0) {
            return "selected";
        }
    }
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) =>
                    <span key={i} className={numberClassName(number)} onClick={() => selectNumber(number)}>{number}</span>
                )}
            </div>
        </div>
    )
}
Numbers.list = [1, 2, 3, 4, 5, 6, 7, 8, 9];


export const DoneFrame = ({ doneStatus, resetGame }) => {
    return (
        <div className="text-center">
            <br />
            <h2>{doneStatus}</h2>
            <button onClick={resetGame} className="btn btn-secondary">
                Play Again
                </button>
        </div>
    )
}
