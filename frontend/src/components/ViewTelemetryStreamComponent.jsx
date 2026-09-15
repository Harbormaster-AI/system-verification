import React, { Component } from 'react'
import TelemetryStreamService from '../services/TelemetryStreamService'

class ViewTelemetryStreamComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            telemetryStream: {}
        }
    }

    componentDidMount(){
        TelemetryStreamService.getTelemetryStreamById(this.state.id).then( res => {
            this.setState({telemetryStream: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View TelemetryStream Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> streamName:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.telemetryStream.streamName }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> retentionDays:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.telemetryStream.retentionDays }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Qos:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.telemetryStream.qos }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewTelemetryStreamComponent
