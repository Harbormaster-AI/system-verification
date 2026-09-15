import React, { Component } from 'react'
import DigitalTwinService from '../services/DigitalTwinService';

class CreateDigitalTwinComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                twinId: '',
                desiredStateVersion: '',
                reportedStateVersion: '',
                lastSyncAt: ''
        }
        this.changetwinIdHandler = this.changetwinIdHandler.bind(this);
        this.changedesiredStateVersionHandler = this.changedesiredStateVersionHandler.bind(this);
        this.changereportedStateVersionHandler = this.changereportedStateVersionHandler.bind(this);
        this.changelastSyncAtHandler = this.changelastSyncAtHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            DigitalTwinService.getDigitalTwinById(this.state.id).then( (res) =>{
                let digitalTwin = res.data;
                this.setState({
                    twinId: digitalTwin.twinId,
                    desiredStateVersion: digitalTwin.desiredStateVersion,
                    reportedStateVersion: digitalTwin.reportedStateVersion,
                    lastSyncAt: digitalTwin.lastSyncAt
                });
            });
        }        
    }
    saveOrUpdateDigitalTwin = (e) => {
        e.preventDefault();
        let digitalTwin = {
                digitalTwinId: this.state.id,
                twinId: this.state.twinId,
                desiredStateVersion: this.state.desiredStateVersion,
                reportedStateVersion: this.state.reportedStateVersion,
                lastSyncAt: this.state.lastSyncAt
            };
        console.log('digitalTwin => ' + JSON.stringify(digitalTwin));

        // step 5
        if(this.state.id === '_add'){
            digitalTwin.digitalTwinId=''
            DigitalTwinService.createDigitalTwin(digitalTwin).then(res =>{
                this.props.history.push('/digitalTwins');
            });
        }else{
            DigitalTwinService.updateDigitalTwin(digitalTwin).then( res => {
                this.props.history.push('/digitalTwins');
            });
        }
    }
    
    changetwinIdHandler= (event) => {
        this.setState({twinId: event.target.value});
    }
    changedesiredStateVersionHandler= (event) => {
        this.setState({desiredStateVersion: event.target.value});
    }
    changereportedStateVersionHandler= (event) => {
        this.setState({reportedStateVersion: event.target.value});
    }
    changelastSyncAtHandler= (event) => {
        this.setState({lastSyncAt: event.target.value});
    }

    cancel(){
        this.props.history.push('/digitalTwins');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add DigitalTwin</h3>
        }else{
            return <h3 className="text-center">Update DigitalTwin</h3>
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
                                            <label> twinId:&emsp; </label>
                                                <input placeholder="twinId" name="twinId" className="form-control" value={this.state.twinId} onChange={this.changetwinIdHandler}/>

                                            <label> desiredStateVersion:&emsp; </label>
                                                <input type="number" placeholder="desiredStateVersion" name="desiredStateVersion" className="form-control" value={this.state.desiredStateVersion} onChange={this.changedesiredStateVersionHandler}/>

                                            <label> reportedStateVersion:&emsp; </label>
                                                <input type="number" placeholder="reportedStateVersion" name="reportedStateVersion" className="form-control" value={this.state.reportedStateVersion} onChange={this.changereportedStateVersionHandler}/>

                                            <label> lastSyncAt:&emsp; </label>
                                                <input type="time" placeholder="lastSyncAt" name="lastSyncAt" className="form-control" value={this.state.lastSyncAt} onChange={this.changelastSyncAtHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateDigitalTwin}>Save</button>
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

export default CreateDigitalTwinComponent
