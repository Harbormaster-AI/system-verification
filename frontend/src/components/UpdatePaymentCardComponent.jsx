import React, { Component } from 'react'
import PaymentCardService from '../services/PaymentCardService';

class UpdatePaymentCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                cardNumber: '',
                embossedName: '',
                expiryMonth: '',
                expiryYear: '',
                cardType: '',
                cardStatus: '',
                network: ''
        }
        this.updatePaymentCard = this.updatePaymentCard.bind(this);

        this.changecardNumberHandler = this.changecardNumberHandler.bind(this);
        this.changeembossedNameHandler = this.changeembossedNameHandler.bind(this);
        this.changeexpiryMonthHandler = this.changeexpiryMonthHandler.bind(this);
        this.changeexpiryYearHandler = this.changeexpiryYearHandler.bind(this);
        this.changeCardTypeHandler = this.changeCardTypeHandler.bind(this);
        this.changeCardStatusHandler = this.changeCardStatusHandler.bind(this);
        this.changeNetworkHandler = this.changeNetworkHandler.bind(this);
    }

    componentDidMount(){
        PaymentCardService.getPaymentCardById(this.state.id).then( (res) =>{
            let paymentCard = res.data;
            this.setState({
                cardNumber: paymentCard.cardNumber,
                embossedName: paymentCard.embossedName,
                expiryMonth: paymentCard.expiryMonth,
                expiryYear: paymentCard.expiryYear,
                cardType: paymentCard.cardType,
                cardStatus: paymentCard.cardStatus,
                network: paymentCard.network
            });
        });
    }

    updatePaymentCard = (e) => {
        e.preventDefault();
        let paymentCard = {
            paymentCardId: this.state.id,
            cardNumber: this.state.cardNumber,
            embossedName: this.state.embossedName,
            expiryMonth: this.state.expiryMonth,
            expiryYear: this.state.expiryYear,
            cardType: this.state.cardType,
            cardStatus: this.state.cardStatus,
            network: this.state.network
        };
        console.log('paymentCard => ' + JSON.stringify(paymentCard));
        console.log('id => ' + JSON.stringify(this.state.id));
        PaymentCardService.updatePaymentCard(paymentCard).then( res => {
            this.props.history.push('/paymentCards');
        });
    }

    changecardNumberHandler= (event) => {
        this.setState({cardNumber: event.target.value});
    }
    changeembossedNameHandler= (event) => {
        this.setState({embossedName: event.target.value});
    }
    changeexpiryMonthHandler= (event) => {
        this.setState({expiryMonth: event.target.value});
    }
    changeexpiryYearHandler= (event) => {
        this.setState({expiryYear: event.target.value});
    }
    changeCardTypeHandler= (event) => {
        this.setState({cardType: event.target.value});
    }
    changeCardStatusHandler= (event) => {
        this.setState({cardStatus: event.target.value});
    }
    changeNetworkHandler= (event) => {
        this.setState({network: event.target.value});
    }

    cancel(){
        this.props.history.push('/paymentCards');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update PaymentCard</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> cardNumber: </label>
                                                <input placeholder="cardNumber" name="cardNumber" className="form-control" value={this.state.cardNumber} onChange={this.changecardNumberHandler}/>

                                            <label> embossedName: </label>
                                                <input placeholder="embossedName" name="embossedName" className="form-control" value={this.state.embossedName} onChange={this.changeembossedNameHandler}/>

                                            <label> expiryMonth: </label>
                                                <input type="number" placeholder="expiryMonth" name="expiryMonth" className="form-control" value={this.state.expiryMonth} onChange={this.changeexpiryMonthHandler}/>

                                            <label> expiryYear: </label>
                                                <input type="number" placeholder="expiryYear" name="expiryYear" className="form-control" value={this.state.expiryYear} onChange={this.changeexpiryYearHandler}/>

                                            <label> CardType: </label>
                                                <select value={this.state.cardType} onChange={this.changeCardTypeHandler}>
                      <option name="CardType" className="form-control" >
                          Debit
                      </option>
                      <option name="CardType" className="form-control" >
                          Credit
                      </option>
                      <option name="CardType" className="form-control" >
                          Prepaid
                      </option>
                      <option name="CardType" className="form-control" >
                          Virtual
                      </option>
                    </select>

                                            <label> CardStatus: </label>
                                                <select value={this.state.cardStatus} onChange={this.changeCardStatusHandler}>
                      <option name="CardStatus" className="form-control" >
                          Active
                      </option>
                      <option name="CardStatus" className="form-control" >
                          Blocked
                      </option>
                      <option name="CardStatus" className="form-control" >
                          LostStolen
                      </option>
                      <option name="CardStatus" className="form-control" >
                          Expired
                      </option>
                      <option name="CardStatus" className="form-control" >
                          Closed
                      </option>
                    </select>

                                            <label> Network: </label>
                                                <select value={this.state.network} onChange={this.changeNetworkHandler}>
                      <option name="Network" className="form-control" >
                          Visa
                      </option>
                      <option name="Network" className="form-control" >
                          Mastercard
                      </option>
                      <option name="Network" className="form-control" >
                          Amex
                      </option>
                      <option name="Network" className="form-control" >
                          Discover
                      </option>
                      <option name="Network" className="form-control" >
                          UnionPay
                      </option>
                      <option name="Network" className="form-control" >
                          Other
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updatePaymentCard}>Save</button>
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

export default UpdatePaymentCardComponent
