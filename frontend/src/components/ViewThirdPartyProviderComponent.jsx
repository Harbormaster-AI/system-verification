import React, { Component } from 'react'
import ThirdPartyProviderService from '../services/ThirdPartyProviderService'

class ViewThirdPartyProviderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            thirdPartyProvider: {}
        }
    }

    componentDidMount(){
        ThirdPartyProviderService.getThirdPartyProviderById(this.state.id).then( res => {
            this.setState({thirdPartyProvider: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View ThirdPartyProvider Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.thirdPartyProvider.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> registrationId:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.thirdPartyProvider.registrationId }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> website:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.thirdPartyProvider.website }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewThirdPartyProviderComponent
