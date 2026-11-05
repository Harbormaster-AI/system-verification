import React, { Component } from 'react'
import BankService from '../services/BankService'

class ViewBankComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            bank: {}
        }
    }

    componentDidMount(){
        BankService.getBankById(this.state.id).then( res => {
            this.setState({bank: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Bank Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.bank.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> legalName:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.bank.legalName }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> swiftBic:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.bank.swiftBic }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> headquartersCountry:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.bank.headquartersCountry }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> website:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.bank.website }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewBankComponent
