import React, { Component } from 'react'
import MaintenanceTicketService from '../services/MaintenanceTicketService'

class ListMaintenanceTicketComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                maintenanceTickets: []
        }
        this.addMaintenanceTicket = this.addMaintenanceTicket.bind(this);
        this.editMaintenanceTicket = this.editMaintenanceTicket.bind(this);
        this.deleteMaintenanceTicket = this.deleteMaintenanceTicket.bind(this);
    }

    deleteMaintenanceTicket(id){
        MaintenanceTicketService.deleteMaintenanceTicket(id).then( res => {
            this.setState({maintenanceTickets: this.state.maintenanceTickets.filter(maintenanceTicket => maintenanceTicket.maintenanceTicketId !== id)});
        });
    }
    viewMaintenanceTicket(id){
        this.props.history.push(`/view-maintenanceTicket/${id}`);
    }
    editMaintenanceTicket(id){
        this.props.history.push(`/add-maintenanceTicket/${id}`);
    }

    componentDidMount(){
        MaintenanceTicketService.getMaintenanceTickets().then((res) => {
            this.setState({ maintenanceTickets: res.data});
        });
    }

    addMaintenanceTicket(){
        this.props.history.push('/add-maintenanceTicket/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">MaintenanceTicket List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addMaintenanceTicket}> Add MaintenanceTicket</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> TicketNumber </th>
                                    <th> OpenedAt </th>
                                    <th> ClosedAt </th>
                                    <th> Priority </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.maintenanceTickets.map(
                                        maintenanceTicket => 
                                        <tr key = {maintenanceTicket.maintenanceTicketId}>
                                             <td> { maintenanceTicket.ticketNumber } </td>
                                             <td> { maintenanceTicket.openedAt } </td>
                                             <td> { maintenanceTicket.closedAt } </td>
                                             <td> { maintenanceTicket.priority } </td>
                                             <td> { maintenanceTicket.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editMaintenanceTicket(maintenanceTicket.maintenanceTicketId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteMaintenanceTicket(maintenanceTicket.maintenanceTicketId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewMaintenanceTicket(maintenanceTicket.maintenanceTicketId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListMaintenanceTicketComponent
