import React, { Component } from 'react'
import DeviceModelService from '../services/DeviceModelService'

class ViewDeviceModelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            deviceModel: {}
        }
    }

    componentDidMount(){
        DeviceModelService.getDeviceModelById(this.state.id).then( res => {
            this.setState({deviceModel: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View DeviceModel Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceModel.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> modelNumber:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceModel.modelNumber }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> hardwareRevision:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceModel.hardwareRevision }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> SupportedConnectivity:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceModel.supportedConnectivity }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> DefaultTelemetryEncoding:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceModel.defaultTelemetryEncoding }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewDeviceModelComponent
