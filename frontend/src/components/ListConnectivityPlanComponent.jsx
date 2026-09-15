import React, { Component } from 'react'
import ConnectivityPlanService from '../services/ConnectivityPlanService'

class ListConnectivityPlanComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                connectivityPlans: []
        }
        this.addConnectivityPlan = this.addConnectivityPlan.bind(this);
        this.editConnectivityPlan = this.editConnectivityPlan.bind(this);
        this.deleteConnectivityPlan = this.deleteConnectivityPlan.bind(this);
    }

    deleteConnectivityPlan(id){
        ConnectivityPlanService.deleteConnectivityPlan(id).then( res => {
            this.setState({connectivityPlans: this.state.connectivityPlans.filter(connectivityPlan => connectivityPlan.connectivityPlanId !== id)});
        });
    }
    viewConnectivityPlan(id){
        this.props.history.push(`/view-connectivityPlan/${id}`);
    }
    editConnectivityPlan(id){
        this.props.history.push(`/add-connectivityPlan/${id}`);
    }

    componentDidMount(){
        ConnectivityPlanService.getConnectivityPlans().then((res) => {
            this.setState({ connectivityPlans: res.data});
        });
    }

    addConnectivityPlan(){
        this.props.history.push('/add-connectivityPlan/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">ConnectivityPlan List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addConnectivityPlan}> Add ConnectivityPlan</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> DataCapMB </th>
                                    <th> BillingCycleDays </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.connectivityPlans.map(
                                        connectivityPlan => 
                                        <tr key = {connectivityPlan.connectivityPlanId}>
                                             <td> { connectivityPlan.name } </td>
                                             <td> { connectivityPlan.dataCapMB } </td>
                                             <td> { connectivityPlan.billingCycleDays } </td>
                                             <td>
                                                 <button onClick={ () => this.editConnectivityPlan(connectivityPlan.connectivityPlanId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteConnectivityPlan(connectivityPlan.connectivityPlanId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewConnectivityPlan(connectivityPlan.connectivityPlanId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListConnectivityPlanComponent
