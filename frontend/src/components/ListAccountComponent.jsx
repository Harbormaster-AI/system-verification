import React, { Component } from 'react'
import AccountService from '../services/AccountService'

class ListAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                accounts: []
        }
        this.addAccount = this.addAccount.bind(this);
        this.editAccount = this.editAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    deleteAccount(id){
        AccountService.deleteAccount(id).then( res => {
            this.setState({accounts: this.state.accounts.filter(account => account.accountId !== id)});
        });
    }
    viewAccount(id){
        this.props.history.push(`/view-account/${id}`);
    }
    editAccount(id){
        this.props.history.push(`/add-account/${id}`);
    }

    componentDidMount(){
        AccountService.getAccounts().then((res) => {
            this.setState({ accounts: res.data});
        });
    }

    addAccount(){
        this.props.history.push('/add-account/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Account List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addAccount}> Add Account</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> AccountNumber </th>
                                    <th> Iban </th>
                                    <th> AccountName </th>
                                    <th> Currency </th>
                                    <th> OpenedOn </th>
                                    <th> ClosedOn </th>
                                    <th> AccountType </th>
                                    <th> OwnershipType </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.accounts.map(
                                        account => 
                                        <tr key = {account.accountId}>
                                             <td> { account.accountNumber } </td>
                                             <td> { account.iban } </td>
                                             <td> { account.accountName } </td>
                                             <td> { account.currency } </td>
                                             <td> { account.openedOn } </td>
                                             <td> { account.closedOn } </td>
                                             <td> { account.accountType } </td>
                                             <td> { account.ownershipType } </td>
                                             <td> { account.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editAccount(account.accountId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAccount(account.accountId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewAccount(account.accountId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListAccountComponent
