import React, { Component } from 'react'
import FXTradeService from '../services/FXTradeService'

class ListFXTradeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                fXTrades: []
        }
        this.addFXTrade = this.addFXTrade.bind(this);
        this.editFXTrade = this.editFXTrade.bind(this);
        this.deleteFXTrade = this.deleteFXTrade.bind(this);
    }

    deleteFXTrade(id){
        FXTradeService.deleteFXTrade(id).then( res => {
            this.setState({fXTrades: this.state.fXTrades.filter(fXTrade => fXTrade.fXTradeId !== id)});
        });
    }
    viewFXTrade(id){
        this.props.history.push(`/view-fXTrade/${id}`);
    }
    editFXTrade(id){
        this.props.history.push(`/add-fXTrade/${id}`);
    }

    componentDidMount(){
        FXTradeService.getFXTrades().then((res) => {
            this.setState({ fXTrades: res.data});
        });
    }

    addFXTrade(){
        this.props.history.push('/add-fXTrade/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">FXTrade List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addFXTrade}> Add FXTrade</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> TradeReference </th>
                                    <th> TradeDate </th>
                                    <th> SettlementDate </th>
                                    <th> AmountSold </th>
                                    <th> AmountBought </th>
                                    <th> Rate </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.fXTrades.map(
                                        fXTrade => 
                                        <tr key = {fXTrade.fXTradeId}>
                                             <td> { fXTrade.tradeReference } </td>
                                             <td> { fXTrade.tradeDate } </td>
                                             <td> { fXTrade.settlementDate } </td>
                                             <td> { fXTrade.amountSold } </td>
                                             <td> { fXTrade.amountBought } </td>
                                             <td> { fXTrade.rate } </td>
                                             <td> { fXTrade.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editFXTrade(fXTrade.fXTradeId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteFXTrade(fXTrade.fXTradeId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewFXTrade(fXTrade.fXTradeId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListFXTradeComponent
