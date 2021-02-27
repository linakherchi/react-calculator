import React from "react";
import OperatorButton from './operator-button';
import CustomButton from './custom-button';
import NumberButton from './number-button';

export default class Calculator extends React.Component{
  constructor(){
    super()
    this.state = {currentNumber: "0"};
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.performOperation = this.performOperation.bind(this);
    this.numbers = ["7", "4", "1", "8", "5", "2", "9", "6", "3"];

  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleNumbers)
  }

  handleNumbers(e){
    const newDigit = this.setNewDigitBasedOnEventType(e)

    if (e.target.localName !== "ul"){
      this.setState((prevState) => {
        if (prevState.currentNumber === "0" && prevState.currentNumber.length === 1){
          if (e.type === "keydown" && newDigit){
            return {currentNumber: e.key}
          } else if (e.type === "click"){
            return {currentNumber: e.target.innerHTML}
          }  
        } else {
          let newNumber = prevState.currentNumber + newDigit;
          if (newNumber.split(".").join("").length === 10){
            return {currentNumber: prevState.currentNumber}
          }else {
            return {currentNumber: newNumber}
          }  
        }
      })
    }
  }

  setNewDigitBasedOnEventType(e){
    if (e.type === "keydown"){
        // console.log(this.numbers.includes(String(e.key)))
      if (!(this.numbers.includes(String(e.key)))){
        return "";
      } else {
         return e.key;
      }
    }  else {
      return e.target.innerHTML;
    }
  }

  handleDecimal(){
    if (!this.state.currentNumber.includes(".")){
      this.setState((prevState) => {
        return {currentNumber: prevState.currentNumber + "."}
      })
    }
  }

  displayDecimalNumber(){
    const splitNumberOnDecimal = this.state.currentNumber.split(".");
    const beforeDecimal = splitNumberOnDecimal[0];
    const afterDecimal = splitNumberOnDecimal[1];
    return Number(beforeDecimal).toLocaleString() + "." + afterDecimal
  }

  performOperation(e){
    
  }

  render(){
    const operators = ["÷", "x", "-", "+", "="];
    const customButtons = ["AC", "+/-", "%"];
    const isDecimal = this.state.currentNumber.includes(".");
    const calculatorScreen = isDecimal ? this.displayDecimalNumber() : Number(this.state.currentNumber).toLocaleString();

    return(
      <section className="calculator">

        <div className="calculator-screen">{ calculatorScreen}</div>

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

          <ul className="operators-section" onClick={this.performOperation}> {/*Click={this.switchColors}  */}
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