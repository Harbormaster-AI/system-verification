import React, { Component } from 'react'
import CommandDefinitionService from '../services/CommandDefinitionService';

class CreateCommandDefinitionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                requestSchemaUri: '',
                responseSchemaUri: '',
                timeoutSeconds: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changerequestSchemaUriHandler = this.changerequestSchemaUriHandler.bind(this);
        this.changeresponseSchemaUriHandler = this.changeresponseSchemaUriHandler.bind(this);
        this.changetimeoutSecondsHandler = this.changetimeoutSecondsHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
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
    }
    saveOrUpdateCommandDefinition = (e) => {
        e.preventDefault();
        let commandDefinition = {
                commandDefinitionId: this.state.id,
                name: this.state.name,
                requestSchemaUri: this.state.requestSchemaUri,
                responseSchemaUri: this.state.responseSchemaUri,
                timeoutSeconds: this.state.timeoutSeconds
            };
        console.log('commandDefinition => ' + JSON.stringify(commandDefinition));

        // step 5
        if(this.state.id === '_add'){
            commandDefinition.commandDefinitionId=''
            CommandDefinitionService.createCommandDefinition(commandDefinition).then(res =>{
                this.props.history.push('/commandDefinitions');
            });
        }else{
            CommandDefinitionService.updateCommandDefinition(commandDefinition).then( res => {
                this.props.history.push('/commandDefinitions');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add CommandDefinition</h3>
        }else{
            return <h3 className="text-center">Update CommandDefinition</h3>
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
                                            <label> name:&emsp; </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> requestSchemaUri:&emsp; </label>
                                                <input placeholder="requestSchemaUri" name="requestSchemaUri" className="form-control" value={this.state.requestSchemaUri} onChange={this.changerequestSchemaUriHandler}/>

                                            <label> responseSchemaUri:&emsp; </label>
                                                <input placeholder="responseSchemaUri" name="responseSchemaUri" className="form-control" value={this.state.responseSchemaUri} onChange={this.changeresponseSchemaUriHandler}/>

                                            <label> timeoutSeconds:&emsp; </label>
                                                <input type="number" placeholder="timeoutSeconds" name="timeoutSeconds" className="form-control" value={this.state.timeoutSeconds} onChange={this.changetimeoutSecondsHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateCommandDefinition}>Save</button>
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

export default CreateCommandDefinitionComponent
