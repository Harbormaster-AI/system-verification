import React, { Component } from 'react'
import BankingProductService from '../services/BankingProductService';

class UpdateBankingProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                productCode: '',
                name: '',
                description: '',
                productCategory: ''
        }
        this.updateBankingProduct = this.updateBankingProduct.bind(this);

        this.changeproductCodeHandler = this.changeproductCodeHandler.bind(this);
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.changeProductCategoryHandler = this.changeProductCategoryHandler.bind(this);
    }

    componentDidMount(){
        BankingProductService.getBankingProductById(this.state.id).then( (res) =>{
            let bankingProduct = res.data;
            this.setState({
                productCode: bankingProduct.productCode,
                name: bankingProduct.name,
                description: bankingProduct.description,
                productCategory: bankingProduct.productCategory
            });
        });
    }

    updateBankingProduct = (e) => {
        e.preventDefault();
        let bankingProduct = {
            bankingProductId: this.state.id,
            productCode: this.state.productCode,
            name: this.state.name,
            description: this.state.description,
            productCategory: this.state.productCategory
        };
        console.log('bankingProduct => ' + JSON.stringify(bankingProduct));
        console.log('id => ' + JSON.stringify(this.state.id));
        BankingProductService.updateBankingProduct(bankingProduct).then( res => {
            this.props.history.push('/bankingProducts');
        });
    }

    changeproductCodeHandler= (event) => {
        this.setState({productCode: event.target.value});
    }
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changedescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
    changeProductCategoryHandler= (event) => {
        this.setState({productCategory: event.target.value});
    }

    cancel(){
        this.props.history.push('/bankingProducts');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update BankingProduct</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> productCode: </label>
                                                <input placeholder="productCode" name="productCode" className="form-control" value={this.state.productCode} onChange={this.changeproductCodeHandler}/>

                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> description: </label>
                                                <input placeholder="description" name="description" className="form-control" value={this.state.description} onChange={this.changedescriptionHandler}/>

                                            <label> ProductCategory: </label>
                                                <select value={this.state.productCategory} onChange={this.changeProductCategoryHandler}>
                      <option name="ProductCategory" className="form-control" >
                          Deposit
                      </option>
                      <option name="ProductCategory" className="form-control" >
                          Loan
                      </option>
                      <option name="ProductCategory" className="form-control" >
                          Card
                      </option>
                      <option name="ProductCategory" className="form-control" >
                          PaymentService
                      </option>
                      <option name="ProductCategory" className="form-control" >
                          Investment
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateBankingProduct}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateBankingProductComponent
