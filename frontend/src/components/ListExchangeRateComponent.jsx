import React, { Component } from 'react'
import ExchangeRateService from '../services/ExchangeRateService'

class ListExchangeRateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                exchangeRates: []
        }
        this.addExchangeRate = this.addExchangeRate.bind(this);
        this.editExchangeRate = this.editExchangeRate.bind(this);
        this.deleteExchangeRate = this.deleteExchangeRate.bind(this);
    }

    deleteExchangeRate(id){
        ExchangeRateService.deleteExchangeRate(id).then( res => {
            this.setState({exchangeRates: this.state.exchangeRates.filter(exchangeRate => exchangeRate.exchangeRateId !== id)});
        });
    }
    viewExchangeRate(id){
        this.props.history.push(`/view-exchangeRate/${id}`);
    }
    editExchangeRate(id){
        this.props.history.push(`/add-exchangeRate/${id}`);
    }

    componentDidMount(){
        ExchangeRateService.getExchangeRates().then((res) => {
            this.setState({ exchangeRates: res.data});
        });
    }

    addExchangeRate(){
        this.props.history.push('/add-exchangeRate/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">ExchangeRate List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addExchangeRate}> Add ExchangeRate</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> BaseCurrency </th>
                                    <th> CounterCurrency </th>
                                    <th> Rate </th>
                                    <th> AsOf </th>
                                    <th> Source </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.exchangeRates.map(
                                        exchangeRate => 
                                        <tr key = {exchangeRate.exchangeRateId}>
                                             <td> { exchangeRate.baseCurrency } </td>
                                             <td> { exchangeRate.counterCurrency } </td>
                                             <td> { exchangeRate.rate } </td>
                                             <td> { exchangeRate.asOf } </td>
                                             <td> { exchangeRate.source } </td>
                                             <td>
                                                 <button onClick={ () => this.editExchangeRate(exchangeRate.exchangeRateId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteExchangeRate(exchangeRate.exchangeRateId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewExchangeRate(exchangeRate.exchangeRateId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListExchangeRateComponent
