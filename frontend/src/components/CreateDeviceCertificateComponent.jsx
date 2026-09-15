import React, { Component } from 'react'
import DeviceCertificateService from '../services/DeviceCertificateService';

class CreateDeviceCertificateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                serialNumber: '',
                notBefore: '',
                notAfter: '',
                fingerprint: '',
                certificateType: ''
        }
        this.changeserialNumberHandler = this.changeserialNumberHandler.bind(this);
        this.changenotBeforeHandler = this.changenotBeforeHandler.bind(this);
        this.changenotAfterHandler = this.changenotAfterHandler.bind(this);
        this.changefingerprintHandler = this.changefingerprintHandler.bind(this);
        this.changeCertificateTypeHandler = this.changeCertificateTypeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
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
    }
    saveOrUpdateDeviceCertificate = (e) => {
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

        // step 5
        if(this.state.id === '_add'){
            deviceCertificate.deviceCertificateId=''
            DeviceCertificateService.createDeviceCertificate(deviceCertificate).then(res =>{
                this.props.history.push('/deviceCertificates');
            });
        }else{
            DeviceCertificateService.updateDeviceCertificate(deviceCertificate).then( res => {
                this.props.history.push('/deviceCertificates');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add DeviceCertificate</h3>
        }else{
            return <h3 className="text-center">Update DeviceCertificate</h3>
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
                                            <label> serialNumber:&emsp; </label>
                                                <input placeholder="serialNumber" name="serialNumber" className="form-control" value={this.state.serialNumber} onChange={this.changeserialNumberHandler}/>

                                            <label> notBefore:&emsp; </label>
                                                <input type="time" placeholder="notBefore" name="notBefore" className="form-control" value={this.state.notBefore} onChange={this.changenotBeforeHandler}/>

                                            <label> notAfter:&emsp; </label>
                                                <input type="time" placeholder="notAfter" name="notAfter" className="form-control" value={this.state.notAfter} onChange={this.changenotAfterHandler}/>

                                            <label> fingerprint:&emsp; </label>
                                                <input placeholder="fingerprint" name="fingerprint" className="form-control" value={this.state.fingerprint} onChange={this.changefingerprintHandler}/>

                                            <label> CertificateType:&emsp; </label>
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

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateDeviceCertificate}>Save</button>
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

export default CreateDeviceCertificateComponent
