import React, { Component } from 'react'
import ConnectivityPlanService from '../services/ConnectivityPlanService';

class CreateConnectivityPlanComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                dataCapMB: '',
                billingCycleDays: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changedataCapMBHandler = this.changedataCapMBHandler.bind(this);
        this.changebillingCycleDaysHandler = this.changebillingCycleDaysHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ConnectivityPlanService.getConnectivityPlanById(this.state.id).then( (res) =>{
                let connectivityPlan = res.data;
                this.setState({
                    name: connectivityPlan.name,
                    dataCapMB: connectivityPlan.dataCapMB,
                    billingCycleDays: connectivityPlan.billingCycleDays
                });
            });
        }        
    }
    saveOrUpdateConnectivityPlan = (e) => {
        e.preventDefault();
        let connectivityPlan = {
                connectivityPlanId: this.state.id,
                name: this.state.name,
                dataCapMB: this.state.dataCapMB,
                billingCycleDays: this.state.billingCycleDays
            };
        console.log('connectivityPlan => ' + JSON.stringify(connectivityPlan));

        // step 5
        if(this.state.id === '_add'){
            connectivityPlan.connectivityPlanId=''
            ConnectivityPlanService.createConnectivityPlan(connectivityPlan).then(res =>{
                this.props.history.push('/connectivityPlans');
            });
        }else{
            ConnectivityPlanService.updateConnectivityPlan(connectivityPlan).then( res => {
                this.props.history.push('/connectivityPlans');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add ConnectivityPlan</h3>
        }else{
            return <h3 className="text-center">Update ConnectivityPlan</h3>
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
                                            <label> name:&emsp; </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> dataCapMB:&emsp; </label>
                                                <input type="number" placeholder="dataCapMB" name="dataCapMB" className="form-control" value={this.state.dataCapMB} onChange={this.changedataCapMBHandler}/>

                                            <label> billingCycleDays:&emsp; </label>
                                                <input type="number" placeholder="billingCycleDays" name="billingCycleDays" className="form-control" value={this.state.billingCycleDays} onChange={this.changebillingCycleDaysHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateConnectivityPlan}>Save</button>
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

export default CreateConnectivityPlanComponent
