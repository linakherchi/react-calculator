export default class OperatorsSection extends React.Component{
    render(){
        const {performOperation, operators} = this.props;
        return (
            <ul className="operators-section" onClick={performOperation}> 
                {Object.keys(operators).map((operator) => {
                    return (
                    <button className={`colorize-operators`} id={`${this.state[operator] ? "switch-colors" : ""}`} key={operator}>
                        <OperatorButton operator={operators[operator]}/>
                    </button>
                    )
                })}
            </ul>
        )
    }
}