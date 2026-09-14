import React, { Component } from 'react'
import FeeChargeService from '../services/FeeChargeService';

class CreateFeeChargeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                feeCode: '',
                amount: '',
                appliedOn: '',
                feeType: ''
        }
        this.changefeeCodeHandler = this.changefeeCodeHandler.bind(this);
        this.changeamountHandler = this.changeamountHandler.bind(this);
        this.changeappliedOnHandler = this.changeappliedOnHandler.bind(this);
        this.changeFeeTypeHandler = this.changeFeeTypeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
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
    }
    saveOrUpdateFeeCharge = (e) => {
        e.preventDefault();
        let feeCharge = {
                feeChargeId: this.state.id,
                feeCode: this.state.feeCode,
                amount: this.state.amount,
                appliedOn: this.state.appliedOn,
                feeType: this.state.feeType
            };
        console.log('feeCharge => ' + JSON.stringify(feeCharge));

        // step 5
        if(this.state.id === '_add'){
            feeCharge.feeChargeId=''
            FeeChargeService.createFeeCharge(feeCharge).then(res =>{
                this.props.history.push('/feeCharges');
            });
        }else{
            FeeChargeService.updateFeeCharge(feeCharge).then( res => {
                this.props.history.push('/feeCharges');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add FeeCharge</h3>
        }else{
            return <h3 className="text-center">Update FeeCharge</h3>
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
                                            <label> feeCode:&emsp; </label>
                                                <input placeholder="feeCode" name="feeCode" className="form-control" value={this.state.feeCode} onChange={this.changefeeCodeHandler}/>

                                            <label> amount:&emsp; </label>
                                                <input placeholder="amount" name="amount" className="form-control" value={this.state.amount} onChange={this.changeamountHandler}/>

                                            <label> appliedOn:&emsp; </label>
                                                <input type="date" placeholder="appliedOn" name="appliedOn" className="form-control" value={this.state.appliedOn} onChange={this.changeappliedOnHandler}/>

                                            <label> FeeType:&emsp; </label>
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

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateFeeCharge}>Save</button>
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

export default CreateFeeChargeComponent
