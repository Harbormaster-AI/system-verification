import React, { Component } from 'react'
import MaintenanceTicketService from '../services/MaintenanceTicketService';

class UpdateMaintenanceTicketComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                ticketNumber: '',
                openedAt: '',
                closedAt: '',
                priority: '',
                status: ''
        }
        this.updateMaintenanceTicket = this.updateMaintenanceTicket.bind(this);

        this.changeticketNumberHandler = this.changeticketNumberHandler.bind(this);
        this.changeopenedAtHandler = this.changeopenedAtHandler.bind(this);
        this.changeclosedAtHandler = this.changeclosedAtHandler.bind(this);
        this.changePriorityHandler = this.changePriorityHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
        MaintenanceTicketService.getMaintenanceTicketById(this.state.id).then( (res) =>{
            let maintenanceTicket = res.data;
            this.setState({
                ticketNumber: maintenanceTicket.ticketNumber,
                openedAt: maintenanceTicket.openedAt,
                closedAt: maintenanceTicket.closedAt,
                priority: maintenanceTicket.priority,
                status: maintenanceTicket.status
            });
        });
    }

    updateMaintenanceTicket = (e) => {
        e.preventDefault();
        let maintenanceTicket = {
            maintenanceTicketId: this.state.id,
            ticketNumber: this.state.ticketNumber,
            openedAt: this.state.openedAt,
            closedAt: this.state.closedAt,
            priority: this.state.priority,
            status: this.state.status
        };
        console.log('maintenanceTicket => ' + JSON.stringify(maintenanceTicket));
        console.log('id => ' + JSON.stringify(this.state.id));
        MaintenanceTicketService.updateMaintenanceTicket(maintenanceTicket).then( res => {
            this.props.history.push('/maintenanceTickets');
        });
    }

    changeticketNumberHandler= (event) => {
        this.setState({ticketNumber: event.target.value});
    }
    changeopenedAtHandler= (event) => {
        this.setState({openedAt: event.target.value});
    }
    changeclosedAtHandler= (event) => {
        this.setState({closedAt: event.target.value});
    }
    changePriorityHandler= (event) => {
        this.setState({priority: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/maintenanceTickets');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update MaintenanceTicket</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> ticketNumber: </label>
                                                <input placeholder="ticketNumber" name="ticketNumber" className="form-control" value={this.state.ticketNumber} onChange={this.changeticketNumberHandler}/>

                                            <label> openedAt: </label>
                                                <input type="time" placeholder="openedAt" name="openedAt" className="form-control" value={this.state.openedAt} onChange={this.changeopenedAtHandler}/>

                                            <label> closedAt: </label>
                                                <input type="time" placeholder="closedAt" name="closedAt" className="form-control" value={this.state.closedAt} onChange={this.changeclosedAtHandler}/>

                                            <label> Priority: </label>
                                                <select value={this.state.priority} onChange={this.changePriorityHandler}>
                      <option name="Priority" className="form-control" >
                          Low
                      </option>
                      <option name="Priority" className="form-control" >
                          Medium
                      </option>
                      <option name="Priority" className="form-control" >
                          High
                      </option>
                      <option name="Priority" className="form-control" >
                          Urgent
                      </option>
                    </select>

                                            <label> Status: </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Open
                      </option>
                      <option name="Status" className="form-control" >
                          InProgress
                      </option>
                      <option name="Status" className="form-control" >
                          WaitingOnParts
                      </option>
                      <option name="Status" className="form-control" >
                          Closed
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateMaintenanceTicket}>Save</button>
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

export default UpdateMaintenanceTicketComponent
