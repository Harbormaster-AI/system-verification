import React, { Component } from 'react'
import ApiKeyService from '../services/ApiKeyService';

class UpdateApiKeyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                keyId: '',
                hashedSecret: '',
                createdAt: '',
                lastUsedAt: ''
        }
        this.updateApiKey = this.updateApiKey.bind(this);

        this.changekeyIdHandler = this.changekeyIdHandler.bind(this);
        this.changehashedSecretHandler = this.changehashedSecretHandler.bind(this);
        this.changecreatedAtHandler = this.changecreatedAtHandler.bind(this);
        this.changelastUsedAtHandler = this.changelastUsedAtHandler.bind(this);
    }

    componentDidMount(){
        ApiKeyService.getApiKeyById(this.state.id).then( (res) =>{
            let apiKey = res.data;
            this.setState({
                keyId: apiKey.keyId,
                hashedSecret: apiKey.hashedSecret,
                createdAt: apiKey.createdAt,
                lastUsedAt: apiKey.lastUsedAt
            });
        });
    }

    updateApiKey = (e) => {
        e.preventDefault();
        let apiKey = {
            apiKeyId: this.state.id,
            keyId: this.state.keyId,
            hashedSecret: this.state.hashedSecret,
            createdAt: this.state.createdAt,
            lastUsedAt: this.state.lastUsedAt
        };
        console.log('apiKey => ' + JSON.stringify(apiKey));
        console.log('id => ' + JSON.stringify(this.state.id));
        ApiKeyService.updateApiKey(apiKey).then( res => {
            this.props.history.push('/apiKeys');
        });
    }

    changekeyIdHandler= (event) => {
        this.setState({keyId: event.target.value});
    }
    changehashedSecretHandler= (event) => {
        this.setState({hashedSecret: event.target.value});
    }
    changecreatedAtHandler= (event) => {
        this.setState({createdAt: event.target.value});
    }
    changelastUsedAtHandler= (event) => {
        this.setState({lastUsedAt: event.target.value});
    }

    cancel(){
        this.props.history.push('/apiKeys');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update ApiKey</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> keyId: </label>
                                                <input placeholder="keyId" name="keyId" className="form-control" value={this.state.keyId} onChange={this.changekeyIdHandler}/>

                                            <label> hashedSecret: </label>
                                                <input placeholder="hashedSecret" name="hashedSecret" className="form-control" value={this.state.hashedSecret} onChange={this.changehashedSecretHandler}/>

                                            <label> createdAt: </label>
                                                <input type="time" placeholder="createdAt" name="createdAt" className="form-control" value={this.state.createdAt} onChange={this.changecreatedAtHandler}/>

                                            <label> lastUsedAt: </label>
                                                <input type="time" placeholder="lastUsedAt" name="lastUsedAt" className="form-control" value={this.state.lastUsedAt} onChange={this.changelastUsedAtHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateApiKey}>Save</button>
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

export default UpdateApiKeyComponent
