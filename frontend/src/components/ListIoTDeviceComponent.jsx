import React, { Component } from 'react'
import IoTDeviceService from '../services/IoTDeviceService'

class ListIoTDeviceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                ioTDevices: []
        }
        this.addIoTDevice = this.addIoTDevice.bind(this);
        this.editIoTDevice = this.editIoTDevice.bind(this);
        this.deleteIoTDevice = this.deleteIoTDevice.bind(this);
    }

    deleteIoTDevice(id){
        IoTDeviceService.deleteIoTDevice(id).then( res => {
            this.setState({ioTDevices: this.state.ioTDevices.filter(ioTDevice => ioTDevice.ioTDeviceId !== id)});
        });
    }
    viewIoTDevice(id){
        this.props.history.push(`/view-ioTDevice/${id}`);
    }
    editIoTDevice(id){
        this.props.history.push(`/add-ioTDevice/${id}`);
    }

    componentDidMount(){
        IoTDeviceService.getIoTDevices().then((res) => {
            this.setState({ ioTDevices: res.data});
        });
    }

    addIoTDevice(){
        this.props.history.push('/add-ioTDevice/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">IoTDevice List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addIoTDevice}> Add IoTDevice</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> DeviceId </th>
                                    <th> SerialNumber </th>
                                    <th> LastSeen </th>
                                    <th> FirmwareVersion </th>
                                    <th> Status </th>
                                    <th> PowerSource </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.ioTDevices.map(
                                        ioTDevice => 
                                        <tr key = {ioTDevice.ioTDeviceId}>
                                             <td> { ioTDevice.deviceId } </td>
                                             <td> { ioTDevice.serialNumber } </td>
                                             <td> { ioTDevice.lastSeen } </td>
                                             <td> { ioTDevice.firmwareVersion } </td>
                                             <td> { ioTDevice.status } </td>
                                             <td> { ioTDevice.powerSource } </td>
                                             <td>
                                                 <button onClick={ () => this.editIoTDevice(ioTDevice.ioTDeviceId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteIoTDevice(ioTDevice.ioTDeviceId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewIoTDevice(ioTDevice.ioTDeviceId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListIoTDeviceComponent
