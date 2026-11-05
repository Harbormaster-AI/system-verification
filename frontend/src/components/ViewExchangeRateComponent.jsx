import React, { Component } from 'react'
import ExchangeRateService from '../services/ExchangeRateService'

class ViewExchangeRateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            exchangeRate: {}
        }
    }

    componentDidMount(){
        ExchangeRateService.getExchangeRateById(this.state.id).then( res => {
            this.setState({exchangeRate: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View ExchangeRate Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> baseCurrency:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.exchangeRate.baseCurrency }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> counterCurrency:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.exchangeRate.counterCurrency }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> rate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.exchangeRate.rate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> asOf:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.exchangeRate.asOf }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> source:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.exchangeRate.source }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewExchangeRateComponent
