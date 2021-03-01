import React from "react";
import OperatorButton from './operator-button';
import CustomButton from './custom-button';
import NumberButton from './number-button';

export default class Calculator extends React.Component{
  constructor(){
    super()
    this.state = {displayedNumber: 0, computedNumber: null, addition: false, subtraction: false, division: false, multiplication: false};
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.performOperation = this.performOperation.bind(this);
    this.numbers = ["7", "4", "1", "8", "5", "2", "9", "6", "3"];

  }
 // 1 => DP 1  CP 1
 // + => DP 1  CP 1
 // 2 => DP 2  CP 3
 // + => DP 3  CP 3
 // 5 => DP 5  CP 8 
 

  handleNumbers(e){
    this.setState((prevState) => {
      if (prevState.displayedNumber === 0 && "" + + prevState.displayedNumber.length === 1){
        return {displayedNumber: Number(e.target.innerHTML)}
      } else {
        return {displayedNumber: Number("" + prevState.displayedNumber + e.target.innerHTML)}
      }
    })
}


  setNewDigitBasedOnEventType(e){
  
  }

  handleDecimal(){

  }

  displayDecimalNumber(){

  }

  performOperation(e){
  }

  render(){
    const operators = {division: "÷", multiplication:"x", subtraction:"-", addition: "+", equals:"="};
    const customButtons = ["AC", "+/-", "%"];
    const isDecimal = String(this.state.displayedNumber).includes(".");
    const calculatorScreen = isDecimal ? this.displayDecimalNumber() : Number(this.state.displayedNumber).toLocaleString();

    return(
      <section className="calculator">

        <div className="calculator-screen">{calculatorScreen}</div>

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
              {this.numbers.map(number => {
                return (
                  <button key={number}>
                    <NumberButton key={number} number={number}/>
                  </button>  
                )
              })}
            </ul>

            <ul className="outliers">
              <button id="outlier-zero" onClick={this.handleNumbers}>
                <NumberButton number={"0"} />
              </button>
              <button onClick={this.handleDecimal}>.</button>
            </ul>
          </section>

          <ul className="operators-section" onClick={this.performOperation}> 
            {Object.keys(operators).map((operator) => {
              return (
                <button className={`colorize-operators`} id={`${this.state[operator] ? "switch-colors" : ""}`} key={operator}>
                  <OperatorButton operator={operators[operator]}/>
                </button>
              )
            })}
          </ul>

        </div>
      </section>
    )
  }
}