import React from 'react';
import NumberButton from './number-button';

export default class OneToNineNumbersSection extends React.Component {
    render(){
        const {handleNumbers, numbers} = this.props;
        return (
            <ul className="one-to-nine-numbers" onClick={handleNumbers}>
                {numbers.map(number => {
                    return (
                    <button key={number} id="number-button">
                        <NumberButton key={number} number={number} />
                    </button>  
                    )
                })}
            </ul>
        )
    }
}

