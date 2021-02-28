import React from "react";
import OperatorButton from './operator-button';
import CustomButton from './custom-button';
import NumberButton from './number-button';

export default class Calculator extends React.Component{
  constructor(){
    super()
    this.state = {displayedNumber: "0", computedNumber: 0, addition: false, substraction: false, division: false};
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
        if (prevState.displayedNumber === "0" && prevState.displayedNumber.length === 1){
          if (e.type === "keydown" && newDigit){
            return {displayedNumber: e.key}
          } else if (e.type === "click"){
            return {displayedNumber: e.target.innerHTML}
          }  
        } else {
          let newNumber = prevState.displayedNumber + newDigit;
          if (newNumber.split(".").join("").length === 10){
            return {displayedNumber: prevState.displayedNumber}
          }else {
            return {displayedNumber: newNumber}
          }  
        }
      })
    }
  }

  setNewDigitBasedOnEventType(e){
    if (e.type === "keydown"){
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
    if (!this.state.displayedNumber.includes(".")){
      this.setState((prevState) => {
        return {displayedNumber: prevState.displayedNumber + "."}
      })
    }
  }

  displayDecimalNumber(){
    const splitNumberOnDecimal = this.state.displayedNumber.split(".");
    const beforeDecimal = splitNumberOnDecimal[0];
    const afterDecimal = splitNumberOnDecimal[1];
    return Number(beforeDecimal).toLocaleString() + "." + afterDecimal
  }

  performOperation(e){
    if (e.target.innerHTML === "+"){
      this.setState({addition: true});
    } else if (e.target.innerHTML === "-"){
      this.setState({substraction: true})
    } else if (e.target.innerHTML === "x"){
      this.setState({multiplication: true})
    } else if (e.target.innerHTML === "÷"){
      this.setState({division: true})
    }
  }

  render(){
    console.log(this.state)
    const operators = ["÷", "x", "-", "+", "="];
    const customButtons = ["AC", "+/-", "%"];
    const isDecimal = this.state.displayedNumber.includes(".");
    const calculatorScreen = isDecimal ? this.displayDecimalNumber() : Number(this.state.displayedNumber).toLocaleString();

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