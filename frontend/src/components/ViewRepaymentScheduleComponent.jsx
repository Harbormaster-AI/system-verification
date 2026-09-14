import React, { Component } from 'react'
import RepaymentScheduleService from '../services/RepaymentScheduleService'

class ViewRepaymentScheduleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            repaymentSchedule: {}
        }
    }

    componentDidMount(){
        RepaymentScheduleService.getRepaymentScheduleById(this.state.id).then( res => {
            this.setState({repaymentSchedule: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View RepaymentSchedule Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> installmentNumber:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.repaymentSchedule.installmentNumber }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> dueDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.repaymentSchedule.dueDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> principalDue:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.repaymentSchedule.principalDue }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> interestDue:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.repaymentSchedule.interestDue }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> totalDue:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.repaymentSchedule.totalDue }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.repaymentSchedule.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewRepaymentScheduleComponent
