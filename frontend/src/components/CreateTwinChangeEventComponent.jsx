import React, { Component } from 'react'
import TwinChangeEventService from '../services/TwinChangeEventService';

class CreateTwinChangeEventComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                eventId: '',
                occurredAt: '',
                changeType: ''
        }
        this.changeeventIdHandler = this.changeeventIdHandler.bind(this);
        this.changeoccurredAtHandler = this.changeoccurredAtHandler.bind(this);
        this.changeChangeTypeHandler = this.changeChangeTypeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            TwinChangeEventService.getTwinChangeEventById(this.state.id).then( (res) =>{
                let twinChangeEvent = res.data;
                this.setState({
                    eventId: twinChangeEvent.eventId,
                    occurredAt: twinChangeEvent.occurredAt,
                    changeType: twinChangeEvent.changeType
                });
            });
        }        
    }
    saveOrUpdateTwinChangeEvent = (e) => {
        e.preventDefault();
        let twinChangeEvent = {
                twinChangeEventId: this.state.id,
                eventId: this.state.eventId,
                occurredAt: this.state.occurredAt,
                changeType: this.state.changeType
            };
        console.log('twinChangeEvent => ' + JSON.stringify(twinChangeEvent));

        // step 5
        if(this.state.id === '_add'){
            twinChangeEvent.twinChangeEventId=''
            TwinChangeEventService.createTwinChangeEvent(twinChangeEvent).then(res =>{
                this.props.history.push('/twinChangeEvents');
            });
        }else{
            TwinChangeEventService.updateTwinChangeEvent(twinChangeEvent).then( res => {
                this.props.history.push('/twinChangeEvents');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add TwinChangeEvent</h3>
        }else{
            return <h3 className="text-center">Update TwinChangeEvent</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> eventId:&emsp; </label>
                                                <input placeholder="eventId" name="eventId" className="form-control" value={this.state.eventId} onChange={this.changeeventIdHandler}/>

                                            <label> occurredAt:&emsp; </label>
                                                <input type="time" placeholder="occurredAt" name="occurredAt" className="form-control" value={this.state.occurredAt} onChange={this.changeoccurredAtHandler}/>

                                            <label> ChangeType:&emsp; </label>
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

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateTwinChangeEvent}>Save</button>
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

export default CreateTwinChangeEventComponent
