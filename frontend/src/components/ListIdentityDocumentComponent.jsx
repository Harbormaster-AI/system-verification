import React, { Component } from 'react'
import IdentityDocumentService from '../services/IdentityDocumentService'

class ListIdentityDocumentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                identityDocuments: []
        }
        this.addIdentityDocument = this.addIdentityDocument.bind(this);
        this.editIdentityDocument = this.editIdentityDocument.bind(this);
        this.deleteIdentityDocument = this.deleteIdentityDocument.bind(this);
    }

    deleteIdentityDocument(id){
        IdentityDocumentService.deleteIdentityDocument(id).then( res => {
            this.setState({identityDocuments: this.state.identityDocuments.filter(identityDocument => identityDocument.identityDocumentId !== id)});
        });
    }
    viewIdentityDocument(id){
        this.props.history.push(`/view-identityDocument/${id}`);
    }
    editIdentityDocument(id){
        this.props.history.push(`/add-identityDocument/${id}`);
    }

    componentDidMount(){
        IdentityDocumentService.getIdentityDocuments().then((res) => {
            this.setState({ identityDocuments: res.data});
        });
    }

    addIdentityDocument(){
        this.props.history.push('/add-identityDocument/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">IdentityDocument List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addIdentityDocument}> Add IdentityDocument</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> DocumentNumber </th>
                                    <th> IssuingCountry </th>
                                    <th> ExpirationDate </th>
                                    <th> DocumentType </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.identityDocuments.map(
                                        identityDocument => 
                                        <tr key = {identityDocument.identityDocumentId}>
                                             <td> { identityDocument.documentNumber } </td>
                                             <td> { identityDocument.issuingCountry } </td>
                                             <td> { identityDocument.expirationDate } </td>
                                             <td> { identityDocument.documentType } </td>
                                             <td>
                                                 <button onClick={ () => this.editIdentityDocument(identityDocument.identityDocumentId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteIdentityDocument(identityDocument.identityDocumentId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewIdentityDocument(identityDocument.identityDocumentId)} className="btn btn-outline-info btn-sm">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListIdentityDocumentComponent
