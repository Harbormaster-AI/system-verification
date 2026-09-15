import React, { Component } from 'react'
import SensorInstanceService from '../services/SensorInstanceService';

class UpdateSensorInstanceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                unit: '',
                samplingIntervalMs: '',
                sensorType: ''
        }
        this.updateSensorInstance = this.updateSensorInstance.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeunitHandler = this.changeunitHandler.bind(this);
        this.changesamplingIntervalMsHandler = this.changesamplingIntervalMsHandler.bind(this);
        this.changeSensorTypeHandler = this.changeSensorTypeHandler.bind(this);
    }

    componentDidMount(){
        SensorInstanceService.getSensorInstanceById(this.state.id).then( (res) =>{
            let sensorInstance = res.data;
            this.setState({
                name: sensorInstance.name,
                unit: sensorInstance.unit,
                samplingIntervalMs: sensorInstance.samplingIntervalMs,
                sensorType: sensorInstance.sensorType
            });
        });
    }

    updateSensorInstance = (e) => {
        e.preventDefault();
        let sensorInstance = {
            sensorInstanceId: this.state.id,
            name: this.state.name,
            unit: this.state.unit,
            samplingIntervalMs: this.state.samplingIntervalMs,
            sensorType: this.state.sensorType
        };
        console.log('sensorInstance => ' + JSON.stringify(sensorInstance));
        console.log('id => ' + JSON.stringify(this.state.id));
        SensorInstanceService.updateSensorInstance(sensorInstance).then( res => {
            this.props.history.push('/sensorInstances');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeunitHandler= (event) => {
        this.setState({unit: event.target.value});
    }
    changesamplingIntervalMsHandler= (event) => {
        this.setState({samplingIntervalMs: event.target.value});
    }
    changeSensorTypeHandler= (event) => {
        this.setState({sensorType: event.target.value});
    }

    cancel(){
        this.props.history.push('/sensorInstances');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update SensorInstance</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> unit: </label>
                                                <input placeholder="unit" name="unit" className="form-control" value={this.state.unit} onChange={this.changeunitHandler}/>

                                            <label> samplingIntervalMs: </label>
                                                <input type="number" placeholder="samplingIntervalMs" name="samplingIntervalMs" className="form-control" value={this.state.samplingIntervalMs} onChange={this.changesamplingIntervalMsHandler}/>

                                            <label> SensorType: </label>
                                                <select value={this.state.sensorType} onChange={this.changeSensorTypeHandler}>
                      <option name="SensorType" className="form-control" >
                          Temperature
                      </option>
                      <option name="SensorType" className="form-control" >
                          Humidity
                      </option>
                      <option name="SensorType" className="form-control" >
                          Pressure
                      </option>
                      <option name="SensorType" className="form-control" >
                          Accelerometer
                      </option>
                      <option name="SensorType" className="form-control" >
                          Gyroscope
                      </option>
                      <option name="SensorType" className="form-control" >
                          GPS
                      </option>
                      <option name="SensorType" className="form-control" >
                          Light
                      </option>
                      <option name="SensorType" className="form-control" >
                          CO2
                      </option>
                      <option name="SensorType" className="form-control" >
                          VOC
                      </option>
                      <option name="SensorType" className="form-control" >
                          Current
                      </option>
                      <option name="SensorType" className="form-control" >
                          Voltage
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateSensorInstance}>Save</button>
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

export default UpdateSensorInstanceComponent
