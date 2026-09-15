import React, { Component } from 'react'
import DeviceVendorService from '../services/DeviceVendorService';

class UpdateDeviceVendorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                legalName: '',
                headquartersCountry: '',
                website: ''
        }
        this.updateDeviceVendor = this.updateDeviceVendor.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changelegalNameHandler = this.changelegalNameHandler.bind(this);
        this.changeheadquartersCountryHandler = this.changeheadquartersCountryHandler.bind(this);
        this.changewebsiteHandler = this.changewebsiteHandler.bind(this);
    }

    componentDidMount(){
        DeviceVendorService.getDeviceVendorById(this.state.id).then( (res) =>{
            let deviceVendor = res.data;
            this.setState({
                name: deviceVendor.name,
                legalName: deviceVendor.legalName,
                headquartersCountry: deviceVendor.headquartersCountry,
                website: deviceVendor.website
            });
        });
    }

    updateDeviceVendor = (e) => {
        e.preventDefault();
        let deviceVendor = {
            deviceVendorId: this.state.id,
            name: this.state.name,
            legalName: this.state.legalName,
            headquartersCountry: this.state.headquartersCountry,
            website: this.state.website
        };
        console.log('deviceVendor => ' + JSON.stringify(deviceVendor));
        console.log('id => ' + JSON.stringify(this.state.id));
        DeviceVendorService.updateDeviceVendor(deviceVendor).then( res => {
            this.props.history.push('/deviceVendors');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changelegalNameHandler= (event) => {
        this.setState({legalName: event.target.value});
    }
    changeheadquartersCountryHandler= (event) => {
        this.setState({headquartersCountry: event.target.value});
    }
    changewebsiteHandler= (event) => {
        this.setState({website: event.target.value});
    }

    cancel(){
        this.props.history.push('/deviceVendors');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update DeviceVendor</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> legalName: </label>
                                                <input placeholder="legalName" name="legalName" className="form-control" value={this.state.legalName} onChange={this.changelegalNameHandler}/>

                                            <label> headquartersCountry: </label>
                                                <input placeholder="headquartersCountry" name="headquartersCountry" className="form-control" value={this.state.headquartersCountry} onChange={this.changeheadquartersCountryHandler}/>

                                            <label> website: </label>
                                                <input placeholder="website" name="website" className="form-control" value={this.state.website} onChange={this.changewebsiteHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateDeviceVendor}>Save</button>
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

export default UpdateDeviceVendorComponent
