import React, { Component } from 'react'
import ConnectivityPlanService from '../services/ConnectivityPlanService';

class UpdateConnectivityPlanComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                dataCapMB: '',
                billingCycleDays: ''
        }
        this.updateConnectivityPlan = this.updateConnectivityPlan.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changedataCapMBHandler = this.changedataCapMBHandler.bind(this);
        this.changebillingCycleDaysHandler = this.changebillingCycleDaysHandler.bind(this);
    }

    componentDidMount(){
        ConnectivityPlanService.getConnectivityPlanById(this.state.id).then( (res) =>{
            let connectivityPlan = res.data;
            this.setState({
                name: connectivityPlan.name,
                dataCapMB: connectivityPlan.dataCapMB,
                billingCycleDays: connectivityPlan.billingCycleDays
            });
        });
    }

    updateConnectivityPlan = (e) => {
        e.preventDefault();
        let connectivityPlan = {
            connectivityPlanId: this.state.id,
            name: this.state.name,
            dataCapMB: this.state.dataCapMB,
            billingCycleDays: this.state.billingCycleDays
        };
        console.log('connectivityPlan => ' + JSON.stringify(connectivityPlan));
        console.log('id => ' + JSON.stringify(this.state.id));
        ConnectivityPlanService.updateConnectivityPlan(connectivityPlan).then( res => {
            this.props.history.push('/connectivityPlans');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changedataCapMBHandler= (event) => {
        this.setState({dataCapMB: event.target.value});
    }
    changebillingCycleDaysHandler= (event) => {
        this.setState({billingCycleDays: event.target.value});
    }

    cancel(){
        this.props.history.push('/connectivityPlans');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update ConnectivityPlan</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> dataCapMB: </label>
                                                <input type="number" placeholder="dataCapMB" name="dataCapMB" className="form-control" value={this.state.dataCapMB} onChange={this.changedataCapMBHandler}/>

                                            <label> billingCycleDays: </label>
                                                <input type="number" placeholder="billingCycleDays" name="billingCycleDays" className="form-control" value={this.state.billingCycleDays} onChange={this.changebillingCycleDaysHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateConnectivityPlan}>Save</button>
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

export default UpdateConnectivityPlanComponent
