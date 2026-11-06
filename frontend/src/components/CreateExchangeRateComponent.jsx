import React, { Component } from 'react'
import ExchangeRateService from '../services/ExchangeRateService';

class CreateExchangeRateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                baseCurrency: '',
                counterCurrency: '',
                rate: '',
                asOf: '',
                source: ''
        }
        this.changebaseCurrencyHandler = this.changebaseCurrencyHandler.bind(this);
        this.changecounterCurrencyHandler = this.changecounterCurrencyHandler.bind(this);
        this.changerateHandler = this.changerateHandler.bind(this);
        this.changeasOfHandler = this.changeasOfHandler.bind(this);
        this.changesourceHandler = this.changesourceHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ExchangeRateService.getExchangeRateById(this.state.id).then( (res) =>{
                let exchangeRate = res.data;
                this.setState({
                    baseCurrency: exchangeRate.baseCurrency,
                    counterCurrency: exchangeRate.counterCurrency,
                    rate: exchangeRate.rate,
                    asOf: exchangeRate.asOf,
                    source: exchangeRate.source
                });
            });
        }        
    }
    saveOrUpdateExchangeRate = (e) => {
        e.preventDefault();
        let exchangeRate = {
                exchangeRateId: this.state.id,
                baseCurrency: this.state.baseCurrency,
                counterCurrency: this.state.counterCurrency,
                rate: this.state.rate,
                asOf: this.state.asOf,
                source: this.state.source
            };
        console.log('exchangeRate => ' + JSON.stringify(exchangeRate));

        // step 5
        if(this.state.id === '_add'){
            exchangeRate.exchangeRateId=''
            ExchangeRateService.createExchangeRate(exchangeRate).then(res =>{
                this.props.history.push('/exchangeRates');
            });
        }else{
            ExchangeRateService.updateExchangeRate(exchangeRate).then( res => {
                this.props.history.push('/exchangeRates');
            });
        }
    }
    
    changebaseCurrencyHandler= (event) => {
        this.setState({baseCurrency: event.target.value});
    }
    changecounterCurrencyHandler= (event) => {
        this.setState({counterCurrency: event.target.value});
    }
    changerateHandler= (event) => {
        this.setState({rate: event.target.value});
    }
    changeasOfHandler= (event) => {
        this.setState({asOf: event.target.value});
    }
    changesourceHandler= (event) => {
        this.setState({source: event.target.value});
    }

    cancel(){
        this.props.history.push('/exchangeRates');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add ExchangeRate</h3>
        }else{
            return <h3 className="text-center">Update ExchangeRate</h3>
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
                                            <label> baseCurrency:&emsp; </label>
                                                <input placeholder="baseCurrency" name="baseCurrency" className="form-control" value={this.state.baseCurrency} onChange={this.changebaseCurrencyHandler}/>

                                            <label> counterCurrency:&emsp; </label>
                                                <input placeholder="counterCurrency" name="counterCurrency" className="form-control" value={this.state.counterCurrency} onChange={this.changecounterCurrencyHandler}/>

                                            <label> rate:&emsp; </label>
                                                <input placeholder="rate" name="rate" className="form-control" value={this.state.rate} onChange={this.changerateHandler}/>

                                            <label> asOf:&emsp; </label>
                                                <input type="date" placeholder="asOf" name="asOf" className="form-control" value={this.state.asOf} onChange={this.changeasOfHandler}/>

                                            <label> source:&emsp; </label>
                                                <input placeholder="source" name="source" className="form-control" value={this.state.source} onChange={this.changesourceHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateExchangeRate}>Save</button>
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

export default CreateExchangeRateComponent
