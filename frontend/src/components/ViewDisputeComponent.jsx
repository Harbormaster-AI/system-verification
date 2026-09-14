import React, { Component } from 'react'
import DisputeService from '../services/DisputeService'

class ViewDisputeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            dispute: {}
        }
    }

    componentDidMount(){
        DisputeService.getDisputeById(this.state.id).then( res => {
            this.setState({dispute: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Dispute Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> disputeReference:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.dispute.disputeReference }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> raisedOn:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.dispute.raisedOn }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> reason:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.dispute.reason }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.dispute.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewDisputeComponent
