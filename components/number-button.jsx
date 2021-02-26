import React from "react";

export default class NumberButton extends React.Component {
    render(){
        return (
            <button>{this.props.number}</button>
        )
    }
}