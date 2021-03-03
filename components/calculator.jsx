import React from "react";
import OperatorButton from './operator-button';
import CustomButtonsSection from './custom-buttons-section';
import OneToNineNumbersSection from './one-to-nine-numbers-section';
import OutliersSection from './outliers-section';
export default class Calculator extends React.Component{
  constructor(){
    super()
    this.state = {displayedNumber: 0, 
                  computedNumber: null, 
                  addition: false, 
                  subtraction: false, 
                  division: false, 
                  multiplication: false,
                  equals: false, 
                  prevOperator: null,
                  previousComputedNumber: 0
                };

    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.performOperation = this.performOperation.bind(this);
    this.handleCustomButtons = this.handleCustomButtons.bind(this);
    this.operators = {division: "÷", multiplication:"x", subtraction:"-", addition: "+", equals:"="};
  }


handleNumbers(e){
  if (e.target.localName !== "ul"){
    const operatorAlreadyActivated = this.state.addition 
                                  || this.state.subtraction 
                                  || this.state.multiplication 
                                  || this.state.division 
                                  || this.state.equals;
    if (operatorAlreadyActivated){
      // If one of the operators is already activated - I want to replace whatever is in 
      // the calculator screen with the new number that I want to type
      // I also want to remove the CSS on the last operator's name to know longer show that it is activated
      this.displayNewNumberOnCalculatorScreenAndTurnOffOperator(e.target.innerHTML);
    } else {
      // If no operator was already activated, I am next to two cases: 
      // If the previously displayed number displayed is 0, I just replace it with the number I am typing
      // Otherwise, I concat to it the new number that I am typing
      // One edge case handled here is if the length of the previously displayed number is 9, I no longer 
      // want to allow the user to type to not write outside of the calculator screen
      this.setState((prevState) => {
        if (String(prevState.displayedNumber).length === 9) return;
        if (prevState.displayedNumber === 0){
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
  // One specific case is if the last operator is an equal and I am trying to type in a new number
  // I want to not only replace the displayed number but reset the computed number & previousOperator
  // to start a new calculation from scratch
  if (operatorName === "equals"){
    this.setState({computedNumber: Number(numberToDisplay), prevOperator: null})
  }
}

performOperation(e){
  // I do not want to allow the user to type in 2 operators consecutively and this is why I 
  // immediately return
  const operatorAlreadyActivated = this.state.addition 
                                || this.state.subtraction 
                                || this.state.multiplication 
                                || this.state.division;
  if (operatorAlreadyActivated) return;

  // This really just changes the CSS of the equal sign when I immediately click on a difference operator
  if (this.state.equals){
    this.setState({equals: false, prevOperator: null})
  }

  const operatorNameAssociatedWithSignClicked = this.findOperatorNameAssociatedWithSign(e.target.innerHTML);
  let computedNumber;
  if (!this.state.prevOperator){
    // If there was no previous operator, I do not want to perform an operation. Instead, I just want 
    //  account for a new number in my computedNumber state key.
    // I also want to register the operator I just clicked on as a previous operator because that will be 
    // needed to update my computed number on a next operator click.
    computedNumber = Number(this.state.displayedNumber);
    this.setState({[operatorNameAssociatedWithSignClicked]: true, computedNumber, prevOperator: e.target.innerHTML})
  }
  // If there was already an operator clicked on earlier such as: 3 + 4 -
  // I will need to calculate the computed number: 3 + 4, and account for - as the new prevOperator
  // As you can see, I compute and display a new number only on a new operator click to be in sync
  // with the real Apple Calculator.
  // Simple said, the 3 + 4 result displayed (7) depends on what operator I am going to click on 
  // later. i.e if I click on + or - => I will display 7
  // If I clicked on * or /, I will display 4 and the end result is going to be 3 + (4 */÷ ...),
  // so I need to separate the 3 from the new operator I am trying to implement
  if (e.target.innerHTML === "+" || e.target.innerHTML === "-" || e.target.innerHTML === "="){
    this.handleAdditionAndSubtraction(operatorNameAssociatedWithSignClicked, e.target.innerHTML)
  } else if (e.target.innerHTML === "x" || e.target.innerHTML === "÷"){
     this.handleMultiplicationAndDivision(operatorNameAssociatedWithSignClicked, e.target.innerHTML)
  } 
}

handleAdditionAndSubtraction(operatorNameAssociatedWithSignClicked, operatorSign){
  if (this.state.prevOperator === "+"){
    // example, if I did: 4 + 3 +, I want to display 7, so in here, I am making the sum of 4 + 3 
    // & displaying it. I am also taking into account the new operator I just typed (+) and saving
    // it in the prevOperator key because I will need it to keep chaining operations
    let newComputedNumber = this.state.computedNumber + this.state.displayedNumber; 
    this.setState({[operatorNameAssociatedWithSignClicked]: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: operatorSign})
  } else if (this.state.prevOperator === "-"){
    // 4 - 3 + 
    let newComputedNumber = this.state.computedNumber - this.state.displayedNumber; 
    this.setState({[operatorNameAssociatedWithSignClicked]: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: operatorSign})
  }else if (this.state.prevOperator === "x"){
    // In this case,(i.e 4 * 3 +) I just want to multiply the newly typed in number with whatever was registered earlier
    // but I also introduce a new variable called this.state.previousComputedNumber
    // This variable is needed in case I have the corresponding case for example: 
    // 4 * 3 + 5 * 4 - 8 * 5
    // 1. 4 * 3 + => previously computed number is 0, newlyComputed/displayednumber is 12, prevOperator is + 
    // 2. 4 * 3 + 5 * => Here and in order to respect the priority of operations, I want to separate 4 * 3 
    // and save it in a variable, and start from scratch with 5 *, when I complete my operation that starts at 5
    // with a +, -, or =, then I take the previouslyComputed number and add it to the new chain of multiplications/
    //divisions I just made
    let newlyComputedNumber = this.state.displayedNumber * this.state.computedNumber;
    let newlyDisplayedNumber = newlyComputedNumber + this.state.previousComputedNumber;
    this.setState({[operatorNameAssociatedWithSignClicked]: true, computedNumber: newlyDisplayedNumber, displayedNumber: newlyDisplayedNumber, prevOperator: operatorSign, previousComputedNumber:  0})
  }else if (this.state.prevOperator === "÷"){
    // similar logic as multiplication
    let newlyComputedNumber = this.state.computedNumber / this.state.displayedNumber ;
    let newlyDisplayedNumber = newlyComputedNumber + this.state.previousComputedNumber;
    this.setState({[operatorNameAssociatedWithSignClicked]: true, computedNumber: newlyDisplayedNumber, displayedNumber: newlyDisplayedNumber,  prevOperator: operatorSign, previousComputedNumber:  0})
  } 
  else if (this.state.prevOperator === "="){
    // This allows me to chain operations even after an equal sign was clicked on
    this.setState({[operatorNameAssociatedWithSignClicked]: true,  prevOperator: operatorSign})
  }
}

handleMultiplicationAndDivision(operatorNameAssociatedWithSignClicked, operatorSign){
  if (this.state.prevOperator === "+"){
    // e.g 4 + 3 * // As soon as I click *, I want to separate 4 to be the previously computed number to respect
    // the priority of operations 
    this.setState({[operatorNameAssociatedWithSignClicked]: true, computedNumber: this.state.displayedNumber, previousComputedNumber:  this.state.computedNumber, prevOperator: operatorSign})
  } else if (this.state.prevOperator === "-"){
    // similar to -, but here the computed number is negative 
    // 10 - 4 * 2 => 10 is prevComputed number, 4 is displayed number, computed number is -4 so that when multiplication
    // ends I would have taken into account that I was trying to subtract beforehand
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
  // This is just finding the operator name when a sign is passed as an input
  // an object was created under this.operators where operator keys map to operators names
  return Object.keys(this.operators).find(operator => this.operators[operator] === operatorClicked);
}

displayDecimal(){
  // This function is called when a decimal number is about to be displayed to ensure that only 9 digits are in the
  // calculator screen
  let splitDecimalNumberOnDot = String(this.state.displayedNumber).split(".");
  if (splitDecimalNumberOnDot[0].length > 9){
    return Number((splitDecimalNumberOnDot[0]).toExponential(1)).toLocaleString() + "." + splitDecimalNumberOnDot[1];
  }else {
    return Number(splitDecimalNumberOnDot[0]).toLocaleString() + "." + splitDecimalNumberOnDot[1].slice(0, 9 - splitDecimalNumberOnDot[0].length);
  }
} 

handleDecimal(){
  // this is just adding a `.` to the displayed number key when I want to make my number a decimal
  this.setState((prevState) => {
    return {displayedNumber: prevState.displayedNumber + "."}
  })
}

handleCustomButtons(e){
  // This function handles the 3 buttons at the top left of the calculator
  // 1. resets everything on AC click
  // 2. turns number to either positive or negative depending on current state
  // 3. turns number to percentage
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
      return {displayedNumber: prevState.displayedNumber * - 1, computedNumber: prevState.displayedNumber * - 1}
    })
  } else if (e.target.innerHTML === "%"){
    this.setState((prevState) => {
      return {displayedNumber: prevState.displayedNumber /100 , computedNumber: prevState.displayedNumber /100}
    })
  }
}

displayResult(){
  // This is displaying a number when it is not a decimal
  // If the resulting number is very big, I want to have the +e sign to not have numbers
  // outside of the calculator screen, but also to respect whatever the Apple calculator is doing
  // If the number is less than 9 digits and is not a decimal, I just want to make sure it is 
  // separated by commas at every 3 digits
  if (String(this.state.displayedNumber).length > 9){
    return this.state.displayedNumber.toExponential(1);
  } else {
    return this.state.displayedNumber.toLocaleString()
  }
}

render(){
  const customButtons = ["AC", "+/-", "%"];
  const numbers =["7", "4", "1", "8", "5", "2", "9", "6", "3"];
  const isDecimal = String(this.state.displayedNumber).includes(".");
  const calculatorScreen = isDecimal ? this.displayDecimal() : this.displayResult();

  return(
    <section className="calculator">

    <div className="calculator-screen">{calculatorScreen}</div>

      <div className="calculator-board">
        
        <section className="non-operators-section">
          <CustomButtonsSection customButtons={customButtons} handleCustomButtons={this.handleCustomButtons}/>

          <OneToNineNumbersSection handleNumbers={this.handleNumbers} numbers={numbers}/>

          <OutliersSection handleNumbers={this.handleNumbers} handleDecimal={this.handleDecimal}/>
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
      <h1 className="credentials">Made by Lina Kherchi</h1>
    </section>
    )
  }
}