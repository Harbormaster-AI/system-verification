import React, { Component } from 'react'
import LoanAccountService from '../services/LoanAccountService';

class CreateLoanAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                loanNumber: '',
                principalAmount: '',
                outstandingPrincipal: '',
                interestRate: '',
                originationDate: '',
                maturityDate: '',
                paymentDayOfMonth: '',
                currency: '',
                loanType: '',
                rateType: '',
                compounding: '',
                status: ''
        }
        this.changeloanNumberHandler = this.changeloanNumberHandler.bind(this);
        this.changeprincipalAmountHandler = this.changeprincipalAmountHandler.bind(this);
        this.changeoutstandingPrincipalHandler = this.changeoutstandingPrincipalHandler.bind(this);
        this.changeinterestRateHandler = this.changeinterestRateHandler.bind(this);
        this.changeoriginationDateHandler = this.changeoriginationDateHandler.bind(this);
        this.changematurityDateHandler = this.changematurityDateHandler.bind(this);
        this.changepaymentDayOfMonthHandler = this.changepaymentDayOfMonthHandler.bind(this);
        this.changecurrencyHandler = this.changecurrencyHandler.bind(this);
        this.changeLoanTypeHandler = this.changeLoanTypeHandler.bind(this);
        this.changeRateTypeHandler = this.changeRateTypeHandler.bind(this);
        this.changeCompoundingHandler = this.changeCompoundingHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            LoanAccountService.getLoanAccountById(this.state.id).then( (res) =>{
                let loanAccount = res.data;
                this.setState({
                    loanNumber: loanAccount.loanNumber,
                    principalAmount: loanAccount.principalAmount,
                    outstandingPrincipal: loanAccount.outstandingPrincipal,
                    interestRate: loanAccount.interestRate,
                    originationDate: loanAccount.originationDate,
                    maturityDate: loanAccount.maturityDate,
                    paymentDayOfMonth: loanAccount.paymentDayOfMonth,
                    currency: loanAccount.currency,
                    loanType: loanAccount.loanType,
                    rateType: loanAccount.rateType,
                    compounding: loanAccount.compounding,
                    status: loanAccount.status
                });
            });
        }        
    }
    saveOrUpdateLoanAccount = (e) => {
        e.preventDefault();
        let loanAccount = {
                loanAccountId: this.state.id,
                loanNumber: this.state.loanNumber,
                principalAmount: this.state.principalAmount,
                outstandingPrincipal: this.state.outstandingPrincipal,
                interestRate: this.state.interestRate,
                originationDate: this.state.originationDate,
                maturityDate: this.state.maturityDate,
                paymentDayOfMonth: this.state.paymentDayOfMonth,
                currency: this.state.currency,
                loanType: this.state.loanType,
                rateType: this.state.rateType,
                compounding: this.state.compounding,
                status: this.state.status
            };
        console.log('loanAccount => ' + JSON.stringify(loanAccount));

        // step 5
        if(this.state.id === '_add'){
            loanAccount.loanAccountId=''
            LoanAccountService.createLoanAccount(loanAccount).then(res =>{
                this.props.history.push('/loanAccounts');
            });
        }else{
            LoanAccountService.updateLoanAccount(loanAccount).then( res => {
                this.props.history.push('/loanAccounts');
            });
        }
    }
    
    changeloanNumberHandler= (event) => {
        this.setState({loanNumber: event.target.value});
    }
    changeprincipalAmountHandler= (event) => {
        this.setState({principalAmount: event.target.value});
    }
    changeoutstandingPrincipalHandler= (event) => {
        this.setState({outstandingPrincipal: event.target.value});
    }
    changeinterestRateHandler= (event) => {
        this.setState({interestRate: event.target.value});
    }
    changeoriginationDateHandler= (event) => {
        this.setState({originationDate: event.target.value});
    }
    changematurityDateHandler= (event) => {
        this.setState({maturityDate: event.target.value});
    }
    changepaymentDayOfMonthHandler= (event) => {
        this.setState({paymentDayOfMonth: event.target.value});
    }
    changecurrencyHandler= (event) => {
        this.setState({currency: event.target.value});
    }
    changeLoanTypeHandler= (event) => {
        this.setState({loanType: event.target.value});
    }
    changeRateTypeHandler= (event) => {
        this.setState({rateType: event.target.value});
    }
    changeCompoundingHandler= (event) => {
        this.setState({compounding: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/loanAccounts');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add LoanAccount</h3>
        }else{
            return <h3 className="text-center">Update LoanAccount</h3>
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
                                            <label> loanNumber:&emsp; </label>
                                                <input placeholder="loanNumber" name="loanNumber" className="form-control" value={this.state.loanNumber} onChange={this.changeloanNumberHandler}/>

                                            <label> principalAmount:&emsp; </label>
                                                <input placeholder="principalAmount" name="principalAmount" className="form-control" value={this.state.principalAmount} onChange={this.changeprincipalAmountHandler}/>

                                            <label> outstandingPrincipal:&emsp; </label>
                                                <input placeholder="outstandingPrincipal" name="outstandingPrincipal" className="form-control" value={this.state.outstandingPrincipal} onChange={this.changeoutstandingPrincipalHandler}/>

                                            <label> interestRate:&emsp; </label>
                                                <input placeholder="interestRate" name="interestRate" className="form-control" value={this.state.interestRate} onChange={this.changeinterestRateHandler}/>

                                            <label> originationDate:&emsp; </label>
                                                <input type="date" placeholder="originationDate" name="originationDate" className="form-control" value={this.state.originationDate} onChange={this.changeoriginationDateHandler}/>

                                            <label> maturityDate:&emsp; </label>
                                                <input type="date" placeholder="maturityDate" name="maturityDate" className="form-control" value={this.state.maturityDate} onChange={this.changematurityDateHandler}/>

                                            <label> paymentDayOfMonth:&emsp; </label>
                                                <input type="number" placeholder="paymentDayOfMonth" name="paymentDayOfMonth" className="form-control" value={this.state.paymentDayOfMonth} onChange={this.changepaymentDayOfMonthHandler}/>

                                            <label> currency:&emsp; </label>
                                                <input placeholder="currency" name="currency" className="form-control" value={this.state.currency} onChange={this.changecurrencyHandler}/>

                                            <label> LoanType:&emsp; </label>
                                                <select value={this.state.loanType} onChange={this.changeLoanTypeHandler}>
                      <option name="LoanType" className="form-control" >
                          Mortgage
                      </option>
                      <option name="LoanType" className="form-control" >
                          Personal
                      </option>
                      <option name="LoanType" className="form-control" >
                          Auto
                      </option>
                      <option name="LoanType" className="form-control" >
                          SmallBusiness
                      </option>
                      <option name="LoanType" className="form-control" >
                          CreditLine
                      </option>
                      <option name="LoanType" className="form-control" >
                          Student
                      </option>
                    </select>

                                            <label> RateType:&emsp; </label>
                                                <select value={this.state.rateType} onChange={this.changeRateTypeHandler}>
                      <option name="RateType" className="form-control" >
                          Fixed
                      </option>
                      <option name="RateType" className="form-control" >
                          Variable
                      </option>
                    </select>

                                            <label> Compounding:&emsp; </label>
                                                <select value={this.state.compounding} onChange={this.changeCompoundingHandler}>
                      <option name="Compounding" className="form-control" >
                          Daily
                      </option>
                      <option name="Compounding" className="form-control" >
                          Monthly
                      </option>
                      <option name="Compounding" className="form-control" >
                          Quarterly
                      </option>
                      <option name="Compounding" className="form-control" >
                          Annually
                      </option>
                    </select>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Applied
                      </option>
                      <option name="Status" className="form-control" >
                          Approved
                      </option>
                      <option name="Status" className="form-control" >
                          Active
                      </option>
                      <option name="Status" className="form-control" >
                          Delinquent
                      </option>
                      <option name="Status" className="form-control" >
                          Defaulted
                      </option>
                      <option name="Status" className="form-control" >
                          Closed
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateLoanAccount}>Save</button>
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

export default CreateLoanAccountComponent
