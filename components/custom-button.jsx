import React from "react";

export default class CustomButton extends React.Component {
    render(){
        return (
            <button>{this.props.customButton}</button>
        )
    }
}