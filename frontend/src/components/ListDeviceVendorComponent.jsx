import React, { Component } from 'react'
import DeviceVendorService from '../services/DeviceVendorService'

class ListDeviceVendorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                deviceVendors: []
        }
        this.addDeviceVendor = this.addDeviceVendor.bind(this);
        this.editDeviceVendor = this.editDeviceVendor.bind(this);
        this.deleteDeviceVendor = this.deleteDeviceVendor.bind(this);
    }

    deleteDeviceVendor(id){
        DeviceVendorService.deleteDeviceVendor(id).then( res => {
            this.setState({deviceVendors: this.state.deviceVendors.filter(deviceVendor => deviceVendor.deviceVendorId !== id)});
        });
    }
    viewDeviceVendor(id){
        this.props.history.push(`/view-deviceVendor/${id}`);
    }
    editDeviceVendor(id){
        this.props.history.push(`/add-deviceVendor/${id}`);
    }

    componentDidMount(){
        DeviceVendorService.getDeviceVendors().then((res) => {
            this.setState({ deviceVendors: res.data});
        });
    }

    addDeviceVendor(){
        this.props.history.push('/add-deviceVendor/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">DeviceVendor List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addDeviceVendor}> Add DeviceVendor</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> LegalName </th>
                                    <th> HeadquartersCountry </th>
                                    <th> Website </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.deviceVendors.map(
                                        deviceVendor => 
                                        <tr key = {deviceVendor.deviceVendorId}>
                                             <td> { deviceVendor.name } </td>
                                             <td> { deviceVendor.legalName } </td>
                                             <td> { deviceVendor.headquartersCountry } </td>
                                             <td> { deviceVendor.website } </td>
                                             <td>
                                                 <button onClick={ () => this.editDeviceVendor(deviceVendor.deviceVendorId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDeviceVendor(deviceVendor.deviceVendorId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDeviceVendor(deviceVendor.deviceVendorId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListDeviceVendorComponent
