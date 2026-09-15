import React, { Component } from 'react'
import TwinChangeEventService from '../services/TwinChangeEventService'

class ViewTwinChangeEventComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            twinChangeEvent: {}
        }
    }

    componentDidMount(){
        TwinChangeEventService.getTwinChangeEventById(this.state.id).then( res => {
            this.setState({twinChangeEvent: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View TwinChangeEvent Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> eventId:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.twinChangeEvent.eventId }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> occurredAt:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.twinChangeEvent.occurredAt }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> ChangeType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.twinChangeEvent.changeType }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewTwinChangeEventComponent
