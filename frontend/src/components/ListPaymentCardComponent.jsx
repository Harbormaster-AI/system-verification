import React, { Component } from 'react'
import PaymentCardService from '../services/PaymentCardService'

class ListPaymentCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                paymentCards: []
        }
        this.addPaymentCard = this.addPaymentCard.bind(this);
        this.editPaymentCard = this.editPaymentCard.bind(this);
        this.deletePaymentCard = this.deletePaymentCard.bind(this);
    }

    deletePaymentCard(id){
        PaymentCardService.deletePaymentCard(id).then( res => {
            this.setState({paymentCards: this.state.paymentCards.filter(paymentCard => paymentCard.paymentCardId !== id)});
        });
    }
    viewPaymentCard(id){
        this.props.history.push(`/view-paymentCard/${id}`);
    }
    editPaymentCard(id){
        this.props.history.push(`/add-paymentCard/${id}`);
    }

    componentDidMount(){
        PaymentCardService.getPaymentCards().then((res) => {
            this.setState({ paymentCards: res.data});
        });
    }

    addPaymentCard(){
        this.props.history.push('/add-paymentCard/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">PaymentCard List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addPaymentCard}> Add PaymentCard</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> CardNumber </th>
                                    <th> EmbossedName </th>
                                    <th> ExpiryMonth </th>
                                    <th> ExpiryYear </th>
                                    <th> CardType </th>
                                    <th> CardStatus </th>
                                    <th> Network </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.paymentCards.map(
                                        paymentCard => 
                                        <tr key = {paymentCard.paymentCardId}>
                                             <td> { paymentCard.cardNumber } </td>
                                             <td> { paymentCard.embossedName } </td>
                                             <td> { paymentCard.expiryMonth } </td>
                                             <td> { paymentCard.expiryYear } </td>
                                             <td> { paymentCard.cardType } </td>
                                             <td> { paymentCard.cardStatus } </td>
                                             <td> { paymentCard.network } </td>
                                             <td>
                                                 <button onClick={ () => this.editPaymentCard(paymentCard.paymentCardId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deletePaymentCard(paymentCard.paymentCardId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewPaymentCard(paymentCard.paymentCardId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListPaymentCardComponent
