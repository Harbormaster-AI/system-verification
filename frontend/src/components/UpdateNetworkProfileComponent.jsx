import React, { Component } from 'react'
import NetworkProfileService from '../services/NetworkProfileService';

class UpdateNetworkProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                profileName: '',
                ssid: '',
                apn: '',
                connectivityType: ''
        }
        this.updateNetworkProfile = this.updateNetworkProfile.bind(this);

        this.changeprofileNameHandler = this.changeprofileNameHandler.bind(this);
        this.changessidHandler = this.changessidHandler.bind(this);
        this.changeapnHandler = this.changeapnHandler.bind(this);
        this.changeConnectivityTypeHandler = this.changeConnectivityTypeHandler.bind(this);
    }

    componentDidMount(){
        NetworkProfileService.getNetworkProfileById(this.state.id).then( (res) =>{
            let networkProfile = res.data;
            this.setState({
                profileName: networkProfile.profileName,
                ssid: networkProfile.ssid,
                apn: networkProfile.apn,
                connectivityType: networkProfile.connectivityType
            });
        });
    }

    updateNetworkProfile = (e) => {
        e.preventDefault();
        let networkProfile = {
            networkProfileId: this.state.id,
            profileName: this.state.profileName,
            ssid: this.state.ssid,
            apn: this.state.apn,
            connectivityType: this.state.connectivityType
        };
        console.log('networkProfile => ' + JSON.stringify(networkProfile));
        console.log('id => ' + JSON.stringify(this.state.id));
        NetworkProfileService.updateNetworkProfile(networkProfile).then( res => {
            this.props.history.push('/networkProfiles');
        });
    }

    changeprofileNameHandler= (event) => {
        this.setState({profileName: event.target.value});
    }
    changessidHandler= (event) => {
        this.setState({ssid: event.target.value});
    }
    changeapnHandler= (event) => {
        this.setState({apn: event.target.value});
    }
    changeConnectivityTypeHandler= (event) => {
        this.setState({connectivityType: event.target.value});
    }

    cancel(){
        this.props.history.push('/networkProfiles');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update NetworkProfile</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> profileName: </label>
                                                <input placeholder="profileName" name="profileName" className="form-control" value={this.state.profileName} onChange={this.changeprofileNameHandler}/>

                                            <label> ssid: </label>
                                                <input placeholder="ssid" name="ssid" className="form-control" value={this.state.ssid} onChange={this.changessidHandler}/>

                                            <label> apn: </label>
                                                <input placeholder="apn" name="apn" className="form-control" value={this.state.apn} onChange={this.changeapnHandler}/>

                                            <label> ConnectivityType: </label>
                                                <select value={this.state.connectivityType} onChange={this.changeConnectivityTypeHandler}>
                      <option name="ConnectivityType" className="form-control" >
                          WiFi
                      </option>
                      <option name="ConnectivityType" className="form-control" >
                          Ethernet
                      </option>
                      <option name="ConnectivityType" className="form-control" >
                          LTE
                      </option>
                      <option name="ConnectivityType" className="form-control" >
                          FiveG
                      </option>
                      <option name="ConnectivityType" className="form-control" >
                          NBIoT
                      </option>
                      <option name="ConnectivityType" className="form-control" >
                          LoRaWAN
                      </option>
                      <option name="ConnectivityType" className="form-control" >
                          Zigbee
                      </option>
                      <option name="ConnectivityType" className="form-control" >
                          BLE
                      </option>
                      <option name="ConnectivityType" className="form-control" >
                          Satellite
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateNetworkProfile}>Save</button>
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

export default UpdateNetworkProfileComponent
