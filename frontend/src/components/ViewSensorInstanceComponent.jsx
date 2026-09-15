import React, { Component } from 'react'
import SensorInstanceService from '../services/SensorInstanceService'

class ViewSensorInstanceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            sensorInstance: {}
        }
    }

    componentDidMount(){
        SensorInstanceService.getSensorInstanceById(this.state.id).then( res => {
            this.setState({sensorInstance: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View SensorInstance Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.sensorInstance.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> unit:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.sensorInstance.unit }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> samplingIntervalMs:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.sensorInstance.samplingIntervalMs }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> SensorType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.sensorInstance.sensorType }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSensorInstanceComponent
