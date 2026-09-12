import React, { Component } from 'react'
import CustomerService from '../services/CustomerService'

class ListCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                customers: []
        }
        this.addCustomer = this.addCustomer.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }

    deleteCustomer(id){
        CustomerService.deleteCustomer(id).then( res => {
            this.setState({customers: this.state.customers.filter(customer => customer.customerId !== id)});
        });
    }
    viewCustomer(id){
        this.props.history.push(`/view-customer/${id}`);
    }
    editCustomer(id){
        this.props.history.push(`/add-customer/${id}`);
    }

    componentDidMount(){
        CustomerService.getCustomers().then((res) => {
            this.setState({ customers: res.data});
        });
    }

    addCustomer(){
        this.props.history.push('/add-customer/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Customer List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addCustomer}> Add Customer</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> FirstName </th>
                                    <th> LastName </th>
                                    <th> LegalName </th>
                                    <th> DateOfBirth </th>
                                    <th> TaxId </th>
                                    <th> Email </th>
                                    <th> Phone </th>
                                    <th> Address </th>
                                    <th> CustomerType </th>
                                    <th> RiskRating </th>
                                    <th> KycStatus </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.customers.map(
                                        customer => 
                                        <tr key = {customer.customerId}>
                                             <td> { customer.firstName } </td>
                                             <td> { customer.lastName } </td>
                                             <td> { customer.legalName } </td>
                                             <td> { customer.dateOfBirth } </td>
                                             <td> { customer.taxId } </td>
                                             <td> { customer.email } </td>
                                             <td> { customer.phone } </td>
                                             <td> { customer.address } </td>
                                             <td> { customer.customerType } </td>
                                             <td> { customer.riskRating } </td>
                                             <td> { customer.kycStatus } </td>
                                             <td>
                                                 <button onClick={ () => this.editCustomer(customer.customerId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCustomer(customer.customerId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCustomer(customer.customerId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListCustomerComponent
