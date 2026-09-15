import React, { Component } from 'react'
import TwinChangeEventService from '../services/TwinChangeEventService'

class ListTwinChangeEventComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                twinChangeEvents: []
        }
        this.addTwinChangeEvent = this.addTwinChangeEvent.bind(this);
        this.editTwinChangeEvent = this.editTwinChangeEvent.bind(this);
        this.deleteTwinChangeEvent = this.deleteTwinChangeEvent.bind(this);
    }

    deleteTwinChangeEvent(id){
        TwinChangeEventService.deleteTwinChangeEvent(id).then( res => {
            this.setState({twinChangeEvents: this.state.twinChangeEvents.filter(twinChangeEvent => twinChangeEvent.twinChangeEventId !== id)});
        });
    }
    viewTwinChangeEvent(id){
        this.props.history.push(`/view-twinChangeEvent/${id}`);
    }
    editTwinChangeEvent(id){
        this.props.history.push(`/add-twinChangeEvent/${id}`);
    }

    componentDidMount(){
        TwinChangeEventService.getTwinChangeEvents().then((res) => {
            this.setState({ twinChangeEvents: res.data});
        });
    }

    addTwinChangeEvent(){
        this.props.history.push('/add-twinChangeEvent/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">TwinChangeEvent List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addTwinChangeEvent}> Add TwinChangeEvent</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> EventId </th>
                                    <th> OccurredAt </th>
                                    <th> ChangeType </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.twinChangeEvents.map(
                                        twinChangeEvent => 
                                        <tr key = {twinChangeEvent.twinChangeEventId}>
                                             <td> { twinChangeEvent.eventId } </td>
                                             <td> { twinChangeEvent.occurredAt } </td>
                                             <td> { twinChangeEvent.changeType } </td>
                                             <td>
                                                 <button onClick={ () => this.editTwinChangeEvent(twinChangeEvent.twinChangeEventId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTwinChangeEvent(twinChangeEvent.twinChangeEventId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewTwinChangeEvent(twinChangeEvent.twinChangeEventId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListTwinChangeEventComponent
