import React, { Component } from 'react'
import CommandInvocationService from '../services/CommandInvocationService'

class ViewCommandInvocationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            commandInvocation: {}
        }
    }

    componentDidMount(){
        CommandInvocationService.getCommandInvocationById(this.state.id).then( res => {
            this.setState({commandInvocation: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View CommandInvocation Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> invocationId:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.commandInvocation.invocationId }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> requestedAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.commandInvocation.requestedAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> completedAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.commandInvocation.completedAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.commandInvocation.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewCommandInvocationComponent
