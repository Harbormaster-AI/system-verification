import React, { Component } from 'react'
import AccountStatementService from '../services/AccountStatementService';

class UpdateAccountStatementComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                statementNumber: '',
                periodStart: '',
                periodEnd: '',
                openingBalance: '',
                closingBalance: '',
                deliveryMethod: ''
        }
        this.updateAccountStatement = this.updateAccountStatement.bind(this);

        this.changestatementNumberHandler = this.changestatementNumberHandler.bind(this);
        this.changeperiodStartHandler = this.changeperiodStartHandler.bind(this);
        this.changeperiodEndHandler = this.changeperiodEndHandler.bind(this);
        this.changeopeningBalanceHandler = this.changeopeningBalanceHandler.bind(this);
        this.changeclosingBalanceHandler = this.changeclosingBalanceHandler.bind(this);
        this.changeDeliveryMethodHandler = this.changeDeliveryMethodHandler.bind(this);
    }

    componentDidMount(){
        AccountStatementService.getAccountStatementById(this.state.id).then( (res) =>{
            let accountStatement = res.data;
            this.setState({
                statementNumber: accountStatement.statementNumber,
                periodStart: accountStatement.periodStart,
                periodEnd: accountStatement.periodEnd,
                openingBalance: accountStatement.openingBalance,
                closingBalance: accountStatement.closingBalance,
                deliveryMethod: accountStatement.deliveryMethod
            });
        });
    }

    updateAccountStatement = (e) => {
        e.preventDefault();
        let accountStatement = {
            accountStatementId: this.state.id,
            statementNumber: this.state.statementNumber,
            periodStart: this.state.periodStart,
            periodEnd: this.state.periodEnd,
            openingBalance: this.state.openingBalance,
            closingBalance: this.state.closingBalance,
            deliveryMethod: this.state.deliveryMethod
        };
        console.log('accountStatement => ' + JSON.stringify(accountStatement));
        console.log('id => ' + JSON.stringify(this.state.id));
        AccountStatementService.updateAccountStatement(accountStatement).then( res => {
            this.props.history.push('/accountStatements');
        });
    }

    changestatementNumberHandler= (event) => {
        this.setState({statementNumber: event.target.value});
    }
    changeperiodStartHandler= (event) => {
        this.setState({periodStart: event.target.value});
    }
    changeperiodEndHandler= (event) => {
        this.setState({periodEnd: event.target.value});
    }
    changeopeningBalanceHandler= (event) => {
        this.setState({openingBalance: event.target.value});
    }
    changeclosingBalanceHandler= (event) => {
        this.setState({closingBalance: event.target.value});
    }
    changeDeliveryMethodHandler= (event) => {
        this.setState({deliveryMethod: event.target.value});
    }

    cancel(){
        this.props.history.push('/accountStatements');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update AccountStatement</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> statementNumber: </label>
                                                <input placeholder="statementNumber" name="statementNumber" className="form-control" value={this.state.statementNumber} onChange={this.changestatementNumberHandler}/>

                                            <label> periodStart: </label>
                                                <input type="date" placeholder="periodStart" name="periodStart" className="form-control" value={this.state.periodStart} onChange={this.changeperiodStartHandler}/>

                                            <label> periodEnd: </label>
                                                <input type="date" placeholder="periodEnd" name="periodEnd" className="form-control" value={this.state.periodEnd} onChange={this.changeperiodEndHandler}/>

                                            <label> openingBalance: </label>
                                                <input placeholder="openingBalance" name="openingBalance" className="form-control" value={this.state.openingBalance} onChange={this.changeopeningBalanceHandler}/>

                                            <label> closingBalance: </label>
                                                <input placeholder="closingBalance" name="closingBalance" className="form-control" value={this.state.closingBalance} onChange={this.changeclosingBalanceHandler}/>

                                            <label> DeliveryMethod: </label>
                                                <select value={this.state.deliveryMethod} onChange={this.changeDeliveryMethodHandler}>
                      <option name="DeliveryMethod" className="form-control" >
                          Electronic
                      </option>
                      <option name="DeliveryMethod" className="form-control" >
                          Paper
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateAccountStatement}>Save</button>
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

export default UpdateAccountStatementComponent
