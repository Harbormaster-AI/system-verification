import React, { Component } from 'react'
import DeviceCertificateService from '../services/DeviceCertificateService'

class ViewDeviceCertificateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            deviceCertificate: {}
        }
    }

    componentDidMount(){
        DeviceCertificateService.getDeviceCertificateById(this.state.id).then( res => {
            this.setState({deviceCertificate: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View DeviceCertificate Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> serialNumber:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceCertificate.serialNumber }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> notBefore:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceCertificate.notBefore }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> notAfter:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceCertificate.notAfter }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> fingerprint:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceCertificate.fingerprint }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> CertificateType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceCertificate.certificateType }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewDeviceCertificateComponent
