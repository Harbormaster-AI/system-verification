import React, { Component } from 'react'
import IdentityDocumentService from '../services/IdentityDocumentService';

class UpdateIdentityDocumentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                documentNumber: '',
                issuingCountry: '',
                expirationDate: '',
                documentType: ''
        }
        this.updateIdentityDocument = this.updateIdentityDocument.bind(this);

        this.changedocumentNumberHandler = this.changedocumentNumberHandler.bind(this);
        this.changeissuingCountryHandler = this.changeissuingCountryHandler.bind(this);
        this.changeexpirationDateHandler = this.changeexpirationDateHandler.bind(this);
        this.changeDocumentTypeHandler = this.changeDocumentTypeHandler.bind(this);
    }

    componentDidMount(){
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

    updateIdentityDocument = (e) => {
        e.preventDefault();
        let identityDocument = {
            identityDocumentId: this.state.id,
            documentNumber: this.state.documentNumber,
            issuingCountry: this.state.issuingCountry,
            expirationDate: this.state.expirationDate,
            documentType: this.state.documentType
        };
        console.log('identityDocument => ' + JSON.stringify(identityDocument));
        console.log('id => ' + JSON.stringify(this.state.id));
        IdentityDocumentService.updateIdentityDocument(identityDocument).then( res => {
            this.props.history.push('/identityDocuments');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update IdentityDocument</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> documentNumber: </label>
                                                <input placeholder="documentNumber" name="documentNumber" className="form-control" value={this.state.documentNumber} onChange={this.changedocumentNumberHandler}/>

                                            <label> issuingCountry: </label>
                                                <input placeholder="issuingCountry" name="issuingCountry" className="form-control" value={this.state.issuingCountry} onChange={this.changeissuingCountryHandler}/>

                                            <label> expirationDate: </label>
                                                <input type="date" placeholder="expirationDate" name="expirationDate" className="form-control" value={this.state.expirationDate} onChange={this.changeexpirationDateHandler}/>

                                            <label> DocumentType: </label>
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
                                        <button className="btn btn-success" onClick={this.updateIdentityDocument}>Save</button>
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

export default UpdateIdentityDocumentComponent
