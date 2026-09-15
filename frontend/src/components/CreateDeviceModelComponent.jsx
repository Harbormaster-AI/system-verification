import React, { Component } from 'react'
import DeviceModelService from '../services/DeviceModelService';

class CreateDeviceModelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                modelNumber: '',
                hardwareRevision: '',
                supportedConnectivity: '',
                defaultTelemetryEncoding: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changemodelNumberHandler = this.changemodelNumberHandler.bind(this);
        this.changehardwareRevisionHandler = this.changehardwareRevisionHandler.bind(this);
        this.changeSupportedConnectivityHandler = this.changeSupportedConnectivityHandler.bind(this);
        this.changeDefaultTelemetryEncodingHandler = this.changeDefaultTelemetryEncodingHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            DeviceModelService.getDeviceModelById(this.state.id).then( (res) =>{
                let deviceModel = res.data;
                this.setState({
                    name: deviceModel.name,
                    modelNumber: deviceModel.modelNumber,
                    hardwareRevision: deviceModel.hardwareRevision,
                    supportedConnectivity: deviceModel.supportedConnectivity,
                    defaultTelemetryEncoding: deviceModel.defaultTelemetryEncoding
                });
            });
        }        
    }
    saveOrUpdateDeviceModel = (e) => {
        e.preventDefault();
        let deviceModel = {
                deviceModelId: this.state.id,
                name: this.state.name,
                modelNumber: this.state.modelNumber,
                hardwareRevision: this.state.hardwareRevision,
                supportedConnectivity: this.state.supportedConnectivity,
                defaultTelemetryEncoding: this.state.defaultTelemetryEncoding
            };
        console.log('deviceModel => ' + JSON.stringify(deviceModel));

        // step 5
        if(this.state.id === '_add'){
            deviceModel.deviceModelId=''
            DeviceModelService.createDeviceModel(deviceModel).then(res =>{
                this.props.history.push('/deviceModels');
            });
        }else{
            DeviceModelService.updateDeviceModel(deviceModel).then( res => {
                this.props.history.push('/deviceModels');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changemodelNumberHandler= (event) => {
        this.setState({modelNumber: event.target.value});
    }
    changehardwareRevisionHandler= (event) => {
        this.setState({hardwareRevision: event.target.value});
    }
    changeSupportedConnectivityHandler= (event) => {
        this.setState({supportedConnectivity: event.target.value});
    }
    changeDefaultTelemetryEncodingHandler= (event) => {
        this.setState({defaultTelemetryEncoding: event.target.value});
    }

    cancel(){
        this.props.history.push('/deviceModels');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add DeviceModel</h3>
        }else{
            return <h3 className="text-center">Update DeviceModel</h3>
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

                                            <label> modelNumber:&emsp; </label>
                                                <input placeholder="modelNumber" name="modelNumber" className="form-control" value={this.state.modelNumber} onChange={this.changemodelNumberHandler}/>

                                            <label> hardwareRevision:&emsp; </label>
                                                <input placeholder="hardwareRevision" name="hardwareRevision" className="form-control" value={this.state.hardwareRevision} onChange={this.changehardwareRevisionHandler}/>

                                            <label> SupportedConnectivity:&emsp; </label>
                                                <select value={this.state.supportedConnectivity} onChange={this.changeSupportedConnectivityHandler}>
                      <option name="SupportedConnectivity" className="form-control" >
                          WiFi
                      </option>
                      <option name="SupportedConnectivity" className="form-control" >
                          Ethernet
                      </option>
                      <option name="SupportedConnectivity" className="form-control" >
                          LTE
                      </option>
                      <option name="SupportedConnectivity" className="form-control" >
                          FiveG
                      </option>
                      <option name="SupportedConnectivity" className="form-control" >
                          NBIoT
                      </option>
                      <option name="SupportedConnectivity" className="form-control" >
                          LoRaWAN
                      </option>
                      <option name="SupportedConnectivity" className="form-control" >
                          Zigbee
                      </option>
                      <option name="SupportedConnectivity" className="form-control" >
                          BLE
                      </option>
                      <option name="SupportedConnectivity" className="form-control" >
                          Satellite
                      </option>
                    </select>

                                            <label> DefaultTelemetryEncoding:&emsp; </label>
                                                <select value={this.state.defaultTelemetryEncoding} onChange={this.changeDefaultTelemetryEncodingHandler}>
                      <option name="DefaultTelemetryEncoding" className="form-control" >
                          JSON
                      </option>
                      <option name="DefaultTelemetryEncoding" className="form-control" >
                          CBOR
                      </option>
                      <option name="DefaultTelemetryEncoding" className="form-control" >
                          Protobuf
                      </option>
                      <option name="DefaultTelemetryEncoding" className="form-control" >
                          Avro
                      </option>
                      <option name="DefaultTelemetryEncoding" className="form-control" >
                          Binary
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateDeviceModel}>Save</button>
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

export default CreateDeviceModelComponent
