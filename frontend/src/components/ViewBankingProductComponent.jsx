import React, { Component } from 'react'
import BankingProductService from '../services/BankingProductService'

class ViewBankingProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            bankingProduct: {}
        }
    }

    componentDidMount(){
        BankingProductService.getBankingProductById(this.state.id).then( res => {
            this.setState({bankingProduct: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View BankingProduct Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> productCode:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.bankingProduct.productCode }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.bankingProduct.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> description:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.bankingProduct.description }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> ProductCategory:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.bankingProduct.productCategory }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewBankingProductComponent
