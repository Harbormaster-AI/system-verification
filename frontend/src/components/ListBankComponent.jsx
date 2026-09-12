import React, { Component } from 'react'
import BankService from '../services/BankService'

class ListBankComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                banks: []
        }
        this.addBank = this.addBank.bind(this);
        this.editBank = this.editBank.bind(this);
        this.deleteBank = this.deleteBank.bind(this);
    }

    deleteBank(id){
        BankService.deleteBank(id).then( res => {
            this.setState({banks: this.state.banks.filter(bank => bank.bankId !== id)});
        });
    }
    viewBank(id){
        this.props.history.push(`/view-bank/${id}`);
    }
    editBank(id){
        this.props.history.push(`/add-bank/${id}`);
    }

    componentDidMount(){
        BankService.getBanks().then((res) => {
            this.setState({ banks: res.data});
        });
    }

    addBank(){
        this.props.history.push('/add-bank/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Bank List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addBank}> Add Bank</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> LegalName </th>
                                    <th> SwiftBic </th>
                                    <th> HeadquartersCountry </th>
                                    <th> Website </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.banks.map(
                                        bank => 
                                        <tr key = {bank.bankId}>
                                             <td> { bank.name } </td>
                                             <td> { bank.legalName } </td>
                                             <td> { bank.swiftBic } </td>
                                             <td> { bank.headquartersCountry } </td>
                                             <td> { bank.website } </td>
                                             <td>
                                                 <button onClick={ () => this.editBank(bank.bankId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBank(bank.bankId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewBank(bank.bankId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListBankComponent
