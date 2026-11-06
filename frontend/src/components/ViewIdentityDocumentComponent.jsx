import React, { Component } from 'react'
import IdentityDocumentService from '../services/IdentityDocumentService'

class ViewIdentityDocumentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            identityDocument: {}
        }
    }

    componentDidMount(){
        IdentityDocumentService.getIdentityDocumentById(this.state.id).then( res => {
            this.setState({identityDocument: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View IdentityDocument Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> documentNumber:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.identityDocument.documentNumber }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> issuingCountry:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.identityDocument.issuingCountry }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> expirationDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.identityDocument.expirationDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> DocumentType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.identityDocument.documentType }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewIdentityDocumentComponent
