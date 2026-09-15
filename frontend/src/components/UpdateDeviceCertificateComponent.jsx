import React, { Component } from 'react'
import DeviceCertificateService from '../services/DeviceCertificateService';

class UpdateDeviceCertificateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                serialNumber: '',
                notBefore: '',
                notAfter: '',
                fingerprint: '',
                certificateType: ''
        }
        this.updateDeviceCertificate = this.updateDeviceCertificate.bind(this);

        this.changeserialNumberHandler = this.changeserialNumberHandler.bind(this);
        this.changenotBeforeHandler = this.changenotBeforeHandler.bind(this);
        this.changenotAfterHandler = this.changenotAfterHandler.bind(this);
        this.changefingerprintHandler = this.changefingerprintHandler.bind(this);
        this.changeCertificateTypeHandler = this.changeCertificateTypeHandler.bind(this);
    }

    componentDidMount(){
        DeviceCertificateService.getDeviceCertificateById(this.state.id).then( (res) =>{
            let deviceCertificate = res.data;
            this.setState({
                serialNumber: deviceCertificate.serialNumber,
                notBefore: deviceCertificate.notBefore,
                notAfter: deviceCertificate.notAfter,
                fingerprint: deviceCertificate.fingerprint,
                certificateType: deviceCertificate.certificateType
            });
        });
    }

    updateDeviceCertificate = (e) => {
        e.preventDefault();
        let deviceCertificate = {
            deviceCertificateId: this.state.id,
            serialNumber: this.state.serialNumber,
            notBefore: this.state.notBefore,
            notAfter: this.state.notAfter,
            fingerprint: this.state.fingerprint,
            certificateType: this.state.certificateType
        };
        console.log('deviceCertificate => ' + JSON.stringify(deviceCertificate));
        console.log('id => ' + JSON.stringify(this.state.id));
        DeviceCertificateService.updateDeviceCertificate(deviceCertificate).then( res => {
            this.props.history.push('/deviceCertificates');
        });
    }

    changeserialNumberHandler= (event) => {
        this.setState({serialNumber: event.target.value});
    }
    changenotBeforeHandler= (event) => {
        this.setState({notBefore: event.target.value});
    }
    changenotAfterHandler= (event) => {
        this.setState({notAfter: event.target.value});
    }
    changefingerprintHandler= (event) => {
        this.setState({fingerprint: event.target.value});
    }
    changeCertificateTypeHandler= (event) => {
        this.setState({certificateType: event.target.value});
    }

    cancel(){
        this.props.history.push('/deviceCertificates');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update DeviceCertificate</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> serialNumber: </label>
                                                <input placeholder="serialNumber" name="serialNumber" className="form-control" value={this.state.serialNumber} onChange={this.changeserialNumberHandler}/>

                                            <label> notBefore: </label>
                                                <input type="time" placeholder="notBefore" name="notBefore" className="form-control" value={this.state.notBefore} onChange={this.changenotBeforeHandler}/>

                                            <label> notAfter: </label>
                                                <input type="time" placeholder="notAfter" name="notAfter" className="form-control" value={this.state.notAfter} onChange={this.changenotAfterHandler}/>

                                            <label> fingerprint: </label>
                                                <input placeholder="fingerprint" name="fingerprint" className="form-control" value={this.state.fingerprint} onChange={this.changefingerprintHandler}/>

                                            <label> CertificateType: </label>
                                                <select value={this.state.certificateType} onChange={this.changeCertificateTypeHandler}>
                      <option name="CertificateType" className="form-control" >
                          X509
                      </option>
                      <option name="CertificateType" className="form-control" >
                          X509_CA
                      </option>
                      <option name="CertificateType" className="form-control" >
                          X509_SelfSigned
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateDeviceCertificate}>Save</button>
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

export default UpdateDeviceCertificateComponent
