import React, { Component } from 'react'
import ProvisioningRecordService from '../services/ProvisioningRecordService'

class ViewProvisioningRecordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            provisioningRecord: {}
        }
    }

    componentDidMount(){
        ProvisioningRecordService.getProvisioningRecordById(this.state.id).then( res => {
            this.setState({provisioningRecord: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View ProvisioningRecord Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> enrolledAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.provisioningRecord.enrolledAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> provisioningService:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.provisioningRecord.provisioningService }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Method:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.provisioningRecord.method }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.provisioningRecord.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewProvisioningRecordComponent
