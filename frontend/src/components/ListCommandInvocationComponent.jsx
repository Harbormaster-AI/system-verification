import React, { Component } from 'react'
import CommandInvocationService from '../services/CommandInvocationService'

class ListCommandInvocationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                commandInvocations: []
        }
        this.addCommandInvocation = this.addCommandInvocation.bind(this);
        this.editCommandInvocation = this.editCommandInvocation.bind(this);
        this.deleteCommandInvocation = this.deleteCommandInvocation.bind(this);
    }

    deleteCommandInvocation(id){
        CommandInvocationService.deleteCommandInvocation(id).then( res => {
            this.setState({commandInvocations: this.state.commandInvocations.filter(commandInvocation => commandInvocation.commandInvocationId !== id)});
        });
    }
    viewCommandInvocation(id){
        this.props.history.push(`/view-commandInvocation/${id}`);
    }
    editCommandInvocation(id){
        this.props.history.push(`/add-commandInvocation/${id}`);
    }

    componentDidMount(){
        CommandInvocationService.getCommandInvocations().then((res) => {
            this.setState({ commandInvocations: res.data});
        });
    }

    addCommandInvocation(){
        this.props.history.push('/add-commandInvocation/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">CommandInvocation List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addCommandInvocation}> Add CommandInvocation</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> InvocationId </th>
                                    <th> RequestedAt </th>
                                    <th> CompletedAt </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.commandInvocations.map(
                                        commandInvocation => 
                                        <tr key = {commandInvocation.commandInvocationId}>
                                             <td> { commandInvocation.invocationId } </td>
                                             <td> { commandInvocation.requestedAt } </td>
                                             <td> { commandInvocation.completedAt } </td>
                                             <td> { commandInvocation.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editCommandInvocation(commandInvocation.commandInvocationId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCommandInvocation(commandInvocation.commandInvocationId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCommandInvocation(commandInvocation.commandInvocationId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListCommandInvocationComponent
