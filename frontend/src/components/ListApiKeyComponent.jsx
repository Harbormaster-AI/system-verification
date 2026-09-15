import React, { Component } from 'react'
import ApiKeyService from '../services/ApiKeyService'

class ListApiKeyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                apiKeys: []
        }
        this.addApiKey = this.addApiKey.bind(this);
        this.editApiKey = this.editApiKey.bind(this);
        this.deleteApiKey = this.deleteApiKey.bind(this);
    }

    deleteApiKey(id){
        ApiKeyService.deleteApiKey(id).then( res => {
            this.setState({apiKeys: this.state.apiKeys.filter(apiKey => apiKey.apiKeyId !== id)});
        });
    }
    viewApiKey(id){
        this.props.history.push(`/view-apiKey/${id}`);
    }
    editApiKey(id){
        this.props.history.push(`/add-apiKey/${id}`);
    }

    componentDidMount(){
        ApiKeyService.getApiKeys().then((res) => {
            this.setState({ apiKeys: res.data});
        });
    }

    addApiKey(){
        this.props.history.push('/add-apiKey/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">ApiKey List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addApiKey}> Add ApiKey</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> KeyId </th>
                                    <th> HashedSecret </th>
                                    <th> CreatedAt </th>
                                    <th> LastUsedAt </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.apiKeys.map(
                                        apiKey => 
                                        <tr key = {apiKey.apiKeyId}>
                                             <td> { apiKey.keyId } </td>
                                             <td> { apiKey.hashedSecret } </td>
                                             <td> { apiKey.createdAt } </td>
                                             <td> { apiKey.lastUsedAt } </td>
                                             <td>
                                                 <button onClick={ () => this.editApiKey(apiKey.apiKeyId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteApiKey(apiKey.apiKeyId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewApiKey(apiKey.apiKeyId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListApiKeyComponent
