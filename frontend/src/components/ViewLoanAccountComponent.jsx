import React, { Component } from 'react'
import LoanAccountService from '../services/LoanAccountService'

class ViewLoanAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            loanAccount: {}
        }
    }

    componentDidMount(){
        LoanAccountService.getLoanAccountById(this.state.id).then( res => {
            this.setState({loanAccount: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View LoanAccount Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> loanNumber:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.loanNumber }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> principalAmount:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.principalAmount }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> outstandingPrincipal:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.outstandingPrincipal }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> interestRate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.interestRate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> originationDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.originationDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> maturityDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.maturityDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> paymentDayOfMonth:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.paymentDayOfMonth }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> currency:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.currency }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> LoanType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.loanType }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> RateType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.rateType }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Compounding:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.compounding }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.loanAccount.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewLoanAccountComponent
