import React, { Component } from 'react'
import AccountStatementService from '../services/AccountStatementService'

class ListAccountStatementComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                accountStatements: []
        }
        this.addAccountStatement = this.addAccountStatement.bind(this);
        this.editAccountStatement = this.editAccountStatement.bind(this);
        this.deleteAccountStatement = this.deleteAccountStatement.bind(this);
    }

    deleteAccountStatement(id){
        AccountStatementService.deleteAccountStatement(id).then( res => {
            this.setState({accountStatements: this.state.accountStatements.filter(accountStatement => accountStatement.accountStatementId !== id)});
        });
    }
    viewAccountStatement(id){
        this.props.history.push(`/view-accountStatement/${id}`);
    }
    editAccountStatement(id){
        this.props.history.push(`/add-accountStatement/${id}`);
    }

    componentDidMount(){
        AccountStatementService.getAccountStatements().then((res) => {
            this.setState({ accountStatements: res.data});
        });
    }

    addAccountStatement(){
        this.props.history.push('/add-accountStatement/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">AccountStatement List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addAccountStatement}> Add AccountStatement</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> StatementNumber </th>
                                    <th> PeriodStart </th>
                                    <th> PeriodEnd </th>
                                    <th> OpeningBalance </th>
                                    <th> ClosingBalance </th>
                                    <th> DeliveryMethod </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.accountStatements.map(
                                        accountStatement => 
                                        <tr key = {accountStatement.accountStatementId}>
                                             <td> { accountStatement.statementNumber } </td>
                                             <td> { accountStatement.periodStart } </td>
                                             <td> { accountStatement.periodEnd } </td>
                                             <td> { accountStatement.openingBalance } </td>
                                             <td> { accountStatement.closingBalance } </td>
                                             <td> { accountStatement.deliveryMethod } </td>
                                             <td>
                                                 <button onClick={ () => this.editAccountStatement(accountStatement.accountStatementId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAccountStatement(accountStatement.accountStatementId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewAccountStatement(accountStatement.accountStatementId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListAccountStatementComponent
