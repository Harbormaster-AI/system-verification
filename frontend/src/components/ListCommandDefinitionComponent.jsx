import React, { Component } from 'react'
import CommandDefinitionService from '../services/CommandDefinitionService'

class ListCommandDefinitionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                commandDefinitions: []
        }
        this.addCommandDefinition = this.addCommandDefinition.bind(this);
        this.editCommandDefinition = this.editCommandDefinition.bind(this);
        this.deleteCommandDefinition = this.deleteCommandDefinition.bind(this);
    }

    deleteCommandDefinition(id){
        CommandDefinitionService.deleteCommandDefinition(id).then( res => {
            this.setState({commandDefinitions: this.state.commandDefinitions.filter(commandDefinition => commandDefinition.commandDefinitionId !== id)});
        });
    }
    viewCommandDefinition(id){
        this.props.history.push(`/view-commandDefinition/${id}`);
    }
    editCommandDefinition(id){
        this.props.history.push(`/add-commandDefinition/${id}`);
    }

    componentDidMount(){
        CommandDefinitionService.getCommandDefinitions().then((res) => {
            this.setState({ commandDefinitions: res.data});
        });
    }

    addCommandDefinition(){
        this.props.history.push('/add-commandDefinition/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">CommandDefinition List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addCommandDefinition}> Add CommandDefinition</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> RequestSchemaUri </th>
                                    <th> ResponseSchemaUri </th>
                                    <th> TimeoutSeconds </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.commandDefinitions.map(
                                        commandDefinition => 
                                        <tr key = {commandDefinition.commandDefinitionId}>
                                             <td> { commandDefinition.name } </td>
                                             <td> { commandDefinition.requestSchemaUri } </td>
                                             <td> { commandDefinition.responseSchemaUri } </td>
                                             <td> { commandDefinition.timeoutSeconds } </td>
                                             <td>
                                                 <button onClick={ () => this.editCommandDefinition(commandDefinition.commandDefinitionId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCommandDefinition(commandDefinition.commandDefinitionId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCommandDefinition(commandDefinition.commandDefinitionId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListCommandDefinitionComponent
