import React, { Component } from 'react'
import SoftwareUpdateCampaignService from '../services/SoftwareUpdateCampaignService'

class ViewSoftwareUpdateCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            softwareUpdateCampaign: {}
        }
    }

    componentDidMount(){
        SoftwareUpdateCampaignService.getSoftwareUpdateCampaignById(this.state.id).then( res => {
            this.setState({softwareUpdateCampaign: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View SoftwareUpdateCampaign Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> campaignCode:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.softwareUpdateCampaign.campaignCode }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> scheduledStart:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.softwareUpdateCampaign.scheduledStart }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> scheduledEnd:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.softwareUpdateCampaign.scheduledEnd }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.softwareUpdateCampaign.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSoftwareUpdateCampaignComponent
