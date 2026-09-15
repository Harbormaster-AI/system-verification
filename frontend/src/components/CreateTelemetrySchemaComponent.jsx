import React, { Component } from 'react'
import TelemetrySchemaService from '../services/TelemetrySchemaService';

class CreateTelemetrySchemaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                schemaId: '',
                schemaUri: '',
                encoding: ''
        }
        this.changeschemaIdHandler = this.changeschemaIdHandler.bind(this);
        this.changeschemaUriHandler = this.changeschemaUriHandler.bind(this);
        this.changeEncodingHandler = this.changeEncodingHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            TelemetrySchemaService.getTelemetrySchemaById(this.state.id).then( (res) =>{
                let telemetrySchema = res.data;
                this.setState({
                    schemaId: telemetrySchema.schemaId,
                    schemaUri: telemetrySchema.schemaUri,
                    encoding: telemetrySchema.encoding
                });
            });
        }        
    }
    saveOrUpdateTelemetrySchema = (e) => {
        e.preventDefault();
        let telemetrySchema = {
                telemetrySchemaId: this.state.id,
                schemaId: this.state.schemaId,
                schemaUri: this.state.schemaUri,
                encoding: this.state.encoding
            };
        console.log('telemetrySchema => ' + JSON.stringify(telemetrySchema));

        // step 5
        if(this.state.id === '_add'){
            telemetrySchema.telemetrySchemaId=''
            TelemetrySchemaService.createTelemetrySchema(telemetrySchema).then(res =>{
                this.props.history.push('/telemetrySchemas');
            });
        }else{
            TelemetrySchemaService.updateTelemetrySchema(telemetrySchema).then( res => {
                this.props.history.push('/telemetrySchemas');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add TelemetrySchema</h3>
        }else{
            return <h3 className="text-center">Update TelemetrySchema</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> schemaId:&emsp; </label>
                                                <input placeholder="schemaId" name="schemaId" className="form-control" value={this.state.schemaId} onChange={this.changeschemaIdHandler}/>

                                            <label> schemaUri:&emsp; </label>
                                                <input placeholder="schemaUri" name="schemaUri" className="form-control" value={this.state.schemaUri} onChange={this.changeschemaUriHandler}/>

                                            <label> Encoding:&emsp; </label>
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

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateTelemetrySchema}>Save</button>
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

export default CreateTelemetrySchemaComponent
