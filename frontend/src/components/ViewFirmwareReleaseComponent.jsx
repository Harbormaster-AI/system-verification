import React, { Component } from 'react'
import FirmwareReleaseService from '../services/FirmwareReleaseService'

class ViewFirmwareReleaseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firmwareRelease: {}
        }
    }

    componentDidMount(){
        FirmwareReleaseService.getFirmwareReleaseById(this.state.id).then( res => {
            this.setState({firmwareRelease: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View FirmwareRelease Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> version:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.firmwareRelease.version }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> releaseDate:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.firmwareRelease.releaseDate }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> releaseNotes:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.firmwareRelease.releaseNotes }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> checksum:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.firmwareRelease.checksum }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewFirmwareReleaseComponent
