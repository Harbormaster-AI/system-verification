import React, { Component } from 'react'
import FirmwareReleaseService from '../services/FirmwareReleaseService';

class UpdateFirmwareReleaseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                version: '',
                releaseDate: '',
                releaseNotes: '',
                checksum: ''
        }
        this.updateFirmwareRelease = this.updateFirmwareRelease.bind(this);

        this.changeversionHandler = this.changeversionHandler.bind(this);
        this.changereleaseDateHandler = this.changereleaseDateHandler.bind(this);
        this.changereleaseNotesHandler = this.changereleaseNotesHandler.bind(this);
        this.changechecksumHandler = this.changechecksumHandler.bind(this);
    }

    componentDidMount(){
        FirmwareReleaseService.getFirmwareReleaseById(this.state.id).then( (res) =>{
            let firmwareRelease = res.data;
            this.setState({
                version: firmwareRelease.version,
                releaseDate: firmwareRelease.releaseDate,
                releaseNotes: firmwareRelease.releaseNotes,
                checksum: firmwareRelease.checksum
            });
        });
    }

    updateFirmwareRelease = (e) => {
        e.preventDefault();
        let firmwareRelease = {
            firmwareReleaseId: this.state.id,
            version: this.state.version,
            releaseDate: this.state.releaseDate,
            releaseNotes: this.state.releaseNotes,
            checksum: this.state.checksum
        };
        console.log('firmwareRelease => ' + JSON.stringify(firmwareRelease));
        console.log('id => ' + JSON.stringify(this.state.id));
        FirmwareReleaseService.updateFirmwareRelease(firmwareRelease).then( res => {
            this.props.history.push('/firmwareReleases');
        });
    }

    changeversionHandler= (event) => {
        this.setState({version: event.target.value});
    }
    changereleaseDateHandler= (event) => {
        this.setState({releaseDate: event.target.value});
    }
    changereleaseNotesHandler= (event) => {
        this.setState({releaseNotes: event.target.value});
    }
    changechecksumHandler= (event) => {
        this.setState({checksum: event.target.value});
    }

    cancel(){
        this.props.history.push('/firmwareReleases');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update FirmwareRelease</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> version: </label>
                                                <input placeholder="version" name="version" className="form-control" value={this.state.version} onChange={this.changeversionHandler}/>

                                            <label> releaseDate: </label>
                                                <input type="date" placeholder="releaseDate" name="releaseDate" className="form-control" value={this.state.releaseDate} onChange={this.changereleaseDateHandler}/>

                                            <label> releaseNotes: </label>
                                                <input placeholder="releaseNotes" name="releaseNotes" className="form-control" value={this.state.releaseNotes} onChange={this.changereleaseNotesHandler}/>

                                            <label> checksum: </label>
                                                <input placeholder="checksum" name="checksum" className="form-control" value={this.state.checksum} onChange={this.changechecksumHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateFirmwareRelease}>Save</button>
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

export default UpdateFirmwareReleaseComponent
