import React, { Component } from 'react'
import TransactionService from '../services/TransactionService'

class ViewTransactionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            transaction: {}
        }
    }

    componentDidMount(){
        TransactionService.getTransactionById(this.state.id).then( res => {
            this.setState({transaction: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Transaction Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> bookingDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.transaction.bookingDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> valueDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.transaction.valueDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> amount:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.transaction.amount }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> description:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.transaction.description }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Direction:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.transaction.direction }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> TransactionType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.transaction.transactionType }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.transaction.status }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Channel:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.transaction.channel }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewTransactionComponent
