import React, { Component } from 'react'
import SensorInstanceService from '../services/SensorInstanceService'

class ListSensorInstanceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                sensorInstances: []
        }
        this.addSensorInstance = this.addSensorInstance.bind(this);
        this.editSensorInstance = this.editSensorInstance.bind(this);
        this.deleteSensorInstance = this.deleteSensorInstance.bind(this);
    }

    deleteSensorInstance(id){
        SensorInstanceService.deleteSensorInstance(id).then( res => {
            this.setState({sensorInstances: this.state.sensorInstances.filter(sensorInstance => sensorInstance.sensorInstanceId !== id)});
        });
    }
    viewSensorInstance(id){
        this.props.history.push(`/view-sensorInstance/${id}`);
    }
    editSensorInstance(id){
        this.props.history.push(`/add-sensorInstance/${id}`);
    }

    componentDidMount(){
        SensorInstanceService.getSensorInstances().then((res) => {
            this.setState({ sensorInstances: res.data});
        });
    }

    addSensorInstance(){
        this.props.history.push('/add-sensorInstance/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">SensorInstance List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addSensorInstance}> Add SensorInstance</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> Unit </th>
                                    <th> SamplingIntervalMs </th>
                                    <th> SensorType </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sensorInstances.map(
                                        sensorInstance => 
                                        <tr key = {sensorInstance.sensorInstanceId}>
                                             <td> { sensorInstance.name } </td>
                                             <td> { sensorInstance.unit } </td>
                                             <td> { sensorInstance.samplingIntervalMs } </td>
                                             <td> { sensorInstance.sensorType } </td>
                                             <td>
                                                 <button onClick={ () => this.editSensorInstance(sensorInstance.sensorInstanceId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSensorInstance(sensorInstance.sensorInstanceId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewSensorInstance(sensorInstance.sensorInstanceId)} className="btn btn-outline-info btn-sm">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListSensorInstanceComponent
