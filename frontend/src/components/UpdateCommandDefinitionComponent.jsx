import React, { Component } from 'react'
import CommandDefinitionService from '../services/CommandDefinitionService';

class UpdateCommandDefinitionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                requestSchemaUri: '',
                responseSchemaUri: '',
                timeoutSeconds: ''
        }
        this.updateCommandDefinition = this.updateCommandDefinition.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changerequestSchemaUriHandler = this.changerequestSchemaUriHandler.bind(this);
        this.changeresponseSchemaUriHandler = this.changeresponseSchemaUriHandler.bind(this);
        this.changetimeoutSecondsHandler = this.changetimeoutSecondsHandler.bind(this);
    }

    componentDidMount(){
        CommandDefinitionService.getCommandDefinitionById(this.state.id).then( (res) =>{
            let commandDefinition = res.data;
            this.setState({
                name: commandDefinition.name,
                requestSchemaUri: commandDefinition.requestSchemaUri,
                responseSchemaUri: commandDefinition.responseSchemaUri,
                timeoutSeconds: commandDefinition.timeoutSeconds
            });
        });
    }

    updateCommandDefinition = (e) => {
        e.preventDefault();
        let commandDefinition = {
            commandDefinitionId: this.state.id,
            name: this.state.name,
            requestSchemaUri: this.state.requestSchemaUri,
            responseSchemaUri: this.state.responseSchemaUri,
            timeoutSeconds: this.state.timeoutSeconds
        };
        console.log('commandDefinition => ' + JSON.stringify(commandDefinition));
        console.log('id => ' + JSON.stringify(this.state.id));
        CommandDefinitionService.updateCommandDefinition(commandDefinition).then( res => {
            this.props.history.push('/commandDefinitions');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changerequestSchemaUriHandler= (event) => {
        this.setState({requestSchemaUri: event.target.value});
    }
    changeresponseSchemaUriHandler= (event) => {
        this.setState({responseSchemaUri: event.target.value});
    }
    changetimeoutSecondsHandler= (event) => {
        this.setState({timeoutSeconds: event.target.value});
    }

    cancel(){
        this.props.history.push('/commandDefinitions');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update CommandDefinition</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> requestSchemaUri: </label>
                                                <input placeholder="requestSchemaUri" name="requestSchemaUri" className="form-control" value={this.state.requestSchemaUri} onChange={this.changerequestSchemaUriHandler}/>

                                            <label> responseSchemaUri: </label>
                                                <input placeholder="responseSchemaUri" name="responseSchemaUri" className="form-control" value={this.state.responseSchemaUri} onChange={this.changeresponseSchemaUriHandler}/>

                                            <label> timeoutSeconds: </label>
                                                <input type="number" placeholder="timeoutSeconds" name="timeoutSeconds" className="form-control" value={this.state.timeoutSeconds} onChange={this.changetimeoutSecondsHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateCommandDefinition}>Save</button>
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

export default UpdateCommandDefinitionComponent
