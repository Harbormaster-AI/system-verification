import React, { Component } from 'react'
import AccountStatementService from '../services/AccountStatementService'

class ViewAccountStatementComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            accountStatement: {}
        }
    }

    componentDidMount(){
        AccountStatementService.getAccountStatementById(this.state.id).then( res => {
            this.setState({accountStatement: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View AccountStatement Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> statementNumber:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.accountStatement.statementNumber }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> periodStart:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.accountStatement.periodStart }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> periodEnd:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.accountStatement.periodEnd }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> openingBalance:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.accountStatement.openingBalance }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> closingBalance:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.accountStatement.closingBalance }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> DeliveryMethod:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.accountStatement.deliveryMethod }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewAccountStatementComponent
