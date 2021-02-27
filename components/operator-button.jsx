import React from "react";

export default class OperatorButton extends React.Component {
    render(){
        return (
            <button className="colorize-operators-section">{this.props.operator}</button>
        )
    }
}