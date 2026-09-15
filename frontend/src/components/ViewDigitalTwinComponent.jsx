import React, { Component } from 'react'
import DigitalTwinService from '../services/DigitalTwinService'

class ViewDigitalTwinComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            digitalTwin: {}
        }
    }

    componentDidMount(){
        DigitalTwinService.getDigitalTwinById(this.state.id).then( res => {
            this.setState({digitalTwin: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View DigitalTwin Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> twinId:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.digitalTwin.twinId }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> desiredStateVersion:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.digitalTwin.desiredStateVersion }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> reportedStateVersion:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.digitalTwin.reportedStateVersion }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> lastSyncAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.digitalTwin.lastSyncAt }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewDigitalTwinComponent
