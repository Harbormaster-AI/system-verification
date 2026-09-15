import React, { Component } from 'react'
import CommandDefinitionService from '../services/CommandDefinitionService'

class ViewCommandDefinitionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            commandDefinition: {}
        }
    }

    componentDidMount(){
        CommandDefinitionService.getCommandDefinitionById(this.state.id).then( res => {
            this.setState({commandDefinition: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View CommandDefinition Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.commandDefinition.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> requestSchemaUri:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.commandDefinition.requestSchemaUri }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> responseSchemaUri:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.commandDefinition.responseSchemaUri }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> timeoutSeconds:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.commandDefinition.timeoutSeconds }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewCommandDefinitionComponent
