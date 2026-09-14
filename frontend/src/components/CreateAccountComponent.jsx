import React, { Component } from 'react'
import AccountService from '../services/AccountService';

class CreateAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                accountNumber: '',
                iban: '',
                accountName: '',
                currency: '',
                openedOn: '',
                closedOn: '',
                accountType: '',
                ownershipType: '',
                status: ''
        }
        this.changeaccountNumberHandler = this.changeaccountNumberHandler.bind(this);
        this.changeibanHandler = this.changeibanHandler.bind(this);
        this.changeaccountNameHandler = this.changeaccountNameHandler.bind(this);
        this.changecurrencyHandler = this.changecurrencyHandler.bind(this);
        this.changeopenedOnHandler = this.changeopenedOnHandler.bind(this);
        this.changeclosedOnHandler = this.changeclosedOnHandler.bind(this);
        this.changeAccountTypeHandler = this.changeAccountTypeHandler.bind(this);
        this.changeOwnershipTypeHandler = this.changeOwnershipTypeHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            AccountService.getAccountById(this.state.id).then( (res) =>{
                let account = res.data;
                this.setState({
                    accountNumber: account.accountNumber,
                    iban: account.iban,
                    accountName: account.accountName,
                    currency: account.currency,
                    openedOn: account.openedOn,
                    closedOn: account.closedOn,
                    accountType: account.accountType,
                    ownershipType: account.ownershipType,
                    status: account.status
                });
            });
        }        
    }
    saveOrUpdateAccount = (e) => {
        e.preventDefault();
        let account = {
                accountId: this.state.id,
                accountNumber: this.state.accountNumber,
                iban: this.state.iban,
                accountName: this.state.accountName,
                currency: this.state.currency,
                openedOn: this.state.openedOn,
                closedOn: this.state.closedOn,
                accountType: this.state.accountType,
                ownershipType: this.state.ownershipType,
                status: this.state.status
            };
        console.log('account => ' + JSON.stringify(account));

        // step 5
        if(this.state.id === '_add'){
            account.accountId=''
            AccountService.createAccount(account).then(res =>{
                this.props.history.push('/accounts');
            });
        }else{
            AccountService.updateAccount(account).then( res => {
                this.props.history.push('/accounts');
            });
        }
    }
    
    changeaccountNumberHandler= (event) => {
        this.setState({accountNumber: event.target.value});
    }
    changeibanHandler= (event) => {
        this.setState({iban: event.target.value});
    }
    changeaccountNameHandler= (event) => {
        this.setState({accountName: event.target.value});
    }
    changecurrencyHandler= (event) => {
        this.setState({currency: event.target.value});
    }
    changeopenedOnHandler= (event) => {
        this.setState({openedOn: event.target.value});
    }
    changeclosedOnHandler= (event) => {
        this.setState({closedOn: event.target.value});
    }
    changeAccountTypeHandler= (event) => {
        this.setState({accountType: event.target.value});
    }
    changeOwnershipTypeHandler= (event) => {
        this.setState({ownershipType: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/accounts');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Account</h3>
        }else{
            return <h3 className="text-center">Update Account</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> accountNumber:&emsp; </label>
                                                <input placeholder="accountNumber" name="accountNumber" className="form-control" value={this.state.accountNumber} onChange={this.changeaccountNumberHandler}/>

                                            <label> iban:&emsp; </label>
                                                <input placeholder="iban" name="iban" className="form-control" value={this.state.iban} onChange={this.changeibanHandler}/>

                                            <label> accountName:&emsp; </label>
                                                <input placeholder="accountName" name="accountName" className="form-control" value={this.state.accountName} onChange={this.changeaccountNameHandler}/>

                                            <label> currency:&emsp; </label>
                                                <input placeholder="currency" name="currency" className="form-control" value={this.state.currency} onChange={this.changecurrencyHandler}/>

                                            <label> openedOn:&emsp; </label>
                                                <input type="date" placeholder="openedOn" name="openedOn" className="form-control" value={this.state.openedOn} onChange={this.changeopenedOnHandler}/>

                                            <label> closedOn:&emsp; </label>
                                                <input type="date" placeholder="closedOn" name="closedOn" className="form-control" value={this.state.closedOn} onChange={this.changeclosedOnHandler}/>

                                            <label> AccountType:&emsp; </label>
                                                <select value={this.state.accountType} onChange={this.changeAccountTypeHandler}>
                      <option name="AccountType" className="form-control" >
                          Checking
                      </option>
                      <option name="AccountType" className="form-control" >
                          Savings
                      </option>
                      <option name="AccountType" className="form-control" >
                          MoneyMarket
                      </option>
                      <option name="AccountType" className="form-control" >
                          TimeDeposit
                      </option>
                    </select>

                                            <label> OwnershipType:&emsp; </label>
                                                <select value={this.state.ownershipType} onChange={this.changeOwnershipTypeHandler}>
                      <option name="OwnershipType" className="form-control" >
                          Sole
                      </option>
                      <option name="OwnershipType" className="form-control" >
                          Joint
                      </option>
                      <option name="OwnershipType" className="form-control" >
                          Corporate
                      </option>
                      <option name="OwnershipType" className="form-control" >
                          Trust
                      </option>
                    </select>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Open
                      </option>
                      <option name="Status" className="form-control" >
                          Frozen
                      </option>
                      <option name="Status" className="form-control" >
                          Dormant
                      </option>
                      <option name="Status" className="form-control" >
                          Closed
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateAccount}>Save</button>
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

export default CreateAccountComponent
