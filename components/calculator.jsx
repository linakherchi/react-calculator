import React from "react";
import OperatorButton from './operator-button';
import CustomButton from './custom-button';
import NumberButton from './number-button';

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
                  previousComputedNumber: 0};
    this.handleNumbers = this.handleNumbers.bind(this);
    // this.handleDecimal = this.handleDecimal.bind(this);
    this.performOperation = this.performOperation.bind(this);
    this.numbers = ["7", "4", "1", "8", "5", "2", "9", "6", "3"];

  }
 // 1 => DP 1  CP 1
 // + => DP 1  CP 1
 // 2 => DP 2  CP 3
 // + => DP 3  CP 3
 // 5 => DP 5  CP 8 


 // 1 ->  DP 1   CP 1
 // - ->  DP 1   CP 1
 // 5 ->  DP 5   CP -4
 // - ->  DP -4  CP -4
 // 12 -> DP 12  CP -16
 // -  -> DP -16 CP -16 

 // to note: computed number and prevOperation are null at the same time

 

handleNumbers(e){
  if (e.target.localName !== "ul"){
    if (this.state.addition){
      this.handleAddition(e.target.innerHTML)
    } else if (this.state.subtraction){
      this.handleSubtraction(e.target.innerHTML)
    } else if (this.state.multiplication){
      this.handleMultiplication(e.target.innerHTML)
    } else if (this.state.division){
      this.handleDivision(e.target.innerHTML)
    }
     else {
      this.setState((prevState) => {
        if (prevState.displayedNumber === 0 && "" + + prevState.displayedNumber.length === 1){
            return {displayedNumber: Number(e.target.innerHTML)}
        } else {
          return {displayedNumber: Number("" + prevState.displayedNumber + e.target.innerHTML)}
        }
      })
    }
  }    
}

handleAddition(typedNumber){
  this.setState({addition: false, displayedNumber: Number(typedNumber)})
}

handleSubtraction(typedNumber){
  this.setState({subtraction: false, displayedNumber: Number(typedNumber)})
}

handleMultiplication(typedNumber){
  this.setState({multiplication: false, displayedNumber: Number(typedNumber)})
}

handleDivision(typedNumber){
  this.setState({division: false, displayedNumber: Number(typedNumber)})
}

performOperation(e){
  // console.log(this.state.prevOperator)
  // console.log(this.state.computedNumber)
  if (e.target.innerHTML === "+"){
    // console.log(this.state)
    if (!this.state.prevOperator){
      let newComputedNumber = this.state.computedNumber ? this.state.computedNumber + Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
      this.setState({addition: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "+"})
    } else {
      if (this.state.prevOperator === "+"){
        
        
        let newComputedNumber = this.state.computedNumber ? this.state.computedNumber + Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
        this.setState({addition: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "+"})

      } else if (this.state.prevOperator === "-"){
        let newComputedNumber = this.state.computedNumber ? this.state.computedNumber - Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
        this.setState({addition: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "+"})
      }else if (this.state.prevOperator === "x"){
        

        let newlyComputedNumber = Number(this.state.displayedNumber) * this.state.computedNumber;
        let newlyDisplayedNumber = newlyComputedNumber + this.state.previousComputedNumber;

 
        this.setState({addition: true, prevOperator: "+", computedNumber: newlyDisplayedNumber, displayedNumber: newlyDisplayedNumber, previousComputedNumber:  0})
        
      }else if (this.state.prevOperator === "÷"){
        let newlyComputedNumber = this.state.computedNumber / Number(this.state.displayedNumber) ;
        let newlyDisplayedNumber = newlyComputedNumber + this.state.previousComputedNumber;

        console.log(newlyDisplayedNumber)
        this.setState({addition: true, prevOperator: "+", computedNumber: newlyDisplayedNumber, displayedNumber: newlyDisplayedNumber, previousComputedNumber:  0})
      }
    }
      
  } else if (e.target.innerHTML === "-"){
    if (!this.state.prevOperator){
      let newComputedNumber = this.state.computedNumber ? this.state.computedNumber - Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
      this.setState({subtraction: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "-"})
    } else {
      if (this.state.prevOperator === "+"){
        let newComputedNumber = this.state.computedNumber ? this.state.computedNumber + Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
        this.setState({subtraction: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "-"})
      } else  if (this.state.prevOperator === "-"){
        let newComputedNumber = this.state.computedNumber ? this.state.computedNumber - Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
        this.setState({subtraction: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "-"})
      }else if (this.state.prevOperator === "x"){
        let newComputedNumber =  this.state.computedNumber * Number(this.state.displayedNumber) 
        this.setState({subtraction: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "-"})

      }else if (this.state.prevOperator === "÷"){
        let newComputedNumber = this.state.computedNumber ? this.state.computedNumber / Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
        this.setState({subtraction: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "-"})
      }
    }

  } else if (e.target.innerHTML === "x"){
    if (!this.state.prevOperator){
      let newComputedNumber = this.state.computedNumber ? this.state.computedNumber * Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
      this.setState({multiplication: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "x"})
    } else {
      if (this.state.prevOperator === "+"){
        let newlyComputedNumber = Number(this.state.displayedNumber) + this.state.computedNumber;
        let newlyPreviousComputedNumber = newlyComputedNumber - (Number(this.state.displayedNumber))
        this.setState({multiplication: true,  computedNumber: Number(this.state.displayedNumber), previousComputedNumber:  newlyPreviousComputedNumber, prevOperator: "x"})

      } else if (this.state.prevOperator === "-"){
        let newlyComputedNumber = this.state.computedNumber - Number(this.state.displayedNumber)
        let newlyPreviousComputedNumber = newlyComputedNumber - (- Number(this.state.displayedNumber))

        this.setState({multiplication: true,  computedNumber: - Number(this.state.displayedNumber), previousComputedNumber: newlyPreviousComputedNumber,prevOperator: "x"})
      } else if (this.state.prevOperator === "x"){
        let newComputedNumber = this.state.computedNumber ? this.state.computedNumber * Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
        this.setState({multiplication: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "x"})
      } else if (this.state.prevOperator === "÷"){
        let newComputedNumber = this.state.computedNumber ? this.state.computedNumber / Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
        this.setState({multiplication: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "x"})
      }
    }
  } else if (e.target.innerHTML === "÷"){
    if (!this.state.prevOperator){
      let newComputedNumber = this.state.computedNumber ? this.state.computedNumber / Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
      this.setState({division: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "÷"})
    } else {
      if (this.state.prevOperator === "+"){
        let newlyComputedNumber = Number(this.state.displayedNumber) + this.state.computedNumber;
        let newlyPreviousComputedNumber = newlyComputedNumber - (Number(this.state.displayedNumber))
        this.setState({division: true,  computedNumber: Number(this.state.displayedNumber), previousComputedNumber:  newlyPreviousComputedNumber, prevOperator: "÷"})
      } else if (this.state.prevOperator === "-"){
        let newComputedNumber = this.state.computedNumber ? this.state.computedNumber - Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
        this.setState({division: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "÷"})
      } else if (this.state.prevOperator === "x"){
        let newComputedNumber = this.state.computedNumber ? this.state.computedNumber * Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
        this.setState({division: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "÷"})
      } else if (this.state.prevOperator === "÷"){
        let newComputedNumber = this.state.computedNumber ? this.state.computedNumber / Number(this.state.displayedNumber) : Number(this.state.displayedNumber)
        this.setState({division: true, displayedNumber: newComputedNumber, computedNumber: newComputedNumber, prevOperator: "÷"})
      }
    }
  }
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