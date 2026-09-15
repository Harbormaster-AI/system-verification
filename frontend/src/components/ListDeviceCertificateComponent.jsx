import React, { Component } from 'react'
import DeviceCertificateService from '../services/DeviceCertificateService'

class ListDeviceCertificateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                deviceCertificates: []
        }
        this.addDeviceCertificate = this.addDeviceCertificate.bind(this);
        this.editDeviceCertificate = this.editDeviceCertificate.bind(this);
        this.deleteDeviceCertificate = this.deleteDeviceCertificate.bind(this);
    }

    deleteDeviceCertificate(id){
        DeviceCertificateService.deleteDeviceCertificate(id).then( res => {
            this.setState({deviceCertificates: this.state.deviceCertificates.filter(deviceCertificate => deviceCertificate.deviceCertificateId !== id)});
        });
    }
    viewDeviceCertificate(id){
        this.props.history.push(`/view-deviceCertificate/${id}`);
    }
    editDeviceCertificate(id){
        this.props.history.push(`/add-deviceCertificate/${id}`);
    }

    componentDidMount(){
        DeviceCertificateService.getDeviceCertificates().then((res) => {
            this.setState({ deviceCertificates: res.data});
        });
    }

    addDeviceCertificate(){
        this.props.history.push('/add-deviceCertificate/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">DeviceCertificate List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addDeviceCertificate}> Add DeviceCertificate</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> SerialNumber </th>
                                    <th> NotBefore </th>
                                    <th> NotAfter </th>
                                    <th> Fingerprint </th>
                                    <th> CertificateType </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.deviceCertificates.map(
                                        deviceCertificate => 
                                        <tr key = {deviceCertificate.deviceCertificateId}>
                                             <td> { deviceCertificate.serialNumber } </td>
                                             <td> { deviceCertificate.notBefore } </td>
                                             <td> { deviceCertificate.notAfter } </td>
                                             <td> { deviceCertificate.fingerprint } </td>
                                             <td> { deviceCertificate.certificateType } </td>
                                             <td>
                                                 <button onClick={ () => this.editDeviceCertificate(deviceCertificate.deviceCertificateId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDeviceCertificate(deviceCertificate.deviceCertificateId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDeviceCertificate(deviceCertificate.deviceCertificateId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListDeviceCertificateComponent
