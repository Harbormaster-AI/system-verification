import React, { Component } from 'react'
import FXTradeService from '../services/FXTradeService';

class CreateFXTradeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                tradeReference: '',
                tradeDate: '',
                settlementDate: '',
                amountSold: '',
                amountBought: '',
                rate: '',
                status: ''
        }
        this.changetradeReferenceHandler = this.changetradeReferenceHandler.bind(this);
        this.changetradeDateHandler = this.changetradeDateHandler.bind(this);
        this.changesettlementDateHandler = this.changesettlementDateHandler.bind(this);
        this.changeamountSoldHandler = this.changeamountSoldHandler.bind(this);
        this.changeamountBoughtHandler = this.changeamountBoughtHandler.bind(this);
        this.changerateHandler = this.changerateHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            FXTradeService.getFXTradeById(this.state.id).then( (res) =>{
                let fXTrade = res.data;
                this.setState({
                    tradeReference: fXTrade.tradeReference,
                    tradeDate: fXTrade.tradeDate,
                    settlementDate: fXTrade.settlementDate,
                    amountSold: fXTrade.amountSold,
                    amountBought: fXTrade.amountBought,
                    rate: fXTrade.rate,
                    status: fXTrade.status
                });
            });
        }        
    }
    saveOrUpdateFXTrade = (e) => {
        e.preventDefault();
        let fXTrade = {
                fXTradeId: this.state.id,
                tradeReference: this.state.tradeReference,
                tradeDate: this.state.tradeDate,
                settlementDate: this.state.settlementDate,
                amountSold: this.state.amountSold,
                amountBought: this.state.amountBought,
                rate: this.state.rate,
                status: this.state.status
            };
        console.log('fXTrade => ' + JSON.stringify(fXTrade));

        // step 5
        if(this.state.id === '_add'){
            fXTrade.fXTradeId=''
            FXTradeService.createFXTrade(fXTrade).then(res =>{
                this.props.history.push('/fXTrades');
            });
        }else{
            FXTradeService.updateFXTrade(fXTrade).then( res => {
                this.props.history.push('/fXTrades');
            });
        }
    }
    
    changetradeReferenceHandler= (event) => {
        this.setState({tradeReference: event.target.value});
    }
    changetradeDateHandler= (event) => {
        this.setState({tradeDate: event.target.value});
    }
    changesettlementDateHandler= (event) => {
        this.setState({settlementDate: event.target.value});
    }
    changeamountSoldHandler= (event) => {
        this.setState({amountSold: event.target.value});
    }
    changeamountBoughtHandler= (event) => {
        this.setState({amountBought: event.target.value});
    }
    changerateHandler= (event) => {
        this.setState({rate: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/fXTrades');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add FXTrade</h3>
        }else{
            return <h3 className="text-center">Update FXTrade</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> tradeReference:&emsp; </label>
                                                <input placeholder="tradeReference" name="tradeReference" className="form-control" value={this.state.tradeReference} onChange={this.changetradeReferenceHandler}/>

                                            <label> tradeDate:&emsp; </label>
                                                <input type="date" placeholder="tradeDate" name="tradeDate" className="form-control" value={this.state.tradeDate} onChange={this.changetradeDateHandler}/>

                                            <label> settlementDate:&emsp; </label>
                                                <input type="date" placeholder="settlementDate" name="settlementDate" className="form-control" value={this.state.settlementDate} onChange={this.changesettlementDateHandler}/>

                                            <label> amountSold:&emsp; </label>
                                                <input placeholder="amountSold" name="amountSold" className="form-control" value={this.state.amountSold} onChange={this.changeamountSoldHandler}/>

                                            <label> amountBought:&emsp; </label>
                                                <input placeholder="amountBought" name="amountBought" className="form-control" value={this.state.amountBought} onChange={this.changeamountBoughtHandler}/>

                                            <label> rate:&emsp; </label>
                                                <input placeholder="rate" name="rate" className="form-control" value={this.state.rate} onChange={this.changerateHandler}/>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Booked
                      </option>
                      <option name="Status" className="form-control" >
                          Settled
                      </option>
                      <option name="Status" className="form-control" >
                          Cancelled
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateFXTrade}>Save</button>
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

export default CreateFXTradeComponent
