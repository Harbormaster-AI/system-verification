import React, { Component } from 'react'
import CommandInvocationService from '../services/CommandInvocationService';

class UpdateCommandInvocationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                invocationId: '',
                requestedAt: '',
                completedAt: '',
                status: ''
        }
        this.updateCommandInvocation = this.updateCommandInvocation.bind(this);

        this.changeinvocationIdHandler = this.changeinvocationIdHandler.bind(this);
        this.changerequestedAtHandler = this.changerequestedAtHandler.bind(this);
        this.changecompletedAtHandler = this.changecompletedAtHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
        CommandInvocationService.getCommandInvocationById(this.state.id).then( (res) =>{
            let commandInvocation = res.data;
            this.setState({
                invocationId: commandInvocation.invocationId,
                requestedAt: commandInvocation.requestedAt,
                completedAt: commandInvocation.completedAt,
                status: commandInvocation.status
            });
        });
    }

    updateCommandInvocation = (e) => {
        e.preventDefault();
        let commandInvocation = {
            commandInvocationId: this.state.id,
            invocationId: this.state.invocationId,
            requestedAt: this.state.requestedAt,
            completedAt: this.state.completedAt,
            status: this.state.status
        };
        console.log('commandInvocation => ' + JSON.stringify(commandInvocation));
        console.log('id => ' + JSON.stringify(this.state.id));
        CommandInvocationService.updateCommandInvocation(commandInvocation).then( res => {
            this.props.history.push('/commandInvocations');
        });
    }

    changeinvocationIdHandler= (event) => {
        this.setState({invocationId: event.target.value});
    }
    changerequestedAtHandler= (event) => {
        this.setState({requestedAt: event.target.value});
    }
    changecompletedAtHandler= (event) => {
        this.setState({completedAt: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/commandInvocations');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update CommandInvocation</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> invocationId: </label>
                                                <input placeholder="invocationId" name="invocationId" className="form-control" value={this.state.invocationId} onChange={this.changeinvocationIdHandler}/>

                                            <label> requestedAt: </label>
                                                <input type="time" placeholder="requestedAt" name="requestedAt" className="form-control" value={this.state.requestedAt} onChange={this.changerequestedAtHandler}/>

                                            <label> completedAt: </label>
                                                <input type="time" placeholder="completedAt" name="completedAt" className="form-control" value={this.state.completedAt} onChange={this.changecompletedAtHandler}/>

                                            <label> Status: </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Queued
                      </option>
                      <option name="Status" className="form-control" >
                          Sent
                      </option>
                      <option name="Status" className="form-control" >
                          Succeeded
                      </option>
                      <option name="Status" className="form-control" >
                          Failed
                      </option>
                      <option name="Status" className="form-control" >
                          TimedOut
                      </option>
                      <option name="Status" className="form-control" >
                          Cancelled
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateCommandInvocation}>Save</button>
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

export default UpdateCommandInvocationComponent
