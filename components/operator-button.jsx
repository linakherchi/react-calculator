import React from "react";

export default class OperatorButton extends React.Component {
    render(){
        return (
            <button>{this.props.operator}</button>
        )
    }
}