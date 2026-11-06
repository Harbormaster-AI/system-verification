import React, { Component } from 'react'
import ConsentService from '../services/ConsentService';

class CreateConsentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                grantedOn: '',
                expiresOn: '',
                consentType: '',
                status: ''
        }
        this.changegrantedOnHandler = this.changegrantedOnHandler.bind(this);
        this.changeexpiresOnHandler = this.changeexpiresOnHandler.bind(this);
        this.changeConsentTypeHandler = this.changeConsentTypeHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ConsentService.getConsentById(this.state.id).then( (res) =>{
                let consent = res.data;
                this.setState({
                    grantedOn: consent.grantedOn,
                    expiresOn: consent.expiresOn,
                    consentType: consent.consentType,
                    status: consent.status
                });
            });
        }        
    }
    saveOrUpdateConsent = (e) => {
        e.preventDefault();
        let consent = {
                consentId: this.state.id,
                grantedOn: this.state.grantedOn,
                expiresOn: this.state.expiresOn,
                consentType: this.state.consentType,
                status: this.state.status
            };
        console.log('consent => ' + JSON.stringify(consent));

        // step 5
        if(this.state.id === '_add'){
            consent.consentId=''
            ConsentService.createConsent(consent).then(res =>{
                this.props.history.push('/consents');
            });
        }else{
            ConsentService.updateConsent(consent).then( res => {
                this.props.history.push('/consents');
            });
        }
    }
    
    changegrantedOnHandler= (event) => {
        this.setState({grantedOn: event.target.value});
    }
    changeexpiresOnHandler= (event) => {
        this.setState({expiresOn: event.target.value});
    }
    changeConsentTypeHandler= (event) => {
        this.setState({consentType: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/consents');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Consent</h3>
        }else{
            return <h3 className="text-center">Update Consent</h3>
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
                                            <label> grantedOn:&emsp; </label>
                                                <input type="date" placeholder="grantedOn" name="grantedOn" className="form-control" value={this.state.grantedOn} onChange={this.changegrantedOnHandler}/>

                                            <label> expiresOn:&emsp; </label>
                                                <input type="date" placeholder="expiresOn" name="expiresOn" className="form-control" value={this.state.expiresOn} onChange={this.changeexpiresOnHandler}/>

                                            <label> ConsentType:&emsp; </label>
                                                <select value={this.state.consentType} onChange={this.changeConsentTypeHandler}>
                      <option name="ConsentType" className="form-control" >
                          OpenBanking
                      </option>
                      <option name="ConsentType" className="form-control" >
                          PaymentInitiation
                      </option>
                      <option name="ConsentType" className="form-control" >
                          AccountInformation
                      </option>
                      <option name="ConsentType" className="form-control" >
                          Marketing
                      </option>
                      <option name="ConsentType" className="form-control" >
                          DataSharing
                      </option>
                    </select>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Active
                      </option>
                      <option name="Status" className="form-control" >
                          Revoked
                      </option>
                      <option name="Status" className="form-control" >
                          Expired
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateConsent}>Save</button>
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

export default CreateConsentComponent
