import React from "react";
import OperatorButton from './operator-button';
import CustomButton from './custom-button';
import NumberButton from './number-button';

export default class Calculator extends React.Component{
    constructor(){
        super()
        this.state = {currentNumberShownInCalculator: "0"};
        this.handleNumbers = this.handleNumbers.bind(this);
    }

    handleNumbers(e){
        if (e.target.localName !== "ul"){
            this.setState((prevState) => {
                if (prevState.currentNumberShownInCalculator === "0" && prevState.currentNumberShownInCalculator.length === 1){
                    return {currentNumberShownInCalculator: e.target.innerHTML}
                } else {
                    return {currentNumberShownInCalculator: prevState.currentNumberShownInCalculator + e.target.innerHTML}
                }
            })
        }
    }

    render(){
        const operators = ["÷", "x", "-", "+", "="];
        const customButtons = ["AC", "+/-", "%"];
        const numbers = ["7", "4", "1", "8", "5", "2", "9", "6", "3"];

        return(
            <section className="calculator">

                <div className="calculator-screen">{Number(this.state.currentNumberShownInCalculator).toLocaleString()}</div>

                <div className="calculator-board">
                    

                    <section className="non-operators-section">
                        <ul className="custom-operators">
                            {customButtons.map((customButton) => {
                                return (
                                    <button key={customButton}>
                                        <CustomButton customButton={customButton}/>
                                    </button>
                                )
                            })}
                        </ul>

                        <ul className="one-to-nine-numbers" onClick={this.handleNumbers}>
                            {numbers.map(number => {
                                return (
                                    <button key={number}>
                                        <NumberButton key={number} number={number}/>
                                    </button>  
                                )
                            })}
                        </ul>

                        <ul className="outliers" onClick={this.handleNumbers}>
                            <button id="outlier-zero">
                                <NumberButton number={"0"}/>
                            </button>
                            <button>.</button>
                        </ul>
                    </section>

                    <ul className="operators-section" > {/*Click={this.switchColors}  */}
                        {operators.map((operator) => {
                            return (
                                <button className="colorize-operators" key={operator}>
                                    <OperatorButton operator={operator}/>
                                </button>
                            )
                        })}
                    </ul>

                </div>
            </section>
        )
    }
}