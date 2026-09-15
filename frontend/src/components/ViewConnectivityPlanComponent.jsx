import React, { Component } from 'react'
import ConnectivityPlanService from '../services/ConnectivityPlanService'

class ViewConnectivityPlanComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            connectivityPlan: {}
        }
    }

    componentDidMount(){
        ConnectivityPlanService.getConnectivityPlanById(this.state.id).then( res => {
            this.setState({connectivityPlan: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View ConnectivityPlan Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.connectivityPlan.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> dataCapMB:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.connectivityPlan.dataCapMB }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> billingCycleDays:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.connectivityPlan.billingCycleDays }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewConnectivityPlanComponent
