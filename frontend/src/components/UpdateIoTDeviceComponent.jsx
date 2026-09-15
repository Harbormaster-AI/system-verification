import React, { Component } from 'react'
import IoTDeviceService from '../services/IoTDeviceService';

class UpdateIoTDeviceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                deviceId: '',
                serialNumber: '',
                lastSeen: '',
                firmwareVersion: '',
                status: '',
                powerSource: ''
        }
        this.updateIoTDevice = this.updateIoTDevice.bind(this);

        this.changedeviceIdHandler = this.changedeviceIdHandler.bind(this);
        this.changeserialNumberHandler = this.changeserialNumberHandler.bind(this);
        this.changelastSeenHandler = this.changelastSeenHandler.bind(this);
        this.changefirmwareVersionHandler = this.changefirmwareVersionHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changePowerSourceHandler = this.changePowerSourceHandler.bind(this);
    }

    componentDidMount(){
        IoTDeviceService.getIoTDeviceById(this.state.id).then( (res) =>{
            let ioTDevice = res.data;
            this.setState({
                deviceId: ioTDevice.deviceId,
                serialNumber: ioTDevice.serialNumber,
                lastSeen: ioTDevice.lastSeen,
                firmwareVersion: ioTDevice.firmwareVersion,
                status: ioTDevice.status,
                powerSource: ioTDevice.powerSource
            });
        });
    }

    updateIoTDevice = (e) => {
        e.preventDefault();
        let ioTDevice = {
            ioTDeviceId: this.state.id,
            deviceId: this.state.deviceId,
            serialNumber: this.state.serialNumber,
            lastSeen: this.state.lastSeen,
            firmwareVersion: this.state.firmwareVersion,
            status: this.state.status,
            powerSource: this.state.powerSource
        };
        console.log('ioTDevice => ' + JSON.stringify(ioTDevice));
        console.log('id => ' + JSON.stringify(this.state.id));
        IoTDeviceService.updateIoTDevice(ioTDevice).then( res => {
            this.props.history.push('/ioTDevices');
        });
    }

    changedeviceIdHandler= (event) => {
        this.setState({deviceId: event.target.value});
    }
    changeserialNumberHandler= (event) => {
        this.setState({serialNumber: event.target.value});
    }
    changelastSeenHandler= (event) => {
        this.setState({lastSeen: event.target.value});
    }
    changefirmwareVersionHandler= (event) => {
        this.setState({firmwareVersion: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }
    changePowerSourceHandler= (event) => {
        this.setState({powerSource: event.target.value});
    }

    cancel(){
        this.props.history.push('/ioTDevices');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update IoTDevice</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> deviceId: </label>
                                                <input placeholder="deviceId" name="deviceId" className="form-control" value={this.state.deviceId} onChange={this.changedeviceIdHandler}/>

                                            <label> serialNumber: </label>
                                                <input placeholder="serialNumber" name="serialNumber" className="form-control" value={this.state.serialNumber} onChange={this.changeserialNumberHandler}/>

                                            <label> lastSeen: </label>
                                                <input type="time" placeholder="lastSeen" name="lastSeen" className="form-control" value={this.state.lastSeen} onChange={this.changelastSeenHandler}/>

                                            <label> firmwareVersion: </label>
                                                <input placeholder="firmwareVersion" name="firmwareVersion" className="form-control" value={this.state.firmwareVersion} onChange={this.changefirmwareVersionHandler}/>

                                            <label> Status: </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Provisioning
                      </option>
                      <option name="Status" className="form-control" >
                          Active
                      </option>
                      <option name="Status" className="form-control" >
                          Suspended
                      </option>
                      <option name="Status" className="form-control" >
                          Offline
                      </option>
                      <option name="Status" className="form-control" >
                          Decommissioned
                      </option>
                    </select>

                                            <label> PowerSource: </label>
                                                <select value={this.state.powerSource} onChange={this.changePowerSourceHandler}>
                      <option name="PowerSource" className="form-control" >
                          Battery
                      </option>
                      <option name="PowerSource" className="form-control" >
                          Mains
                      </option>
                      <option name="PowerSource" className="form-control" >
                          PoE
                      </option>
                      <option name="PowerSource" className="form-control" >
                          EnergyHarvesting
                      </option>
                      <option name="PowerSource" className="form-control" >
                          Solar
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateIoTDevice}>Save</button>
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

export default UpdateIoTDeviceComponent
