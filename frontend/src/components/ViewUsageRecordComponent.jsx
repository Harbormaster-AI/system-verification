import React, { Component } from 'react'
import UsageRecordService from '../services/UsageRecordService'

class ViewUsageRecordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            usageRecord: {}
        }
    }

    componentDidMount(){
        UsageRecordService.getUsageRecordById(this.state.id).then( res => {
            this.setState({usageRecord: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View UsageRecord Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> periodStart:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.usageRecord.periodStart }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> periodEnd:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.usageRecord.periodEnd }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> messagesSent:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.usageRecord.messagesSent }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> dataVolumeMB:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.usageRecord.dataVolumeMB }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewUsageRecordComponent
