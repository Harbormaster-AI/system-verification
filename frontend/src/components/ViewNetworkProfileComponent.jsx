import React, { Component } from 'react'
import NetworkProfileService from '../services/NetworkProfileService'

class ViewNetworkProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            networkProfile: {}
        }
    }

    componentDidMount(){
        NetworkProfileService.getNetworkProfileById(this.state.id).then( res => {
            this.setState({networkProfile: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View NetworkProfile Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> profileName:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.networkProfile.profileName }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> ssid:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.networkProfile.ssid }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> apn:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.networkProfile.apn }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> ConnectivityType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.networkProfile.connectivityType }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewNetworkProfileComponent
