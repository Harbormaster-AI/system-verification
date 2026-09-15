import React, { Component } from 'react'
import DeviceModelService from '../services/DeviceModelService'

class ListDeviceModelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                deviceModels: []
        }
        this.addDeviceModel = this.addDeviceModel.bind(this);
        this.editDeviceModel = this.editDeviceModel.bind(this);
        this.deleteDeviceModel = this.deleteDeviceModel.bind(this);
    }

    deleteDeviceModel(id){
        DeviceModelService.deleteDeviceModel(id).then( res => {
            this.setState({deviceModels: this.state.deviceModels.filter(deviceModel => deviceModel.deviceModelId !== id)});
        });
    }
    viewDeviceModel(id){
        this.props.history.push(`/view-deviceModel/${id}`);
    }
    editDeviceModel(id){
        this.props.history.push(`/add-deviceModel/${id}`);
    }

    componentDidMount(){
        DeviceModelService.getDeviceModels().then((res) => {
            this.setState({ deviceModels: res.data});
        });
    }

    addDeviceModel(){
        this.props.history.push('/add-deviceModel/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">DeviceModel List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addDeviceModel}> Add DeviceModel</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> ModelNumber </th>
                                    <th> HardwareRevision </th>
                                    <th> SupportedConnectivity </th>
                                    <th> DefaultTelemetryEncoding </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.deviceModels.map(
                                        deviceModel => 
                                        <tr key = {deviceModel.deviceModelId}>
                                             <td> { deviceModel.name } </td>
                                             <td> { deviceModel.modelNumber } </td>
                                             <td> { deviceModel.hardwareRevision } </td>
                                             <td> { deviceModel.supportedConnectivity } </td>
                                             <td> { deviceModel.defaultTelemetryEncoding } </td>
                                             <td>
                                                 <button onClick={ () => this.editDeviceModel(deviceModel.deviceModelId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDeviceModel(deviceModel.deviceModelId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDeviceModel(deviceModel.deviceModelId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListDeviceModelComponent
