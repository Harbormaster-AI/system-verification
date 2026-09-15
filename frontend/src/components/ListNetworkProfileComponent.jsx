import React, { Component } from 'react'
import NetworkProfileService from '../services/NetworkProfileService'

class ListNetworkProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                networkProfiles: []
        }
        this.addNetworkProfile = this.addNetworkProfile.bind(this);
        this.editNetworkProfile = this.editNetworkProfile.bind(this);
        this.deleteNetworkProfile = this.deleteNetworkProfile.bind(this);
    }

    deleteNetworkProfile(id){
        NetworkProfileService.deleteNetworkProfile(id).then( res => {
            this.setState({networkProfiles: this.state.networkProfiles.filter(networkProfile => networkProfile.networkProfileId !== id)});
        });
    }
    viewNetworkProfile(id){
        this.props.history.push(`/view-networkProfile/${id}`);
    }
    editNetworkProfile(id){
        this.props.history.push(`/add-networkProfile/${id}`);
    }

    componentDidMount(){
        NetworkProfileService.getNetworkProfiles().then((res) => {
            this.setState({ networkProfiles: res.data});
        });
    }

    addNetworkProfile(){
        this.props.history.push('/add-networkProfile/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">NetworkProfile List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addNetworkProfile}> Add NetworkProfile</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ProfileName </th>
                                    <th> Ssid </th>
                                    <th> Apn </th>
                                    <th> ConnectivityType </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.networkProfiles.map(
                                        networkProfile => 
                                        <tr key = {networkProfile.networkProfileId}>
                                             <td> { networkProfile.profileName } </td>
                                             <td> { networkProfile.ssid } </td>
                                             <td> { networkProfile.apn } </td>
                                             <td> { networkProfile.connectivityType } </td>
                                             <td>
                                                 <button onClick={ () => this.editNetworkProfile(networkProfile.networkProfileId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteNetworkProfile(networkProfile.networkProfileId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewNetworkProfile(networkProfile.networkProfileId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListNetworkProfileComponent
