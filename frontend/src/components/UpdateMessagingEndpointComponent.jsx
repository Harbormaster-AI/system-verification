import React, { Component } from 'react'
import MessagingEndpointService from '../services/MessagingEndpointService';

class UpdateMessagingEndpointComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                host: '',
                port: '',
                secure: '',
                protocol: ''
        }
        this.updateMessagingEndpoint = this.updateMessagingEndpoint.bind(this);

        this.changehostHandler = this.changehostHandler.bind(this);
        this.changeportHandler = this.changeportHandler.bind(this);
        this.changesecureHandler = this.changesecureHandler.bind(this);
        this.changeProtocolHandler = this.changeProtocolHandler.bind(this);
    }

    componentDidMount(){
        MessagingEndpointService.getMessagingEndpointById(this.state.id).then( (res) =>{
            let messagingEndpoint = res.data;
            this.setState({
                host: messagingEndpoint.host,
                port: messagingEndpoint.port,
                secure: messagingEndpoint.secure,
                protocol: messagingEndpoint.protocol
            });
        });
    }

    updateMessagingEndpoint = (e) => {
        e.preventDefault();
        let messagingEndpoint = {
            messagingEndpointId: this.state.id,
            host: this.state.host,
            port: this.state.port,
            secure: this.state.secure,
            protocol: this.state.protocol
        };
        console.log('messagingEndpoint => ' + JSON.stringify(messagingEndpoint));
        console.log('id => ' + JSON.stringify(this.state.id));
        MessagingEndpointService.updateMessagingEndpoint(messagingEndpoint).then( res => {
            this.props.history.push('/messagingEndpoints');
        });
    }

    changehostHandler= (event) => {
        this.setState({host: event.target.value});
    }
    changeportHandler= (event) => {
        this.setState({port: event.target.value});
    }
    changesecureHandler= (event) => {
        this.setState({secure: event.target.value});
    }
    changeProtocolHandler= (event) => {
        this.setState({protocol: event.target.value});
    }

    cancel(){
        this.props.history.push('/messagingEndpoints');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update MessagingEndpoint</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> host: </label>
                                                <input placeholder="host" name="host" className="form-control" value={this.state.host} onChange={this.changehostHandler}/>

                                            <label> port: </label>
                                                <input type="number" placeholder="port" name="port" className="form-control" value={this.state.port} onChange={this.changeportHandler}/>

                                            <label> secure: </label>
                                                <input type="checkbox" placeholder="secure" name="secure" className="form-control" value={this.state.secure} onChange={this.changesecureHandler}/>


                                            <label> Protocol: </label>
                                                <select value={this.state.protocol} onChange={this.changeProtocolHandler}>
                      <option name="Protocol" className="form-control" >
                          MQTT
                      </option>
                      <option name="Protocol" className="form-control" >
                          AMQP
                      </option>
                      <option name="Protocol" className="form-control" >
                          HTTP
                      </option>
                      <option name="Protocol" className="form-control" >
                          CoAP
                      </option>
                      <option name="Protocol" className="form-control" >
                          WebSocket
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateMessagingEndpoint}>Save</button>
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

export default UpdateMessagingEndpointComponent
