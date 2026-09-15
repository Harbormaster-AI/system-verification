import React, { Component } from 'react'
import MessagingEndpointService from '../services/MessagingEndpointService'

class ListMessagingEndpointComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                messagingEndpoints: []
        }
        this.addMessagingEndpoint = this.addMessagingEndpoint.bind(this);
        this.editMessagingEndpoint = this.editMessagingEndpoint.bind(this);
        this.deleteMessagingEndpoint = this.deleteMessagingEndpoint.bind(this);
    }

    deleteMessagingEndpoint(id){
        MessagingEndpointService.deleteMessagingEndpoint(id).then( res => {
            this.setState({messagingEndpoints: this.state.messagingEndpoints.filter(messagingEndpoint => messagingEndpoint.messagingEndpointId !== id)});
        });
    }
    viewMessagingEndpoint(id){
        this.props.history.push(`/view-messagingEndpoint/${id}`);
    }
    editMessagingEndpoint(id){
        this.props.history.push(`/add-messagingEndpoint/${id}`);
    }

    componentDidMount(){
        MessagingEndpointService.getMessagingEndpoints().then((res) => {
            this.setState({ messagingEndpoints: res.data});
        });
    }

    addMessagingEndpoint(){
        this.props.history.push('/add-messagingEndpoint/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">MessagingEndpoint List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addMessagingEndpoint}> Add MessagingEndpoint</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Host </th>
                                    <th> Port </th>
                                    <th> Secure </th>
                                    <th> Protocol </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.messagingEndpoints.map(
                                        messagingEndpoint => 
                                        <tr key = {messagingEndpoint.messagingEndpointId}>
                                             <td> { messagingEndpoint.host } </td>
                                             <td> { messagingEndpoint.port } </td>
                                             <td> { messagingEndpoint.secure } </td>
                                             <td> { messagingEndpoint.protocol } </td>
                                             <td>
                                                 <button onClick={ () => this.editMessagingEndpoint(messagingEndpoint.messagingEndpointId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteMessagingEndpoint(messagingEndpoint.messagingEndpointId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewMessagingEndpoint(messagingEndpoint.messagingEndpointId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListMessagingEndpointComponent
