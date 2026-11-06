import React, { Component } from 'react'
import LoanPaymentService from '../services/LoanPaymentService'

class ListLoanPaymentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                loanPayments: []
        }
        this.addLoanPayment = this.addLoanPayment.bind(this);
        this.editLoanPayment = this.editLoanPayment.bind(this);
        this.deleteLoanPayment = this.deleteLoanPayment.bind(this);
    }

    deleteLoanPayment(id){
        LoanPaymentService.deleteLoanPayment(id).then( res => {
            this.setState({loanPayments: this.state.loanPayments.filter(loanPayment => loanPayment.loanPaymentId !== id)});
        });
    }
    viewLoanPayment(id){
        this.props.history.push(`/view-loanPayment/${id}`);
    }
    editLoanPayment(id){
        this.props.history.push(`/add-loanPayment/${id}`);
    }

    componentDidMount(){
        LoanPaymentService.getLoanPayments().then((res) => {
            this.setState({ loanPayments: res.data});
        });
    }

    addLoanPayment(){
        this.props.history.push('/add-loanPayment/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">LoanPayment List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addLoanPayment}> Add LoanPayment</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> PaymentReference </th>
                                    <th> Amount </th>
                                    <th> PaymentDate </th>
                                    <th> Method </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.loanPayments.map(
                                        loanPayment => 
                                        <tr key = {loanPayment.loanPaymentId}>
                                             <td> { loanPayment.paymentReference } </td>
                                             <td> { loanPayment.amount } </td>
                                             <td> { loanPayment.paymentDate } </td>
                                             <td> { loanPayment.method } </td>
                                             <td> { loanPayment.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editLoanPayment(loanPayment.loanPaymentId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteLoanPayment(loanPayment.loanPaymentId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewLoanPayment(loanPayment.loanPaymentId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListLoanPaymentComponent
