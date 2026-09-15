import React, { Component } from 'react'
import MaintenanceTicketService from '../services/MaintenanceTicketService'

class ViewMaintenanceTicketComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            maintenanceTicket: {}
        }
    }

    componentDidMount(){
        MaintenanceTicketService.getMaintenanceTicketById(this.state.id).then( res => {
            this.setState({maintenanceTicket: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View MaintenanceTicket Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> ticketNumber:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.maintenanceTicket.ticketNumber }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> openedAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.maintenanceTicket.openedAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> closedAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.maintenanceTicket.closedAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Priority:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.maintenanceTicket.priority }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.maintenanceTicket.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewMaintenanceTicketComponent
