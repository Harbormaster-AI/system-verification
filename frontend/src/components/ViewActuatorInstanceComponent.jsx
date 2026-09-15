import React, { Component } from 'react'
import ActuatorInstanceService from '../services/ActuatorInstanceService'

class ViewActuatorInstanceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            actuatorInstance: {}
        }
    }

    componentDidMount(){
        ActuatorInstanceService.getActuatorInstanceById(this.state.id).then( res => {
            this.setState({actuatorInstance: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View ActuatorInstance Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.actuatorInstance.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> commandTopic:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.actuatorInstance.commandTopic }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> ActuatorType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.actuatorInstance.actuatorType }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewActuatorInstanceComponent
