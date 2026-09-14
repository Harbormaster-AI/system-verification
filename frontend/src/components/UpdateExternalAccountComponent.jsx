import React, { Component } from 'react'
import ExternalAccountService from '../services/ExternalAccountService';

class UpdateExternalAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                iban: '',
                accountNumber: '',
                bic: '',
                bankName: '',
                country: ''
        }
        this.updateExternalAccount = this.updateExternalAccount.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeibanHandler = this.changeibanHandler.bind(this);
        this.changeaccountNumberHandler = this.changeaccountNumberHandler.bind(this);
        this.changebicHandler = this.changebicHandler.bind(this);
        this.changebankNameHandler = this.changebankNameHandler.bind(this);
        this.changecountryHandler = this.changecountryHandler.bind(this);
    }

    componentDidMount(){
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

    updateExternalAccount = (e) => {
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
        console.log('id => ' + JSON.stringify(this.state.id));
        ExternalAccountService.updateExternalAccount(externalAccount).then( res => {
            this.props.history.push('/externalAccounts');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update ExternalAccount</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> iban: </label>
                                                <input placeholder="iban" name="iban" className="form-control" value={this.state.iban} onChange={this.changeibanHandler}/>

                                            <label> accountNumber: </label>
                                                <input placeholder="accountNumber" name="accountNumber" className="form-control" value={this.state.accountNumber} onChange={this.changeaccountNumberHandler}/>

                                            <label> bic: </label>
                                                <input placeholder="bic" name="bic" className="form-control" value={this.state.bic} onChange={this.changebicHandler}/>

                                            <label> bankName: </label>
                                                <input placeholder="bankName" name="bankName" className="form-control" value={this.state.bankName} onChange={this.changebankNameHandler}/>

                                            <label> country: </label>
                                                <input placeholder="country" name="country" className="form-control" value={this.state.country} onChange={this.changecountryHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateExternalAccount}>Save</button>
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

export default UpdateExternalAccountComponent
