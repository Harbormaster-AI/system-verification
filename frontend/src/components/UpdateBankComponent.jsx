import React, { Component } from 'react'
import BankService from '../services/BankService';

class UpdateBankComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                legalName: '',
                swiftBic: '',
                headquartersCountry: '',
                website: ''
        }
        this.updateBank = this.updateBank.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changelegalNameHandler = this.changelegalNameHandler.bind(this);
        this.changeswiftBicHandler = this.changeswiftBicHandler.bind(this);
        this.changeheadquartersCountryHandler = this.changeheadquartersCountryHandler.bind(this);
        this.changewebsiteHandler = this.changewebsiteHandler.bind(this);
    }

    componentDidMount(){
        BankService.getBankById(this.state.id).then( (res) =>{
            let bank = res.data;
            this.setState({
                name: bank.name,
                legalName: bank.legalName,
                swiftBic: bank.swiftBic,
                headquartersCountry: bank.headquartersCountry,
                website: bank.website
            });
        });
    }

    updateBank = (e) => {
        e.preventDefault();
        let bank = {
            bankId: this.state.id,
            name: this.state.name,
            legalName: this.state.legalName,
            swiftBic: this.state.swiftBic,
            headquartersCountry: this.state.headquartersCountry,
            website: this.state.website
        };
        console.log('bank => ' + JSON.stringify(bank));
        console.log('id => ' + JSON.stringify(this.state.id));
        BankService.updateBank(bank).then( res => {
            this.props.history.push('/banks');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changelegalNameHandler= (event) => {
        this.setState({legalName: event.target.value});
    }
    changeswiftBicHandler= (event) => {
        this.setState({swiftBic: event.target.value});
    }
    changeheadquartersCountryHandler= (event) => {
        this.setState({headquartersCountry: event.target.value});
    }
    changewebsiteHandler= (event) => {
        this.setState({website: event.target.value});
    }

    cancel(){
        this.props.history.push('/banks');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Bank</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> legalName: </label>
                                                <input placeholder="legalName" name="legalName" className="form-control" value={this.state.legalName} onChange={this.changelegalNameHandler}/>

                                            <label> swiftBic: </label>
                                                <input placeholder="swiftBic" name="swiftBic" className="form-control" value={this.state.swiftBic} onChange={this.changeswiftBicHandler}/>

                                            <label> headquartersCountry: </label>
                                                <input placeholder="headquartersCountry" name="headquartersCountry" className="form-control" value={this.state.headquartersCountry} onChange={this.changeheadquartersCountryHandler}/>

                                            <label> website: </label>
                                                <input placeholder="website" name="website" className="form-control" value={this.state.website} onChange={this.changewebsiteHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateBank}>Save</button>
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

export default UpdateBankComponent
