import React, { Component } from 'react'
import DigitalTwinService from '../services/DigitalTwinService'

class ListDigitalTwinComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                digitalTwins: []
        }
        this.addDigitalTwin = this.addDigitalTwin.bind(this);
        this.editDigitalTwin = this.editDigitalTwin.bind(this);
        this.deleteDigitalTwin = this.deleteDigitalTwin.bind(this);
    }

    deleteDigitalTwin(id){
        DigitalTwinService.deleteDigitalTwin(id).then( res => {
            this.setState({digitalTwins: this.state.digitalTwins.filter(digitalTwin => digitalTwin.digitalTwinId !== id)});
        });
    }
    viewDigitalTwin(id){
        this.props.history.push(`/view-digitalTwin/${id}`);
    }
    editDigitalTwin(id){
        this.props.history.push(`/add-digitalTwin/${id}`);
    }

    componentDidMount(){
        DigitalTwinService.getDigitalTwins().then((res) => {
            this.setState({ digitalTwins: res.data});
        });
    }

    addDigitalTwin(){
        this.props.history.push('/add-digitalTwin/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">DigitalTwin List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addDigitalTwin}> Add DigitalTwin</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> TwinId </th>
                                    <th> DesiredStateVersion </th>
                                    <th> ReportedStateVersion </th>
                                    <th> LastSyncAt </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.digitalTwins.map(
                                        digitalTwin => 
                                        <tr key = {digitalTwin.digitalTwinId}>
                                             <td> { digitalTwin.twinId } </td>
                                             <td> { digitalTwin.desiredStateVersion } </td>
                                             <td> { digitalTwin.reportedStateVersion } </td>
                                             <td> { digitalTwin.lastSyncAt } </td>
                                             <td>
                                                 <button onClick={ () => this.editDigitalTwin(digitalTwin.digitalTwinId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDigitalTwin(digitalTwin.digitalTwinId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDigitalTwin(digitalTwin.digitalTwinId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListDigitalTwinComponent
