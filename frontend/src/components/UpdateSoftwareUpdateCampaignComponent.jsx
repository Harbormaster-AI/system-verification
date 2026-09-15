import React, { Component } from 'react'
import SoftwareUpdateCampaignService from '../services/SoftwareUpdateCampaignService';

class UpdateSoftwareUpdateCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                campaignCode: '',
                scheduledStart: '',
                scheduledEnd: '',
                status: ''
        }
        this.updateSoftwareUpdateCampaign = this.updateSoftwareUpdateCampaign.bind(this);

        this.changecampaignCodeHandler = this.changecampaignCodeHandler.bind(this);
        this.changescheduledStartHandler = this.changescheduledStartHandler.bind(this);
        this.changescheduledEndHandler = this.changescheduledEndHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
        SoftwareUpdateCampaignService.getSoftwareUpdateCampaignById(this.state.id).then( (res) =>{
            let softwareUpdateCampaign = res.data;
            this.setState({
                campaignCode: softwareUpdateCampaign.campaignCode,
                scheduledStart: softwareUpdateCampaign.scheduledStart,
                scheduledEnd: softwareUpdateCampaign.scheduledEnd,
                status: softwareUpdateCampaign.status
            });
        });
    }

    updateSoftwareUpdateCampaign = (e) => {
        e.preventDefault();
        let softwareUpdateCampaign = {
            softwareUpdateCampaignId: this.state.id,
            campaignCode: this.state.campaignCode,
            scheduledStart: this.state.scheduledStart,
            scheduledEnd: this.state.scheduledEnd,
            status: this.state.status
        };
        console.log('softwareUpdateCampaign => ' + JSON.stringify(softwareUpdateCampaign));
        console.log('id => ' + JSON.stringify(this.state.id));
        SoftwareUpdateCampaignService.updateSoftwareUpdateCampaign(softwareUpdateCampaign).then( res => {
            this.props.history.push('/softwareUpdateCampaigns');
        });
    }

    changecampaignCodeHandler= (event) => {
        this.setState({campaignCode: event.target.value});
    }
    changescheduledStartHandler= (event) => {
        this.setState({scheduledStart: event.target.value});
    }
    changescheduledEndHandler= (event) => {
        this.setState({scheduledEnd: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/softwareUpdateCampaigns');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update SoftwareUpdateCampaign</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> campaignCode: </label>
                                                <input placeholder="campaignCode" name="campaignCode" className="form-control" value={this.state.campaignCode} onChange={this.changecampaignCodeHandler}/>

                                            <label> scheduledStart: </label>
                                                <input type="time" placeholder="scheduledStart" name="scheduledStart" className="form-control" value={this.state.scheduledStart} onChange={this.changescheduledStartHandler}/>

                                            <label> scheduledEnd: </label>
                                                <input type="time" placeholder="scheduledEnd" name="scheduledEnd" className="form-control" value={this.state.scheduledEnd} onChange={this.changescheduledEndHandler}/>

                                            <label> Status: </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Planned
                      </option>
                      <option name="Status" className="form-control" >
                          InProgress
                      </option>
                      <option name="Status" className="form-control" >
                          Paused
                      </option>
                      <option name="Status" className="form-control" >
                          Completed
                      </option>
                      <option name="Status" className="form-control" >
                          Cancelled
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateSoftwareUpdateCampaign}>Save</button>
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

export default UpdateSoftwareUpdateCampaignComponent
