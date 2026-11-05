import React, { Component } from 'react'
import PaymentCardService from '../services/PaymentCardService'

class ViewPaymentCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            paymentCard: {}
        }
    }

    componentDidMount(){
        PaymentCardService.getPaymentCardById(this.state.id).then( res => {
            this.setState({paymentCard: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View PaymentCard Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> cardNumber:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.paymentCard.cardNumber }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> embossedName:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.paymentCard.embossedName }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> expiryMonth:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.paymentCard.expiryMonth }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> expiryYear:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.paymentCard.expiryYear }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> CardType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.paymentCard.cardType }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> CardStatus:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.paymentCard.cardStatus }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Network:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.paymentCard.network }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewPaymentCardComponent
