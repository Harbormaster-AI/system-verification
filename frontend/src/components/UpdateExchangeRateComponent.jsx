import React, { Component } from 'react'
import ExchangeRateService from '../services/ExchangeRateService';

class UpdateExchangeRateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                baseCurrency: '',
                counterCurrency: '',
                rate: '',
                asOf: '',
                source: ''
        }
        this.updateExchangeRate = this.updateExchangeRate.bind(this);

        this.changebaseCurrencyHandler = this.changebaseCurrencyHandler.bind(this);
        this.changecounterCurrencyHandler = this.changecounterCurrencyHandler.bind(this);
        this.changerateHandler = this.changerateHandler.bind(this);
        this.changeasOfHandler = this.changeasOfHandler.bind(this);
        this.changesourceHandler = this.changesourceHandler.bind(this);
    }

    componentDidMount(){
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

    updateExchangeRate = (e) => {
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
        console.log('id => ' + JSON.stringify(this.state.id));
        ExchangeRateService.updateExchangeRate(exchangeRate).then( res => {
            this.props.history.push('/exchangeRates');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update ExchangeRate</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> baseCurrency: </label>
                                                <input placeholder="baseCurrency" name="baseCurrency" className="form-control" value={this.state.baseCurrency} onChange={this.changebaseCurrencyHandler}/>

                                            <label> counterCurrency: </label>
                                                <input placeholder="counterCurrency" name="counterCurrency" className="form-control" value={this.state.counterCurrency} onChange={this.changecounterCurrencyHandler}/>

                                            <label> rate: </label>
                                                <input placeholder="rate" name="rate" className="form-control" value={this.state.rate} onChange={this.changerateHandler}/>

                                            <label> asOf: </label>
                                                <input type="date" placeholder="asOf" name="asOf" className="form-control" value={this.state.asOf} onChange={this.changeasOfHandler}/>

                                            <label> source: </label>
                                                <input placeholder="source" name="source" className="form-control" value={this.state.source} onChange={this.changesourceHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateExchangeRate}>Save</button>
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

export default UpdateExchangeRateComponent
