import React, { Component } from 'react'
import IoTDeviceService from '../services/IoTDeviceService'

class ViewIoTDeviceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            ioTDevice: {}
        }
    }

    componentDidMount(){
        IoTDeviceService.getIoTDeviceById(this.state.id).then( res => {
            this.setState({ioTDevice: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View IoTDevice Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> deviceId:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.ioTDevice.deviceId }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> serialNumber:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.ioTDevice.serialNumber }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> lastSeen:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.ioTDevice.lastSeen }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> firmwareVersion:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.ioTDevice.firmwareVersion }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.ioTDevice.status }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> PowerSource:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.ioTDevice.powerSource }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewIoTDeviceComponent
