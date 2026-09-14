import React, { Component } from 'react'
import LoanPaymentService from '../services/LoanPaymentService'

class ViewLoanPaymentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            loanPayment: {}
        }
    }

    componentDidMount(){
        LoanPaymentService.getLoanPaymentById(this.state.id).then( res => {
            this.setState({loanPayment: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View LoanPayment Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> paymentReference:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanPayment.paymentReference }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> amount:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanPayment.amount }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> paymentDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanPayment.paymentDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Method:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanPayment.method }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanPayment.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewLoanPaymentComponent
