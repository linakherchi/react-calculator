import React from "react";
import OperatorButton from './operator-button';

export default class Calculator extends React.Component{
    constructor(){
        this.state = {currentNumberShownInCalculator: 0}
    }
    render(){
        const operators = ["÷", "x", "-", "+", "="];
        const customButtons = ["AC", "+/-", "%"]
        return(
            <section className="calculator">

                <div className="calculator-screen">{this.state.currentNumberShownInCalculator}</div>

                <div className="calculator-board">
                    <ul>
                        {operators.map((operator) => {
                            return (
                                <OperatorButton operator={operator}/>
                            )
                        })}
                    </ul>
                </div>
            </section>
        )
    }
}