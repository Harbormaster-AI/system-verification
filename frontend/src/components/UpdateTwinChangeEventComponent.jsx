import React, { Component } from 'react'
import TwinChangeEventService from '../services/TwinChangeEventService';

class UpdateTwinChangeEventComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                eventId: '',
                occurredAt: '',
                changeType: ''
        }
        this.updateTwinChangeEvent = this.updateTwinChangeEvent.bind(this);

        this.changeeventIdHandler = this.changeeventIdHandler.bind(this);
        this.changeoccurredAtHandler = this.changeoccurredAtHandler.bind(this);
        this.changeChangeTypeHandler = this.changeChangeTypeHandler.bind(this);
    }

    componentDidMount(){
        TwinChangeEventService.getTwinChangeEventById(this.state.id).then( (res) =>{
            let twinChangeEvent = res.data;
            this.setState({
                eventId: twinChangeEvent.eventId,
                occurredAt: twinChangeEvent.occurredAt,
                changeType: twinChangeEvent.changeType
            });
        });
    }

    updateTwinChangeEvent = (e) => {
        e.preventDefault();
        let twinChangeEvent = {
            twinChangeEventId: this.state.id,
            eventId: this.state.eventId,
            occurredAt: this.state.occurredAt,
            changeType: this.state.changeType
        };
        console.log('twinChangeEvent => ' + JSON.stringify(twinChangeEvent));
        console.log('id => ' + JSON.stringify(this.state.id));
        TwinChangeEventService.updateTwinChangeEvent(twinChangeEvent).then( res => {
            this.props.history.push('/twinChangeEvents');
        });
    }

    changeeventIdHandler= (event) => {
        this.setState({eventId: event.target.value});
    }
    changeoccurredAtHandler= (event) => {
        this.setState({occurredAt: event.target.value});
    }
    changeChangeTypeHandler= (event) => {
        this.setState({changeType: event.target.value});
    }

    cancel(){
        this.props.history.push('/twinChangeEvents');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update TwinChangeEvent</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> eventId: </label>
                                                <input placeholder="eventId" name="eventId" className="form-control" value={this.state.eventId} onChange={this.changeeventIdHandler}/>

                                            <label> occurredAt: </label>
                                                <input type="time" placeholder="occurredAt" name="occurredAt" className="form-control" value={this.state.occurredAt} onChange={this.changeoccurredAtHandler}/>

                                            <label> ChangeType: </label>
                                                <select value={this.state.changeType} onChange={this.changeChangeTypeHandler}>
                      <option name="ChangeType" className="form-control" >
                          DesiredUpdated
                      </option>
                      <option name="ChangeType" className="form-control" >
                          ReportedUpdated
                      </option>
                      <option name="ChangeType" className="form-control" >
                          TagUpdated
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateTwinChangeEvent}>Save</button>
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

export default UpdateTwinChangeEventComponent
