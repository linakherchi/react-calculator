import React from 'react';
import NumberButton from './number-button';


export default class OutliersSection extends React.Component{
    render(){
        const {handleNumbers, handleDecimal} = this.props;
        return(
            <ul className="outliers">
                <button id="outlier-zero" onClick={handleNumbers}>
                    <NumberButton number={"0"} />
                </button>
                <button onClick={handleDecimal}>.</button>
            </ul>
        )
    }
}

