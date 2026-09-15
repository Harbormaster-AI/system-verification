import React, { Component } from 'react'
import GatewayService from '../services/GatewayService'

class ViewGatewayComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            gateway: {}
        }
    }

    componentDidMount(){
        GatewayService.getGatewayById(this.state.id).then( res => {
            this.setState({gateway: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Gateway Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> softwareVersion:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.gateway.softwareVersion }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.gateway.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewGatewayComponent
