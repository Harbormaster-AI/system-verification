import React, { Component } from 'react'
import SoftwareUpdateExecutionService from '../services/SoftwareUpdateExecutionService'

class ViewSoftwareUpdateExecutionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            softwareUpdateExecution: {}
        }
    }

    componentDidMount(){
        SoftwareUpdateExecutionService.getSoftwareUpdateExecutionById(this.state.id).then( res => {
            this.setState({softwareUpdateExecution: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View SoftwareUpdateExecution Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> startedAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.softwareUpdateExecution.startedAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> completedAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.softwareUpdateExecution.completedAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.softwareUpdateExecution.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSoftwareUpdateExecutionComponent
