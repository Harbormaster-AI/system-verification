import React, { Component } from 'react'
import ExternalAccountService from '../services/ExternalAccountService'

class ListExternalAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                externalAccounts: []
        }
        this.addExternalAccount = this.addExternalAccount.bind(this);
        this.editExternalAccount = this.editExternalAccount.bind(this);
        this.deleteExternalAccount = this.deleteExternalAccount.bind(this);
    }

    deleteExternalAccount(id){
        ExternalAccountService.deleteExternalAccount(id).then( res => {
            this.setState({externalAccounts: this.state.externalAccounts.filter(externalAccount => externalAccount.externalAccountId !== id)});
        });
    }
    viewExternalAccount(id){
        this.props.history.push(`/view-externalAccount/${id}`);
    }
    editExternalAccount(id){
        this.props.history.push(`/add-externalAccount/${id}`);
    }

    componentDidMount(){
        ExternalAccountService.getExternalAccounts().then((res) => {
            this.setState({ externalAccounts: res.data});
        });
    }

    addExternalAccount(){
        this.props.history.push('/add-externalAccount/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">ExternalAccount List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addExternalAccount}> Add ExternalAccount</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> Iban </th>
                                    <th> AccountNumber </th>
                                    <th> Bic </th>
                                    <th> BankName </th>
                                    <th> Country </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.externalAccounts.map(
                                        externalAccount => 
                                        <tr key = {externalAccount.externalAccountId}>
                                             <td> { externalAccount.name } </td>
                                             <td> { externalAccount.iban } </td>
                                             <td> { externalAccount.accountNumber } </td>
                                             <td> { externalAccount.bic } </td>
                                             <td> { externalAccount.bankName } </td>
                                             <td> { externalAccount.country } </td>
                                             <td>
                                                 <button onClick={ () => this.editExternalAccount(externalAccount.externalAccountId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteExternalAccount(externalAccount.externalAccountId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewExternalAccount(externalAccount.externalAccountId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListExternalAccountComponent
