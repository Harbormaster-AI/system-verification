import React, { Component } from 'react'
import TelemetrySchemaService from '../services/TelemetrySchemaService'

class ViewTelemetrySchemaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            telemetrySchema: {}
        }
    }

    componentDidMount(){
        TelemetrySchemaService.getTelemetrySchemaById(this.state.id).then( res => {
            this.setState({telemetrySchema: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View TelemetrySchema Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> schemaId:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.telemetrySchema.schemaId }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> schemaUri:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.telemetrySchema.schemaUri }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Encoding:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.telemetrySchema.encoding }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewTelemetrySchemaComponent
