import React, { Component } from 'react'
import MessagingEndpointService from '../services/MessagingEndpointService'

class ViewMessagingEndpointComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            messagingEndpoint: {}
        }
    }

    componentDidMount(){
        MessagingEndpointService.getMessagingEndpointById(this.state.id).then( res => {
            this.setState({messagingEndpoint: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View MessagingEndpoint Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> host:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.messagingEndpoint.host }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> port:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.messagingEndpoint.port }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> secure:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.messagingEndpoint.secure }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Protocol:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.messagingEndpoint.protocol }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewMessagingEndpointComponent
