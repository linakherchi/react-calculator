import React from "react";
import OperatorButton from './operator-button';

export default class Calculator extends React.Component{
    constructor(){
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
                                <OperatorButton operator={operator}/>
                            )
                        })}
                    </ul>

                    <section className="non-operators-section">
                        <ul>
                            {customButtons.map((customButton) => {
                                return (
                                    <CustomButton customButton={customButton}/>
                                )
                            })}
                        </ul>

                        <ul>
                            {numbers.map(number => {
                                return (
                                    <NumberButton number={number}/>
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