import React, { Component } from 'react'
import SiteService from '../services/SiteService';

class UpdateSiteComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                address: '',
                timezone: '',
                latitude: '',
                longitude: ''
        }
        this.updateSite = this.updateSite.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeaddressHandler = this.changeaddressHandler.bind(this);
        this.changetimezoneHandler = this.changetimezoneHandler.bind(this);
        this.changelatitudeHandler = this.changelatitudeHandler.bind(this);
        this.changelongitudeHandler = this.changelongitudeHandler.bind(this);
    }

    componentDidMount(){
        SiteService.getSiteById(this.state.id).then( (res) =>{
            let site = res.data;
            this.setState({
                name: site.name,
                address: site.address,
                timezone: site.timezone,
                latitude: site.latitude,
                longitude: site.longitude
            });
        });
    }

    updateSite = (e) => {
        e.preventDefault();
        let site = {
            siteId: this.state.id,
            name: this.state.name,
            address: this.state.address,
            timezone: this.state.timezone,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        };
        console.log('site => ' + JSON.stringify(site));
        console.log('id => ' + JSON.stringify(this.state.id));
        SiteService.updateSite(site).then( res => {
            this.props.history.push('/sites');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeaddressHandler= (event) => {
        this.setState({address: event.target.value});
    }
    changetimezoneHandler= (event) => {
        this.setState({timezone: event.target.value});
    }
    changelatitudeHandler= (event) => {
        this.setState({latitude: event.target.value});
    }
    changelongitudeHandler= (event) => {
        this.setState({longitude: event.target.value});
    }

    cancel(){
        this.props.history.push('/sites');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Site</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> address: </label>
                                                <input placeholder="address" name="address" className="form-control" value={this.state.address} onChange={this.changeaddressHandler}/>

                                            <label> timezone: </label>
                                                <input placeholder="timezone" name="timezone" className="form-control" value={this.state.timezone} onChange={this.changetimezoneHandler}/>

                                            <label> latitude: </label>
                                                <input placeholder="latitude" name="latitude" className="form-control" value={this.state.latitude} onChange={this.changelatitudeHandler}/>

                                            <label> longitude: </label>
                                                <input placeholder="longitude" name="longitude" className="form-control" value={this.state.longitude} onChange={this.changelongitudeHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateSite}>Save</button>
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

export default UpdateSiteComponent
