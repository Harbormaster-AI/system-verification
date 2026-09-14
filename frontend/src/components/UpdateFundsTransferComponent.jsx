import React, { Component } from 'react'
import FundsTransferService from '../services/FundsTransferService';

class UpdateFundsTransferComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                transferReference: '',
                amount: '',
                requestedDate: '',
                executionDate: '',
                purpose: '',
                feeAmount: '',
                method: '',
                status: ''
        }
        this.updateFundsTransfer = this.updateFundsTransfer.bind(this);

        this.changetransferReferenceHandler = this.changetransferReferenceHandler.bind(this);
        this.changeamountHandler = this.changeamountHandler.bind(this);
        this.changerequestedDateHandler = this.changerequestedDateHandler.bind(this);
        this.changeexecutionDateHandler = this.changeexecutionDateHandler.bind(this);
        this.changepurposeHandler = this.changepurposeHandler.bind(this);
        this.changefeeAmountHandler = this.changefeeAmountHandler.bind(this);
        this.changeMethodHandler = this.changeMethodHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
        FundsTransferService.getFundsTransferById(this.state.id).then( (res) =>{
            let fundsTransfer = res.data;
            this.setState({
                transferReference: fundsTransfer.transferReference,
                amount: fundsTransfer.amount,
                requestedDate: fundsTransfer.requestedDate,
                executionDate: fundsTransfer.executionDate,
                purpose: fundsTransfer.purpose,
                feeAmount: fundsTransfer.feeAmount,
                method: fundsTransfer.method,
                status: fundsTransfer.status
            });
        });
    }

    updateFundsTransfer = (e) => {
        e.preventDefault();
        let fundsTransfer = {
            fundsTransferId: this.state.id,
            transferReference: this.state.transferReference,
            amount: this.state.amount,
            requestedDate: this.state.requestedDate,
            executionDate: this.state.executionDate,
            purpose: this.state.purpose,
            feeAmount: this.state.feeAmount,
            method: this.state.method,
            status: this.state.status
        };
        console.log('fundsTransfer => ' + JSON.stringify(fundsTransfer));
        console.log('id => ' + JSON.stringify(this.state.id));
        FundsTransferService.updateFundsTransfer(fundsTransfer).then( res => {
            this.props.history.push('/fundsTransfers');
        });
    }

    changetransferReferenceHandler= (event) => {
        this.setState({transferReference: event.target.value});
    }
    changeamountHandler= (event) => {
        this.setState({amount: event.target.value});
    }
    changerequestedDateHandler= (event) => {
        this.setState({requestedDate: event.target.value});
    }
    changeexecutionDateHandler= (event) => {
        this.setState({executionDate: event.target.value});
    }
    changepurposeHandler= (event) => {
        this.setState({purpose: event.target.value});
    }
    changefeeAmountHandler= (event) => {
        this.setState({feeAmount: event.target.value});
    }
    changeMethodHandler= (event) => {
        this.setState({method: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/fundsTransfers');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update FundsTransfer</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> transferReference: </label>
                                                <input placeholder="transferReference" name="transferReference" className="form-control" value={this.state.transferReference} onChange={this.changetransferReferenceHandler}/>

                                            <label> amount: </label>
                                                <input placeholder="amount" name="amount" className="form-control" value={this.state.amount} onChange={this.changeamountHandler}/>

                                            <label> requestedDate: </label>
                                                <input type="date" placeholder="requestedDate" name="requestedDate" className="form-control" value={this.state.requestedDate} onChange={this.changerequestedDateHandler}/>

                                            <label> executionDate: </label>
                                                <input type="date" placeholder="executionDate" name="executionDate" className="form-control" value={this.state.executionDate} onChange={this.changeexecutionDateHandler}/>

                                            <label> purpose: </label>
                                                <input placeholder="purpose" name="purpose" className="form-control" value={this.state.purpose} onChange={this.changepurposeHandler}/>

                                            <label> feeAmount: </label>
                                                <input placeholder="feeAmount" name="feeAmount" className="form-control" value={this.state.feeAmount} onChange={this.changefeeAmountHandler}/>

                                            <label> Method: </label>
                                                <select value={this.state.method} onChange={this.changeMethodHandler}>
                      <option name="Method" className="form-control" >
                          InternalTransfer
                      </option>
                      <option name="Method" className="form-control" >
                          ACH
                      </option>
                      <option name="Method" className="form-control" >
                          Wire
                      </option>
                      <option name="Method" className="form-control" >
                          SEPA
                      </option>
                      <option name="Method" className="form-control" >
                          SWIFT
                      </option>
                      <option name="Method" className="form-control" >
                          Card
                      </option>
                      <option name="Method" className="form-control" >
                          Cash
                      </option>
                      <option name="Method" className="form-control" >
                          Check
                      </option>
                      <option name="Method" className="form-control" >
                          MobileWallet
                      </option>
                    </select>

                                            <label> Status: </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Initiated
                      </option>
                      <option name="Status" className="form-control" >
                          InProcess
                      </option>
                      <option name="Status" className="form-control" >
                          Settled
                      </option>
                      <option name="Status" className="form-control" >
                          Failed
                      </option>
                      <option name="Status" className="form-control" >
                          Reversed
                      </option>
                      <option name="Status" className="form-control" >
                          Cancelled
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateFundsTransfer}>Save</button>
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

export default UpdateFundsTransferComponent
