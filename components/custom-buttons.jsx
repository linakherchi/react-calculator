import React from "react";
import CustomButton from './custom-button';


export default class CustomButtonsSection extends React.Component {
  render(){
    const {customButtons, handleCustomButtons} = this.props;
    return (
        <ul className="custom-operators" onClick={handleCustomButtons}>
            {customButtons.map((customButton) => {
                return (
                <button key={customButton}>
                    <CustomButton customButton={customButton}/>
                </button>
                )
            })}
        </ul>
    )
  }
}
