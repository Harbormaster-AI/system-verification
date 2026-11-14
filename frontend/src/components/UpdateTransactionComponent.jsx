import React, { Component } from 'react'
import TransactionService from '../services/TransactionService';

class UpdateTransactionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                bookingDate: '',
                valueDate: '',
                amount: '',
                description: '',
                direction: '',
                transactionType: '',
                status: '',
                channel: ''
        }
        this.updateTransaction = this.updateTransaction.bind(this);

        this.changebookingDateHandler = this.changebookingDateHandler.bind(this);
        this.changevalueDateHandler = this.changevalueDateHandler.bind(this);
        this.changeamountHandler = this.changeamountHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.changeDirectionHandler = this.changeDirectionHandler.bind(this);
        this.changeTransactionTypeHandler = this.changeTransactionTypeHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeChannelHandler = this.changeChannelHandler.bind(this);
    }

    componentDidMount(){
        TransactionService.getTransactionById(this.state.id).then( (res) =>{
            let transaction = res.data;
            this.setState({
                bookingDate: transaction.bookingDate,
                valueDate: transaction.valueDate,
                amount: transaction.amount,
                description: transaction.description,
                direction: transaction.direction,
                transactionType: transaction.transactionType,
                status: transaction.status,
                channel: transaction.channel
            });
        });
    }

    updateTransaction = (e) => {
        e.preventDefault();
        let transaction = {
            transactionId: this.state.id,
            bookingDate: this.state.bookingDate,
            valueDate: this.state.valueDate,
            amount: this.state.amount,
            description: this.state.description,
            direction: this.state.direction,
            transactionType: this.state.transactionType,
            status: this.state.status,
            channel: this.state.channel
        };
        console.log('transaction => ' + JSON.stringify(transaction));
        console.log('id => ' + JSON.stringify(this.state.id));
        TransactionService.updateTransaction(transaction).then( res => {
            this.props.history.push('/transactions');
        });
    }

    changebookingDateHandler= (event) => {
        this.setState({bookingDate: event.target.value});
    }
    changevalueDateHandler= (event) => {
        this.setState({valueDate: event.target.value});
    }
    changeamountHandler= (event) => {
        this.setState({amount: event.target.value});
    }
    changedescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
    changeDirectionHandler= (event) => {
        this.setState({direction: event.target.value});
    }
    changeTransactionTypeHandler= (event) => {
        this.setState({transactionType: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }
    changeChannelHandler= (event) => {
        this.setState({channel: event.target.value});
    }

    cancel(){
        this.props.history.push('/transactions');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Transaction</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> bookingDate: </label>
                                                <input type="date" placeholder="bookingDate" name="bookingDate" className="form-control" value={this.state.bookingDate} onChange={this.changebookingDateHandler}/>

                                            <label> valueDate: </label>
                                                <input type="date" placeholder="valueDate" name="valueDate" className="form-control" value={this.state.valueDate} onChange={this.changevalueDateHandler}/>

                                            <label> amount: </label>
                                                <input placeholder="amount" name="amount" className="form-control" value={this.state.amount} onChange={this.changeamountHandler}/>

                                            <label> description: </label>
                                                <input placeholder="description" name="description" className="form-control" value={this.state.description} onChange={this.changedescriptionHandler}/>

                                            <label> Direction: </label>
                                                <select value={this.state.direction} onChange={this.changeDirectionHandler}>
                      <option name="Direction" className="form-control" >
                          Credit
                      </option>
                      <option name="Direction" className="form-control" >
                          Debit
                      </option>
                    </select>

                                            <label> TransactionType: </label>
                                                <select value={this.state.transactionType} onChange={this.changeTransactionTypeHandler}>
                      <option name="TransactionType" className="form-control" >
                          Deposit
                      </option>
                      <option name="TransactionType" className="form-control" >
                          Withdrawal
                      </option>
                      <option name="TransactionType" className="form-control" >
                          Transfer
                      </option>
                      <option name="TransactionType" className="form-control" >
                          Payment
                      </option>
                      <option name="TransactionType" className="form-control" >
                          Fee
                      </option>
                      <option name="TransactionType" className="form-control" >
                          Interest
                      </option>
                      <option name="TransactionType" className="form-control" >
                          Adjustment
                      </option>
                      <option name="TransactionType" className="form-control" >
                          Chargeback
                      </option>
                      <option name="TransactionType" className="form-control" >
                          Refund
                      </option>
                      <option name="TransactionType" className="form-control" >
                          FXConversion
                      </option>
                    </select>

                                            <label> Status: </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Pending
                      </option>
                      <option name="Status" className="form-control" >
                          Posted
                      </option>
                      <option name="Status" className="form-control" >
                          Reversed
                      </option>
                      <option name="Status" className="form-control" >
                          Failed
                      </option>
                      <option name="Status" className="form-control" >
                          Cancelled
                      </option>
                    </select>

                                            <label> Channel: </label>
                                                <select value={this.state.channel} onChange={this.changeChannelHandler}>
                      <option name="Channel" className="form-control" >
                          Branch
                      </option>
                      <option name="Channel" className="form-control" >
                          Online
                      </option>
                      <option name="Channel" className="form-control" >
                          Mobile
                      </option>
                      <option name="Channel" className="form-control" >
                          ATM
                      </option>
                      <option name="Channel" className="form-control" >
                          API
                      </option>
                      <option name="Channel" className="form-control" >
                          CallCenter
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateTransaction}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateTransactionComponent
