import React, { Component } from 'react'
import FirmwareReleaseService from '../services/FirmwareReleaseService'

class ListFirmwareReleaseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                firmwareReleases: []
        }
        this.addFirmwareRelease = this.addFirmwareRelease.bind(this);
        this.editFirmwareRelease = this.editFirmwareRelease.bind(this);
        this.deleteFirmwareRelease = this.deleteFirmwareRelease.bind(this);
    }

    deleteFirmwareRelease(id){
        FirmwareReleaseService.deleteFirmwareRelease(id).then( res => {
            this.setState({firmwareReleases: this.state.firmwareReleases.filter(firmwareRelease => firmwareRelease.firmwareReleaseId !== id)});
        });
    }
    viewFirmwareRelease(id){
        this.props.history.push(`/view-firmwareRelease/${id}`);
    }
    editFirmwareRelease(id){
        this.props.history.push(`/add-firmwareRelease/${id}`);
    }

    componentDidMount(){
        FirmwareReleaseService.getFirmwareReleases().then((res) => {
            this.setState({ firmwareReleases: res.data});
        });
    }

    addFirmwareRelease(){
        this.props.history.push('/add-firmwareRelease/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">FirmwareRelease List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addFirmwareRelease}> Add FirmwareRelease</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Version </th>
                                    <th> ReleaseDate </th>
                                    <th> ReleaseNotes </th>
                                    <th> Checksum </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.firmwareReleases.map(
                                        firmwareRelease => 
                                        <tr key = {firmwareRelease.firmwareReleaseId}>
                                             <td> { firmwareRelease.version } </td>
                                             <td> { firmwareRelease.releaseDate } </td>
                                             <td> { firmwareRelease.releaseNotes } </td>
                                             <td> { firmwareRelease.checksum } </td>
                                             <td>
                                                 <button onClick={ () => this.editFirmwareRelease(firmwareRelease.firmwareReleaseId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteFirmwareRelease(firmwareRelease.firmwareReleaseId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewFirmwareRelease(firmwareRelease.firmwareReleaseId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListFirmwareReleaseComponent
