import React, { Component } from 'react'
import AlertService from '../services/AlertService'

class ViewAlertComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            alert: {}
        }
    }

    componentDidMount(){
        AlertService.getAlertById(this.state.id).then( res => {
            this.setState({alert: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Alert Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> raisedAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.alert.raisedAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> clearedAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.alert.clearedAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> message:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.alert.message }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.alert.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewAlertComponent
