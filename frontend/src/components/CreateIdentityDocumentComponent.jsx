import React, { Component } from 'react'
import IdentityDocumentService from '../services/IdentityDocumentService';

class CreateIdentityDocumentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                documentNumber: '',
                issuingCountry: '',
                expirationDate: '',
                documentType: ''
        }
        this.changedocumentNumberHandler = this.changedocumentNumberHandler.bind(this);
        this.changeissuingCountryHandler = this.changeissuingCountryHandler.bind(this);
        this.changeexpirationDateHandler = this.changeexpirationDateHandler.bind(this);
        this.changeDocumentTypeHandler = this.changeDocumentTypeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            IdentityDocumentService.getIdentityDocumentById(this.state.id).then( (res) =>{
                let identityDocument = res.data;
                this.setState({
                    documentNumber: identityDocument.documentNumber,
                    issuingCountry: identityDocument.issuingCountry,
                    expirationDate: identityDocument.expirationDate,
                    documentType: identityDocument.documentType
                });
            });
        }        
    }
    saveOrUpdateIdentityDocument = (e) => {
        e.preventDefault();
        let identityDocument = {
                identityDocumentId: this.state.id,
                documentNumber: this.state.documentNumber,
                issuingCountry: this.state.issuingCountry,
                expirationDate: this.state.expirationDate,
                documentType: this.state.documentType
            };
        console.log('identityDocument => ' + JSON.stringify(identityDocument));

        // step 5
        if(this.state.id === '_add'){
            identityDocument.identityDocumentId=''
            IdentityDocumentService.createIdentityDocument(identityDocument).then(res =>{
                this.props.history.push('/identityDocuments');
            });
        }else{
            IdentityDocumentService.updateIdentityDocument(identityDocument).then( res => {
                this.props.history.push('/identityDocuments');
            });
        }
    }
    
    changedocumentNumberHandler= (event) => {
        this.setState({documentNumber: event.target.value});
    }
    changeissuingCountryHandler= (event) => {
        this.setState({issuingCountry: event.target.value});
    }
    changeexpirationDateHandler= (event) => {
        this.setState({expirationDate: event.target.value});
    }
    changeDocumentTypeHandler= (event) => {
        this.setState({documentType: event.target.value});
    }

    cancel(){
        this.props.history.push('/identityDocuments');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add IdentityDocument</h3>
        }else{
            return <h3 className="text-center">Update IdentityDocument</h3>
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
                                            <label> documentNumber:&emsp; </label>
                                                <input placeholder="documentNumber" name="documentNumber" className="form-control" value={this.state.documentNumber} onChange={this.changedocumentNumberHandler}/>

                                            <label> issuingCountry:&emsp; </label>
                                                <input placeholder="issuingCountry" name="issuingCountry" className="form-control" value={this.state.issuingCountry} onChange={this.changeissuingCountryHandler}/>

                                            <label> expirationDate:&emsp; </label>
                                                <input type="date" placeholder="expirationDate" name="expirationDate" className="form-control" value={this.state.expirationDate} onChange={this.changeexpirationDateHandler}/>

                                            <label> DocumentType:&emsp; </label>
                                                <select value={this.state.documentType} onChange={this.changeDocumentTypeHandler}>
                      <option name="DocumentType" className="form-control" >
                          Passport
                      </option>
                      <option name="DocumentType" className="form-control" >
                          NationalID
                      </option>
                      <option name="DocumentType" className="form-control" >
                          DriverLicense
                      </option>
                      <option name="DocumentType" className="form-control" >
                          ResidencePermit
                      </option>
                      <option name="DocumentType" className="form-control" >
                          BusinessRegistration
                      </option>
                      <option name="DocumentType" className="form-control" >
                          TaxCertificate
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateIdentityDocument}>Save</button>
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

export default CreateIdentityDocumentComponent
