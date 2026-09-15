import React, { Component } from 'react'
import ApiKeyService from '../services/ApiKeyService'

class ViewApiKeyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            apiKey: {}
        }
    }

    componentDidMount(){
        ApiKeyService.getApiKeyById(this.state.id).then( res => {
            this.setState({apiKey: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View ApiKey Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> keyId:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.apiKey.keyId }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> hashedSecret:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.apiKey.hashedSecret }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> createdAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.apiKey.createdAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> lastUsedAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.apiKey.lastUsedAt }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewApiKeyComponent
