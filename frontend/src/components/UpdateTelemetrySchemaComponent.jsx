import React, { Component } from 'react'
import TelemetrySchemaService from '../services/TelemetrySchemaService';

class UpdateTelemetrySchemaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                schemaId: '',
                schemaUri: '',
                encoding: ''
        }
        this.updateTelemetrySchema = this.updateTelemetrySchema.bind(this);

        this.changeschemaIdHandler = this.changeschemaIdHandler.bind(this);
        this.changeschemaUriHandler = this.changeschemaUriHandler.bind(this);
        this.changeEncodingHandler = this.changeEncodingHandler.bind(this);
    }

    componentDidMount(){
        TelemetrySchemaService.getTelemetrySchemaById(this.state.id).then( (res) =>{
            let telemetrySchema = res.data;
            this.setState({
                schemaId: telemetrySchema.schemaId,
                schemaUri: telemetrySchema.schemaUri,
                encoding: telemetrySchema.encoding
            });
        });
    }

    updateTelemetrySchema = (e) => {
        e.preventDefault();
        let telemetrySchema = {
            telemetrySchemaId: this.state.id,
            schemaId: this.state.schemaId,
            schemaUri: this.state.schemaUri,
            encoding: this.state.encoding
        };
        console.log('telemetrySchema => ' + JSON.stringify(telemetrySchema));
        console.log('id => ' + JSON.stringify(this.state.id));
        TelemetrySchemaService.updateTelemetrySchema(telemetrySchema).then( res => {
            this.props.history.push('/telemetrySchemas');
        });
    }

    changeschemaIdHandler= (event) => {
        this.setState({schemaId: event.target.value});
    }
    changeschemaUriHandler= (event) => {
        this.setState({schemaUri: event.target.value});
    }
    changeEncodingHandler= (event) => {
        this.setState({encoding: event.target.value});
    }

    cancel(){
        this.props.history.push('/telemetrySchemas');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update TelemetrySchema</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> schemaId: </label>
                                                <input placeholder="schemaId" name="schemaId" className="form-control" value={this.state.schemaId} onChange={this.changeschemaIdHandler}/>

                                            <label> schemaUri: </label>
                                                <input placeholder="schemaUri" name="schemaUri" className="form-control" value={this.state.schemaUri} onChange={this.changeschemaUriHandler}/>

                                            <label> Encoding: </label>
                                                <select value={this.state.encoding} onChange={this.changeEncodingHandler}>
                      <option name="Encoding" className="form-control" >
                          JSON
                      </option>
                      <option name="Encoding" className="form-control" >
                          CBOR
                      </option>
                      <option name="Encoding" className="form-control" >
                          Protobuf
                      </option>
                      <option name="Encoding" className="form-control" >
                          Avro
                      </option>
                      <option name="Encoding" className="form-control" >
                          Binary
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateTelemetrySchema}>Save</button>
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

export default UpdateTelemetrySchemaComponent
