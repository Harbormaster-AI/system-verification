import React, { Component } from 'react'
import FXTradeService from '../services/FXTradeService'

class ViewFXTradeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            fXTrade: {}
        }
    }

    componentDidMount(){
        FXTradeService.getFXTradeById(this.state.id).then( res => {
            this.setState({fXTrade: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View FXTrade Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> tradeReference:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fXTrade.tradeReference }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> tradeDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fXTrade.tradeDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> settlementDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fXTrade.settlementDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> amountSold:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fXTrade.amountSold }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> amountBought:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fXTrade.amountBought }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> rate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fXTrade.rate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.fXTrade.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewFXTradeComponent
