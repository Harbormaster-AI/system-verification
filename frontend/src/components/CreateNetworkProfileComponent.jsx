import React, { Component } from 'react'
import NetworkProfileService from '../services/NetworkProfileService';

class CreateNetworkProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                profileName: '',
                ssid: '',
                apn: '',
                connectivityType: ''
        }
        this.changeprofileNameHandler = this.changeprofileNameHandler.bind(this);
        this.changessidHandler = this.changessidHandler.bind(this);
        this.changeapnHandler = this.changeapnHandler.bind(this);
        this.changeConnectivityTypeHandler = this.changeConnectivityTypeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
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
    }
    saveOrUpdateNetworkProfile = (e) => {
        e.preventDefault();
        let networkProfile = {
                networkProfileId: this.state.id,
                profileName: this.state.profileName,
                ssid: this.state.ssid,
                apn: this.state.apn,
                connectivityType: this.state.connectivityType
            };
        console.log('networkProfile => ' + JSON.stringify(networkProfile));

        // step 5
        if(this.state.id === '_add'){
            networkProfile.networkProfileId=''
            NetworkProfileService.createNetworkProfile(networkProfile).then(res =>{
                this.props.history.push('/networkProfiles');
            });
        }else{
            NetworkProfileService.updateNetworkProfile(networkProfile).then( res => {
                this.props.history.push('/networkProfiles');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add NetworkProfile</h3>
        }else{
            return <h3 className="text-center">Update NetworkProfile</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> profileName:&emsp; </label>
                                                <input placeholder="profileName" name="profileName" className="form-control" value={this.state.profileName} onChange={this.changeprofileNameHandler}/>

                                            <label> ssid:&emsp; </label>
                                                <input placeholder="ssid" name="ssid" className="form-control" value={this.state.ssid} onChange={this.changessidHandler}/>

                                            <label> apn:&emsp; </label>
                                                <input placeholder="apn" name="apn" className="form-control" value={this.state.apn} onChange={this.changeapnHandler}/>

                                            <label> ConnectivityType:&emsp; </label>
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

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateNetworkProfile}>Save</button>
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

export default CreateNetworkProfileComponent
