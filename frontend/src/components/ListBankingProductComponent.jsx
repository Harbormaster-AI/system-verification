import React, { Component } from 'react'
import BankingProductService from '../services/BankingProductService'

class ListBankingProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                bankingProducts: []
        }
        this.addBankingProduct = this.addBankingProduct.bind(this);
        this.editBankingProduct = this.editBankingProduct.bind(this);
        this.deleteBankingProduct = this.deleteBankingProduct.bind(this);
    }

    deleteBankingProduct(id){
        BankingProductService.deleteBankingProduct(id).then( res => {
            this.setState({bankingProducts: this.state.bankingProducts.filter(bankingProduct => bankingProduct.bankingProductId !== id)});
        });
    }
    viewBankingProduct(id){
        this.props.history.push(`/view-bankingProduct/${id}`);
    }
    editBankingProduct(id){
        this.props.history.push(`/add-bankingProduct/${id}`);
    }

    componentDidMount(){
        BankingProductService.getBankingProducts().then((res) => {
            this.setState({ bankingProducts: res.data});
        });
    }

    addBankingProduct(){
        this.props.history.push('/add-bankingProduct/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">BankingProduct List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addBankingProduct}> Add BankingProduct</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ProductCode </th>
                                    <th> Name </th>
                                    <th> Description </th>
                                    <th> ProductCategory </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.bankingProducts.map(
                                        bankingProduct => 
                                        <tr key = {bankingProduct.bankingProductId}>
                                             <td> { bankingProduct.productCode } </td>
                                             <td> { bankingProduct.name } </td>
                                             <td> { bankingProduct.description } </td>
                                             <td> { bankingProduct.productCategory } </td>
                                             <td>
                                                 <button onClick={ () => this.editBankingProduct(bankingProduct.bankingProductId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBankingProduct(bankingProduct.bankingProductId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewBankingProduct(bankingProduct.bankingProductId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListBankingProductComponent
