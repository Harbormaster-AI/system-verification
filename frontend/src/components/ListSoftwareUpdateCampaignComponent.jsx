import React, { Component } from 'react'
import SoftwareUpdateCampaignService from '../services/SoftwareUpdateCampaignService'

class ListSoftwareUpdateCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                softwareUpdateCampaigns: []
        }
        this.addSoftwareUpdateCampaign = this.addSoftwareUpdateCampaign.bind(this);
        this.editSoftwareUpdateCampaign = this.editSoftwareUpdateCampaign.bind(this);
        this.deleteSoftwareUpdateCampaign = this.deleteSoftwareUpdateCampaign.bind(this);
    }

    deleteSoftwareUpdateCampaign(id){
        SoftwareUpdateCampaignService.deleteSoftwareUpdateCampaign(id).then( res => {
            this.setState({softwareUpdateCampaigns: this.state.softwareUpdateCampaigns.filter(softwareUpdateCampaign => softwareUpdateCampaign.softwareUpdateCampaignId !== id)});
        });
    }
    viewSoftwareUpdateCampaign(id){
        this.props.history.push(`/view-softwareUpdateCampaign/${id}`);
    }
    editSoftwareUpdateCampaign(id){
        this.props.history.push(`/add-softwareUpdateCampaign/${id}`);
    }

    componentDidMount(){
        SoftwareUpdateCampaignService.getSoftwareUpdateCampaigns().then((res) => {
            this.setState({ softwareUpdateCampaigns: res.data});
        });
    }

    addSoftwareUpdateCampaign(){
        this.props.history.push('/add-softwareUpdateCampaign/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">SoftwareUpdateCampaign List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addSoftwareUpdateCampaign}> Add SoftwareUpdateCampaign</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> CampaignCode </th>
                                    <th> ScheduledStart </th>
                                    <th> ScheduledEnd </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.softwareUpdateCampaigns.map(
                                        softwareUpdateCampaign => 
                                        <tr key = {softwareUpdateCampaign.softwareUpdateCampaignId}>
                                             <td> { softwareUpdateCampaign.campaignCode } </td>
                                             <td> { softwareUpdateCampaign.scheduledStart } </td>
                                             <td> { softwareUpdateCampaign.scheduledEnd } </td>
                                             <td> { softwareUpdateCampaign.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editSoftwareUpdateCampaign(softwareUpdateCampaign.softwareUpdateCampaignId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSoftwareUpdateCampaign(softwareUpdateCampaign.softwareUpdateCampaignId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewSoftwareUpdateCampaign(softwareUpdateCampaign.softwareUpdateCampaignId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListSoftwareUpdateCampaignComponent
