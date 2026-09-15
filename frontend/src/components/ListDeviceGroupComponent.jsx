import React, { Component } from 'react'
import DeviceGroupService from '../services/DeviceGroupService'

class ListDeviceGroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                deviceGroups: []
        }
        this.addDeviceGroup = this.addDeviceGroup.bind(this);
        this.editDeviceGroup = this.editDeviceGroup.bind(this);
        this.deleteDeviceGroup = this.deleteDeviceGroup.bind(this);
    }

    deleteDeviceGroup(id){
        DeviceGroupService.deleteDeviceGroup(id).then( res => {
            this.setState({deviceGroups: this.state.deviceGroups.filter(deviceGroup => deviceGroup.deviceGroupId !== id)});
        });
    }
    viewDeviceGroup(id){
        this.props.history.push(`/view-deviceGroup/${id}`);
    }
    editDeviceGroup(id){
        this.props.history.push(`/add-deviceGroup/${id}`);
    }

    componentDidMount(){
        DeviceGroupService.getDeviceGroups().then((res) => {
            this.setState({ deviceGroups: res.data});
        });
    }

    addDeviceGroup(){
        this.props.history.push('/add-deviceGroup/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">DeviceGroup List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addDeviceGroup}> Add DeviceGroup</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> Criteria </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.deviceGroups.map(
                                        deviceGroup => 
                                        <tr key = {deviceGroup.deviceGroupId}>
                                             <td> { deviceGroup.name } </td>
                                             <td> { deviceGroup.criteria } </td>
                                             <td>
                                                 <button onClick={ () => this.editDeviceGroup(deviceGroup.deviceGroupId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDeviceGroup(deviceGroup.deviceGroupId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDeviceGroup(deviceGroup.deviceGroupId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListDeviceGroupComponent
