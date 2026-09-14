import React, { Component } from 'react'
import StandingInstructionService from '../services/StandingInstructionService'

class ViewStandingInstructionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            standingInstruction: {}
        }
    }

    componentDidMount(){
        StandingInstructionService.getStandingInstructionById(this.state.id).then( res => {
            this.setState({standingInstruction: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View StandingInstruction Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> instructionId:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.standingInstruction.instructionId }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> amount:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.standingInstruction.amount }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> nextExecutionDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.standingInstruction.nextExecutionDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Frequency:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.standingInstruction.frequency }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.standingInstruction.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewStandingInstructionComponent
