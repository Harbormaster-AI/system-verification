import React, { Component } from 'react'
import CustomerService from '../services/CustomerService';

class CreateCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                firstName: '',
                lastName: '',
                legalName: '',
                dateOfBirth: '',
                taxId: '',
                email: '',
                phone: '',
                address: '',
                customerType: '',
                riskRating: '',
                kycStatus: ''
        }
        this.changefirstNameHandler = this.changefirstNameHandler.bind(this);
        this.changelastNameHandler = this.changelastNameHandler.bind(this);
        this.changelegalNameHandler = this.changelegalNameHandler.bind(this);
        this.changedateOfBirthHandler = this.changedateOfBirthHandler.bind(this);
        this.changetaxIdHandler = this.changetaxIdHandler.bind(this);
        this.changeemailHandler = this.changeemailHandler.bind(this);
        this.changephoneHandler = this.changephoneHandler.bind(this);
        this.changeaddressHandler = this.changeaddressHandler.bind(this);
        this.changeCustomerTypeHandler = this.changeCustomerTypeHandler.bind(this);
        this.changeRiskRatingHandler = this.changeRiskRatingHandler.bind(this);
        this.changeKycStatusHandler = this.changeKycStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            CustomerService.getCustomerById(this.state.id).then( (res) =>{
                let customer = res.data;
                this.setState({
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    legalName: customer.legalName,
                    dateOfBirth: customer.dateOfBirth,
                    taxId: customer.taxId,
                    email: customer.email,
                    phone: customer.phone,
                    address: customer.address,
                    customerType: customer.customerType,
                    riskRating: customer.riskRating,
                    kycStatus: customer.kycStatus
                });
            });
        }        
    }
    saveOrUpdateCustomer = (e) => {
        e.preventDefault();
        let customer = {
                customerId: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                legalName: this.state.legalName,
                dateOfBirth: this.state.dateOfBirth,
                taxId: this.state.taxId,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                customerType: this.state.customerType,
                riskRating: this.state.riskRating,
                kycStatus: this.state.kycStatus
            };
        console.log('customer => ' + JSON.stringify(customer));

        // step 5
        if(this.state.id === '_add'){
            customer.customerId=''
            CustomerService.createCustomer(customer).then(res =>{
                this.props.history.push('/customers');
            });
        }else{
            CustomerService.updateCustomer(customer).then( res => {
                this.props.history.push('/customers');
            });
        }
    }
    
    changefirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }
    changelastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }
    changelegalNameHandler= (event) => {
        this.setState({legalName: event.target.value});
    }
    changedateOfBirthHandler= (event) => {
        this.setState({dateOfBirth: event.target.value});
    }
    changetaxIdHandler= (event) => {
        this.setState({taxId: event.target.value});
    }
    changeemailHandler= (event) => {
        this.setState({email: event.target.value});
    }
    changephoneHandler= (event) => {
        this.setState({phone: event.target.value});
    }
    changeaddressHandler= (event) => {
        this.setState({address: event.target.value});
    }
    changeCustomerTypeHandler= (event) => {
        this.setState({customerType: event.target.value});
    }
    changeRiskRatingHandler= (event) => {
        this.setState({riskRating: event.target.value});
    }
    changeKycStatusHandler= (event) => {
        this.setState({kycStatus: event.target.value});
    }

    cancel(){
        this.props.history.push('/customers');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Customer</h3>
        }else{
            return <h3 className="text-center">Update Customer</h3>
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
                                            <label> firstName:&emsp; </label>
                                                <input placeholder="firstName" name="firstName" className="form-control" value={this.state.firstName} onChange={this.changefirstNameHandler}/>

                                            <label> lastName:&emsp; </label>
                                                <input placeholder="lastName" name="lastName" className="form-control" value={this.state.lastName} onChange={this.changelastNameHandler}/>

                                            <label> legalName:&emsp; </label>
                                                <input placeholder="legalName" name="legalName" className="form-control" value={this.state.legalName} onChange={this.changelegalNameHandler}/>

                                            <label> dateOfBirth:&emsp; </label>
                                                <input type="date" placeholder="dateOfBirth" name="dateOfBirth" className="form-control" value={this.state.dateOfBirth} onChange={this.changedateOfBirthHandler}/>

                                            <label> taxId:&emsp; </label>
                                                <input placeholder="taxId" name="taxId" className="form-control" value={this.state.taxId} onChange={this.changetaxIdHandler}/>

                                            <label> email:&emsp; </label>
                                                <input placeholder="email" name="email" className="form-control" value={this.state.email} onChange={this.changeemailHandler}/>

                                            <label> phone:&emsp; </label>
                                                <input placeholder="phone" name="phone" className="form-control" value={this.state.phone} onChange={this.changephoneHandler}/>

                                            <label> address:&emsp; </label>
                                                <input placeholder="address" name="address" className="form-control" value={this.state.address} onChange={this.changeaddressHandler}/>

                                            <label> CustomerType:&emsp; </label>
                                                <select value={this.state.customerType} onChange={this.changeCustomerTypeHandler}>
                      <option name="CustomerType" className="form-control" >
                          Individual
                      </option>
                      <option name="CustomerType" className="form-control" >
                          Business
                      </option>
                      <option name="CustomerType" className="form-control" >
                          NonProfit
                      </option>
                      <option name="CustomerType" className="form-control" >
                          Government
                      </option>
                    </select>

                                            <label> RiskRating:&emsp; </label>
                                                <select value={this.state.riskRating} onChange={this.changeRiskRatingHandler}>
                      <option name="RiskRating" className="form-control" >
                          Low
                      </option>
                      <option name="RiskRating" className="form-control" >
                          Medium
                      </option>
                      <option name="RiskRating" className="form-control" >
                          High
                      </option>
                    </select>

                                            <label> KycStatus:&emsp; </label>
                                                <select value={this.state.kycStatus} onChange={this.changeKycStatusHandler}>
                      <option name="KycStatus" className="form-control" >
                          Pending
                      </option>
                      <option name="KycStatus" className="form-control" >
                          Verified
                      </option>
                      <option name="KycStatus" className="form-control" >
                          Rejected
                      </option>
                      <option name="KycStatus" className="form-control" >
                          Expired
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateCustomer}>Save</button>
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

export default CreateCustomerComponent
