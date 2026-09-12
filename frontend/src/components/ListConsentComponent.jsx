import React, { Component } from 'react'
import ConsentService from '../services/ConsentService'

class ListConsentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                consents: []
        }
        this.addConsent = this.addConsent.bind(this);
        this.editConsent = this.editConsent.bind(this);
        this.deleteConsent = this.deleteConsent.bind(this);
    }

    deleteConsent(id){
        ConsentService.deleteConsent(id).then( res => {
            this.setState({consents: this.state.consents.filter(consent => consent.consentId !== id)});
        });
    }
    viewConsent(id){
        this.props.history.push(`/view-consent/${id}`);
    }
    editConsent(id){
        this.props.history.push(`/add-consent/${id}`);
    }

    componentDidMount(){
        ConsentService.getConsents().then((res) => {
            this.setState({ consents: res.data});
        });
    }

    addConsent(){
        this.props.history.push('/add-consent/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Consent List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addConsent}> Add Consent</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> GrantedOn </th>
                                    <th> ExpiresOn </th>
                                    <th> ConsentType </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.consents.map(
                                        consent => 
                                        <tr key = {consent.consentId}>
                                             <td> { consent.grantedOn } </td>
                                             <td> { consent.expiresOn } </td>
                                             <td> { consent.consentType } </td>
                                             <td> { consent.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editConsent(consent.consentId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteConsent(consent.consentId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewConsent(consent.consentId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListConsentComponent
