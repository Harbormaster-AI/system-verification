import React, { Component } from 'react'
import FeeChargeService from '../services/FeeChargeService';

class UpdateFeeChargeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                feeCode: '',
                amount: '',
                appliedOn: '',
                feeType: ''
        }
        this.updateFeeCharge = this.updateFeeCharge.bind(this);

        this.changefeeCodeHandler = this.changefeeCodeHandler.bind(this);
        this.changeamountHandler = this.changeamountHandler.bind(this);
        this.changeappliedOnHandler = this.changeappliedOnHandler.bind(this);
        this.changeFeeTypeHandler = this.changeFeeTypeHandler.bind(this);
    }

    componentDidMount(){
        FeeChargeService.getFeeChargeById(this.state.id).then( (res) =>{
            let feeCharge = res.data;
            this.setState({
                feeCode: feeCharge.feeCode,
                amount: feeCharge.amount,
                appliedOn: feeCharge.appliedOn,
                feeType: feeCharge.feeType
            });
        });
    }

    updateFeeCharge = (e) => {
        e.preventDefault();
        let feeCharge = {
            feeChargeId: this.state.id,
            feeCode: this.state.feeCode,
            amount: this.state.amount,
            appliedOn: this.state.appliedOn,
            feeType: this.state.feeType
        };
        console.log('feeCharge => ' + JSON.stringify(feeCharge));
        console.log('id => ' + JSON.stringify(this.state.id));
        FeeChargeService.updateFeeCharge(feeCharge).then( res => {
            this.props.history.push('/feeCharges');
        });
    }

    changefeeCodeHandler= (event) => {
        this.setState({feeCode: event.target.value});
    }
    changeamountHandler= (event) => {
        this.setState({amount: event.target.value});
    }
    changeappliedOnHandler= (event) => {
        this.setState({appliedOn: event.target.value});
    }
    changeFeeTypeHandler= (event) => {
        this.setState({feeType: event.target.value});
    }

    cancel(){
        this.props.history.push('/feeCharges');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update FeeCharge</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> feeCode: </label>
                                                <input placeholder="feeCode" name="feeCode" className="form-control" value={this.state.feeCode} onChange={this.changefeeCodeHandler}/>

                                            <label> amount: </label>
                                                <input placeholder="amount" name="amount" className="form-control" value={this.state.amount} onChange={this.changeamountHandler}/>

                                            <label> appliedOn: </label>
                                                <input type="date" placeholder="appliedOn" name="appliedOn" className="form-control" value={this.state.appliedOn} onChange={this.changeappliedOnHandler}/>

                                            <label> FeeType: </label>
                                                <select value={this.state.feeType} onChange={this.changeFeeTypeHandler}>
                      <option name="FeeType" className="form-control" >
                          Maintenance
                      </option>
                      <option name="FeeType" className="form-control" >
                          Overdraft
                      </option>
                      <option name="FeeType" className="form-control" >
                          Wire
                      </option>
                      <option name="FeeType" className="form-control" >
                          ATM
                      </option>
                      <option name="FeeType" className="form-control" >
                          CardAnnual
                      </option>
                      <option name="FeeType" className="form-control" >
                          LatePayment
                      </option>
                      <option name="FeeType" className="form-control" >
                          EarlyWithdrawal
                      </option>
                      <option name="FeeType" className="form-control" >
                          ReplacementCard
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateFeeCharge}>Save</button>
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

export default UpdateFeeChargeComponent
