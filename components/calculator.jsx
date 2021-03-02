import React from "react";
import OperatorButton from './operator-button';
import NumberButton from './number-button';
import CustomButtonsSection from './custom-buttons';
export default class Calculator extends React.Component{
  constructor(){
    super()
    this.state = {displayedNumber: 0, 
                  computedNumber: null, 
                  addition: false, 
                  subtraction: false, 
                  division: false, 
                  multiplication: false, 
                  prevOperator: null,
                  previousComputedNumber: 0
                };

    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.performOperation = this.performOperation.bind(this);
    this.handleCustomButtons = this.handleCustomButtons.bind(this);
    this.numbers = ["7", "4", "1", "8", "5", "2", "9", "6", "3"];
    this.operators = {division: "÷", multiplication:"x", subtraction:"-", addition: "+", equals:"="};
  }


handleNumbers(e){
  if (e.target.localName !== "ul"){
    const operatorAlreadyActivated = this.state.addition || this.state.subtraction || this.state.multiplication || this.state.division;
    if (operatorAlreadyActivated){
      this.displayNewNumberOnCalculatorScreenAndTurnOffOperator(e.target.innerHTML);
    } else {
      this.setState((prevState) => {
        if (String(prevState.displayedNumber).length === 9) return;
        if (prevState.displayedNumber === 0 && "" + + prevState.displayedNumber.length === 1){
            return {displayedNumber: Number(e.target.innerHTML)};
        } else {
          return {displayedNumber: Number("" + prevState.displayedNumber + e.target.innerHTML)};
        }
      })
    }
  }    
}

displayNewNumberOnCalculatorScreenAndTurnOffOperator(numberToDisplay){
  const operatorName = this.findOperatorNameAssociatedWithSign(this.state.prevOperator);
  this.setState({[operatorName]: false, displayedNumber: Number(numberToDisplay)});
}

performOperation(e){
  const operatorAlreadyActivated = this.state.addition || this.state.subtraction || this.state.multiplication || this.state.division;
  if (operatorAlreadyActivated) return;

  if (this.state.equals){
    this.setState({equals: false})
  }
  // If there was no previous operator, I do not want to perform an operator. Instead, I just want to display a new number
  const operatorNameAssociatedWithSignClicked = this.findOperatorNameAssociatedWithSign(e.target.innerHTML);
  let computedNumber;
  if (!this.state.prevOperator){
    computedNumber = Number(this.state.displayedNumber);
    this.setState({[operatorNameAssociatedWithSignClicked]: true, displayedNumber: computedNumber, computedNumber, prevOperator: e.target.innerHTML})
  }
  if (e.target.innerHTML === "+" || e.target.innerHTML === "-" || e.target.innerHTML === "="){
    this.handleAdditionAndSubtraction(operatorNameAssociatedWithSignClicked, e.target.innerHTML)
  } else if (e.target.innerHTML === "x" || e.target.innerHTML === "÷"){
     this.handleMultiplicationAndDivision(operatorNameAssociatedWithSignClicked, e.target.innerHTML)
  } 
}

handleAdditionAndSubtraction(operatorNameAssociatedWithSignClicked, operatorSign){
  if (this.state.prevOperator === "+"){
    let newComputedNumber = this.state.computedNumber + this.state.displayedNumber; 
    this.setState({[operatorNameAssociatedWithSignClicked]: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: operatorSign})
  } else if (this.state.prevOperator === "-"){
    let newComputedNumber = this.state.computedNumber - this.state.displayedNumber; 
    this.setState({[operatorNameAssociatedWithSignClicked]: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: operatorSign})
  }else if (this.state.prevOperator === "x"){
    let newlyComputedNumber = this.state.displayedNumber * this.state.computedNumber;
    let newlyDisplayedNumber = newlyComputedNumber + this.state.previousComputedNumber;
    this.setState({[operatorNameAssociatedWithSignClicked]: true, computedNumber: newlyDisplayedNumber, displayedNumber: newlyDisplayedNumber, prevOperator: operatorSign, previousComputedNumber:  0})
  }else if (this.state.prevOperator === "÷"){
    let newlyComputedNumber = this.state.computedNumber / this.state.displayedNumber ;
    let newlyDisplayedNumber = newlyComputedNumber + this.state.previousComputedNumber;
    this.setState({[operatorNameAssociatedWithSignClicked]: true, computedNumber: newlyDisplayedNumber, displayedNumber: newlyDisplayedNumber,  prevOperator: operatorSign, previousComputedNumber:  0})
  } else if (this.state.prevOperator === "="){
    this.setState({[operatorNameAssociatedWithSignClicked]: true,  prevOperator: operatorSign})
  }
}

handleMultiplicationAndDivision(operatorNameAssociatedWithSignClicked, operatorSign){
  if (this.state.prevOperator === "+"){
    this.setState({[operatorNameAssociatedWithSignClicked]: true, computedNumber: this.state.displayedNumber, previousComputedNumber:  this.state.computedNumber, prevOperator: operatorSign})
  } else if (this.state.prevOperator === "-"){
    this.setState({[operatorNameAssociatedWithSignClicked]: true,  computedNumber: - this.state.displayedNumber, previousComputedNumber: this.state.computedNumber,prevOperator: operatorSign})
  } else if (this.state.prevOperator === "x"){
    let newComputedNumber = this.state.computedNumber * this.state.displayedNumber 
    this.setState({[operatorNameAssociatedWithSignClicked]: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: operatorSign})
  } else if (this.state.prevOperator === "÷"){
    let newComputedNumber = this.state.computedNumber / this.state.displayedNumber 
    this.setState({[operatorNameAssociatedWithSignClicked]: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: operatorSign})
  } else if (this.state.prevOperator === "="){
    this.setState({[operatorNameAssociatedWithSignClicked]: true,  prevOperator: operatorSign})
  }
}

findOperatorNameAssociatedWithSign(operatorClicked){
  return Object.keys(this.operators).find(operator => this.operators[operator] === operatorClicked);
}

displayDecimal(){
  let splitDecimalNumberOnDot = String(this.state.displayedNumber).split(".");
  if (splitDecimalNumberOnDot[0].length > 9){
    return Number((splitDecimalNumberOnDot[0]).toExponential(1)).toLocaleString() + "." + splitDecimalNumberOnDot[1];
  }else {
    return Number(splitDecimalNumberOnDot[0]).toLocaleString() + "." + splitDecimalNumberOnDot[1].slice(0, 9 - splitDecimalNumberOnDot[0].length);
  }
} 

handleDecimal(){
  this.setState((prevState) => {
    return {displayedNumber: prevState.displayedNumber + "."}
  })
}

handleCustomButtons(e){
  if (e.target.innerHTML === "AC"){
    this.setState({displayedNumber: 0, 
      computedNumber: null, 
      addition: false, 
      subtraction: false, 
      division: false, 
      multiplication: false, 
      equals: false,
      prevOperator: null,
      previousComputedNumber: 0
    });
  } else if (e.target.innerHTML === "+/-"){
    this.setState((prevState) => {
      return {displayedNumber: prevState.displayedNumber * - 1}
    })
  } else if (e.target.innerHTML === "%"){
    this.setState((prevState) => {
      return {displayedNumber: prevState.displayedNumber /100 }
    })
  }
}

displayResult(){
  if (String(this.state.displayedNumber).length > 9){
    return this.state.displayedNumber.toExponential(1);
  } else {
    return this.state.displayedNumber.toLocaleString()
  }
}

render(){
  const customButtons = ["AC", "+/-", "%"];
  const isDecimal = String(this.state.displayedNumber).includes(".");
  const calculatorScreen = isDecimal ? this.displayDecimal() : this.displayResult();

  return(
    <section className="calculator">

    <div className="calculator-screen">{calculatorScreen}</div>

      <div className="calculator-board">
        
        <section className="non-operators-section">

          <CustomButtonsSection customButtons={customButtons} handleCustomButtons={this.handleCustomButtons}/>

          <ul className="one-to-nine-numbers" onClick={this.handleNumbers}>
            {this.numbers.map(number => {
              return (
                <button key={number} id="number-button">
                  <NumberButton key={number} number={number} />
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
          {Object.keys(this.operators).map((operator) => {
            return (
              <button className={`colorize-operators`} id={`${this.state[operator] ? "switch-colors" : ""}`} key={operator}>
                <OperatorButton operator={this.operators[operator]}/>
              </button>
            )
          })}
        </ul>
      </div>
    </section>
    )
  }
}