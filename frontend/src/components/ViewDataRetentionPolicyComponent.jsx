import React, { Component } from 'react'
import DataRetentionPolicyService from '../services/DataRetentionPolicyService'

class ViewDataRetentionPolicyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            dataRetentionPolicy: {}
        }
    }

    componentDidMount(){
        DataRetentionPolicyService.getDataRetentionPolicyById(this.state.id).then( res => {
            this.setState({dataRetentionPolicy: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View DataRetentionPolicy Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.dataRetentionPolicy.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> retentionDays:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.dataRetentionPolicy.retentionDays }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewDataRetentionPolicyComponent
