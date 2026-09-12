import React, { Component } from 'react'
import FundsTransferService from '../services/FundsTransferService'

class ViewFundsTransferComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            fundsTransfer: {}
        }
    }

    componentDidMount(){
        FundsTransferService.getFundsTransferById(this.state.id).then( res => {
            this.setState({fundsTransfer: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View FundsTransfer Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> transferReference:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fundsTransfer.transferReference }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> amount:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fundsTransfer.amount }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> requestedDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fundsTransfer.requestedDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> executionDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fundsTransfer.executionDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> purpose:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fundsTransfer.purpose }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> feeAmount:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fundsTransfer.feeAmount }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Method:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fundsTransfer.method }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fundsTransfer.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewFundsTransferComponent
