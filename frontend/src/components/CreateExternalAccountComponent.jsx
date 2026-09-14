import React, { Component } from 'react'
import ExternalAccountService from '../services/ExternalAccountService';

class CreateExternalAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                iban: '',
                accountNumber: '',
                bic: '',
                bankName: '',
                country: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeibanHandler = this.changeibanHandler.bind(this);
        this.changeaccountNumberHandler = this.changeaccountNumberHandler.bind(this);
        this.changebicHandler = this.changebicHandler.bind(this);
        this.changebankNameHandler = this.changebankNameHandler.bind(this);
        this.changecountryHandler = this.changecountryHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ExternalAccountService.getExternalAccountById(this.state.id).then( (res) =>{
                let externalAccount = res.data;
                this.setState({
                    name: externalAccount.name,
                    iban: externalAccount.iban,
                    accountNumber: externalAccount.accountNumber,
                    bic: externalAccount.bic,
                    bankName: externalAccount.bankName,
                    country: externalAccount.country
                });
            });
        }        
    }
    saveOrUpdateExternalAccount = (e) => {
        e.preventDefault();
        let externalAccount = {
                externalAccountId: this.state.id,
                name: this.state.name,
                iban: this.state.iban,
                accountNumber: this.state.accountNumber,
                bic: this.state.bic,
                bankName: this.state.bankName,
                country: this.state.country
            };
        console.log('externalAccount => ' + JSON.stringify(externalAccount));

        // step 5
        if(this.state.id === '_add'){
            externalAccount.externalAccountId=''
            ExternalAccountService.createExternalAccount(externalAccount).then(res =>{
                this.props.history.push('/externalAccounts');
            });
        }else{
            ExternalAccountService.updateExternalAccount(externalAccount).then( res => {
                this.props.history.push('/externalAccounts');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeibanHandler= (event) => {
        this.setState({iban: event.target.value});
    }
    changeaccountNumberHandler= (event) => {
        this.setState({accountNumber: event.target.value});
    }
    changebicHandler= (event) => {
        this.setState({bic: event.target.value});
    }
    changebankNameHandler= (event) => {
        this.setState({bankName: event.target.value});
    }
    changecountryHandler= (event) => {
        this.setState({country: event.target.value});
    }

    cancel(){
        this.props.history.push('/externalAccounts');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add ExternalAccount</h3>
        }else{
            return <h3 className="text-center">Update ExternalAccount</h3>
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
                                            <label> name:&emsp; </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> iban:&emsp; </label>
                                                <input placeholder="iban" name="iban" className="form-control" value={this.state.iban} onChange={this.changeibanHandler}/>

                                            <label> accountNumber:&emsp; </label>
                                                <input placeholder="accountNumber" name="accountNumber" className="form-control" value={this.state.accountNumber} onChange={this.changeaccountNumberHandler}/>

                                            <label> bic:&emsp; </label>
                                                <input placeholder="bic" name="bic" className="form-control" value={this.state.bic} onChange={this.changebicHandler}/>

                                            <label> bankName:&emsp; </label>
                                                <input placeholder="bankName" name="bankName" className="form-control" value={this.state.bankName} onChange={this.changebankNameHandler}/>

                                            <label> country:&emsp; </label>
                                                <input placeholder="country" name="country" className="form-control" value={this.state.country} onChange={this.changecountryHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateExternalAccount}>Save</button>
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

export default CreateExternalAccountComponent
