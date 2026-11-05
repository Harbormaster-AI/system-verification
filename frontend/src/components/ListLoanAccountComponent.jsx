import React, { Component } from 'react'
import LoanAccountService from '../services/LoanAccountService'

class ListLoanAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                loanAccounts: []
        }
        this.addLoanAccount = this.addLoanAccount.bind(this);
        this.editLoanAccount = this.editLoanAccount.bind(this);
        this.deleteLoanAccount = this.deleteLoanAccount.bind(this);
    }

    deleteLoanAccount(id){
        LoanAccountService.deleteLoanAccount(id).then( res => {
            this.setState({loanAccounts: this.state.loanAccounts.filter(loanAccount => loanAccount.loanAccountId !== id)});
        });
    }
    viewLoanAccount(id){
        this.props.history.push(`/view-loanAccount/${id}`);
    }
    editLoanAccount(id){
        this.props.history.push(`/add-loanAccount/${id}`);
    }

    componentDidMount(){
        LoanAccountService.getLoanAccounts().then((res) => {
            this.setState({ loanAccounts: res.data});
        });
    }

    addLoanAccount(){
        this.props.history.push('/add-loanAccount/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">LoanAccount List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addLoanAccount}> Add LoanAccount</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> LoanNumber </th>
                                    <th> PrincipalAmount </th>
                                    <th> OutstandingPrincipal </th>
                                    <th> InterestRate </th>
                                    <th> OriginationDate </th>
                                    <th> MaturityDate </th>
                                    <th> PaymentDayOfMonth </th>
                                    <th> Currency </th>
                                    <th> LoanType </th>
                                    <th> RateType </th>
                                    <th> Compounding </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.loanAccounts.map(
                                        loanAccount => 
                                        <tr key = {loanAccount.loanAccountId}>
                                             <td> { loanAccount.loanNumber } </td>
                                             <td> { loanAccount.principalAmount } </td>
                                             <td> { loanAccount.outstandingPrincipal } </td>
                                             <td> { loanAccount.interestRate } </td>
                                             <td> { loanAccount.originationDate } </td>
                                             <td> { loanAccount.maturityDate } </td>
                                             <td> { loanAccount.paymentDayOfMonth } </td>
                                             <td> { loanAccount.currency } </td>
                                             <td> { loanAccount.loanType } </td>
                                             <td> { loanAccount.rateType } </td>
                                             <td> { loanAccount.compounding } </td>
                                             <td> { loanAccount.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editLoanAccount(loanAccount.loanAccountId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteLoanAccount(loanAccount.loanAccountId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewLoanAccount(loanAccount.loanAccountId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListLoanAccountComponent
