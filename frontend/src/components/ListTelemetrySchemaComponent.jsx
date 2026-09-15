import React, { Component } from 'react'
import TelemetrySchemaService from '../services/TelemetrySchemaService'

class ListTelemetrySchemaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                telemetrySchemas: []
        }
        this.addTelemetrySchema = this.addTelemetrySchema.bind(this);
        this.editTelemetrySchema = this.editTelemetrySchema.bind(this);
        this.deleteTelemetrySchema = this.deleteTelemetrySchema.bind(this);
    }

    deleteTelemetrySchema(id){
        TelemetrySchemaService.deleteTelemetrySchema(id).then( res => {
            this.setState({telemetrySchemas: this.state.telemetrySchemas.filter(telemetrySchema => telemetrySchema.telemetrySchemaId !== id)});
        });
    }
    viewTelemetrySchema(id){
        this.props.history.push(`/view-telemetrySchema/${id}`);
    }
    editTelemetrySchema(id){
        this.props.history.push(`/add-telemetrySchema/${id}`);
    }

    componentDidMount(){
        TelemetrySchemaService.getTelemetrySchemas().then((res) => {
            this.setState({ telemetrySchemas: res.data});
        });
    }

    addTelemetrySchema(){
        this.props.history.push('/add-telemetrySchema/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">TelemetrySchema List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addTelemetrySchema}> Add TelemetrySchema</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> SchemaId </th>
                                    <th> SchemaUri </th>
                                    <th> Encoding </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.telemetrySchemas.map(
                                        telemetrySchema => 
                                        <tr key = {telemetrySchema.telemetrySchemaId}>
                                             <td> { telemetrySchema.schemaId } </td>
                                             <td> { telemetrySchema.schemaUri } </td>
                                             <td> { telemetrySchema.encoding } </td>
                                             <td>
                                                 <button onClick={ () => this.editTelemetrySchema(telemetrySchema.telemetrySchemaId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTelemetrySchema(telemetrySchema.telemetrySchemaId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewTelemetrySchema(telemetrySchema.telemetrySchemaId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListTelemetrySchemaComponent
