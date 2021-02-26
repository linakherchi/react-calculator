import React from "react";
import OperatorButton from './operator-button';
import CustomButton from './custom-button';
import NumberButton from './number-button';

export default class Calculator extends React.Component{
    constructor(){
        super()
        this.state = {currentNumberShownInCalculator: 0}
    }
    render(){
        const operators = ["÷", "x", "-", "+", "="];
        const customButtons = ["AC", "+/-", "%"];
        const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

        return(
            <section className="calculator">

                <div className="calculator-screen">{this.state.currentNumberShownInCalculator}</div>

                <div className="calculator-board">
                    <ul className="operators-section">
                        {operators.map((operator) => {
                            return (
                                <OperatorButton key={operator} operator={operator}/>
                            )
                        })}
                    </ul>

                    <section className="non-operators-section">
                        <ul>
                            {customButtons.map((customButton) => {
                                return (
                                    <CustomButton key={customButton} customButton={customButton}/>
                                )
                            })}
                        </ul>

                        <ul>
                            {numbers.map(number => {
                                return (
                                    <NumberButton key={number} number={number}/>
                                )
                            })}
                        </ul>

                        <ul>
                            <button>0</button>
                            <button>.</button>
                        </ul>
                    </section>
                </div>
            </section>
        )
    }
}