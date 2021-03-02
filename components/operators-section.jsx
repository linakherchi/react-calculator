import React from 'react';
import OperatorButton from './operator-button';

export default class OperatorsSection extends React.Component {
  constructor(){
  super(props)
  }

  performOperation(e){
  // If there was no previous operator, I do not want to perform an operator. Instead, I just want to display a new number
  const operatorNameAssociatedWithSignClicked = this.findOperatorNameAssociatedWithSign(e.target.innerHTML);
  let computedNumber;
  if (!this.state.prevOperator){
  computedNumber = Number(this.state.displayedNumber);
  this.setState({[operatorNameAssociatedWithSignClicked]: true, displayedNumber: computedNumber, computedNumber, prevOperator: e.target.innerHTML})
  }
  if (e.target.innerHTML === "+" || e.target.innerHTML === "-"){
  this.handleAdditionAndSubtraction(operatorNameAssociatedWithSignClicked, e.target.innerHTML)
  } else if (e.target.innerHTML === "x" || e.target.innerHTML === "÷"){
  this.handleMultiplicationAndDivision(operatorNameAssociatedWithSignClicked, e.target.innerHTML)
  }
  }


render(){
  <ul className="operators-section" onClick={this.performOperation}> 
  {Object.keys(this.operators).map((operator) => {
    return (
    <button className={`colorize-operators`} id={`${this.state[operator] ? "switch-colors" : ""}`} key={operator}>
        <OperatorButton operator={this.operators[operator]}/>
    </button>
    )
  })}
  </ul>
  }
}