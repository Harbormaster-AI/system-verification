import React, { Component } from 'react'
import TelemetryStreamService from '../services/TelemetryStreamService'

class ListTelemetryStreamComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                telemetryStreams: []
        }
        this.addTelemetryStream = this.addTelemetryStream.bind(this);
        this.editTelemetryStream = this.editTelemetryStream.bind(this);
        this.deleteTelemetryStream = this.deleteTelemetryStream.bind(this);
    }

    deleteTelemetryStream(id){
        TelemetryStreamService.deleteTelemetryStream(id).then( res => {
            this.setState({telemetryStreams: this.state.telemetryStreams.filter(telemetryStream => telemetryStream.telemetryStreamId !== id)});
        });
    }
    viewTelemetryStream(id){
        this.props.history.push(`/view-telemetryStream/${id}`);
    }
    editTelemetryStream(id){
        this.props.history.push(`/add-telemetryStream/${id}`);
    }

    componentDidMount(){
        TelemetryStreamService.getTelemetryStreams().then((res) => {
            this.setState({ telemetryStreams: res.data});
        });
    }

    addTelemetryStream(){
        this.props.history.push('/add-telemetryStream/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">TelemetryStream List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addTelemetryStream}> Add TelemetryStream</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> StreamName </th>
                                    <th> RetentionDays </th>
                                    <th> Qos </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.telemetryStreams.map(
                                        telemetryStream => 
                                        <tr key = {telemetryStream.telemetryStreamId}>
                                             <td> { telemetryStream.streamName } </td>
                                             <td> { telemetryStream.retentionDays } </td>
                                             <td> { telemetryStream.qos } </td>
                                             <td>
                                                 <button onClick={ () => this.editTelemetryStream(telemetryStream.telemetryStreamId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTelemetryStream(telemetryStream.telemetryStreamId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewTelemetryStream(telemetryStream.telemetryStreamId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListTelemetryStreamComponent
