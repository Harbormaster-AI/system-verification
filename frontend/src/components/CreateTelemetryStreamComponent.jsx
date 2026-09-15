import React, { Component } from 'react'
import TelemetryStreamService from '../services/TelemetryStreamService';

class CreateTelemetryStreamComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                streamName: '',
                retentionDays: '',
                qos: ''
        }
        this.changestreamNameHandler = this.changestreamNameHandler.bind(this);
        this.changeretentionDaysHandler = this.changeretentionDaysHandler.bind(this);
        this.changeQosHandler = this.changeQosHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            TelemetryStreamService.getTelemetryStreamById(this.state.id).then( (res) =>{
                let telemetryStream = res.data;
                this.setState({
                    streamName: telemetryStream.streamName,
                    retentionDays: telemetryStream.retentionDays,
                    qos: telemetryStream.qos
                });
            });
        }        
    }
    saveOrUpdateTelemetryStream = (e) => {
        e.preventDefault();
        let telemetryStream = {
                telemetryStreamId: this.state.id,
                streamName: this.state.streamName,
                retentionDays: this.state.retentionDays,
                qos: this.state.qos
            };
        console.log('telemetryStream => ' + JSON.stringify(telemetryStream));

        // step 5
        if(this.state.id === '_add'){
            telemetryStream.telemetryStreamId=''
            TelemetryStreamService.createTelemetryStream(telemetryStream).then(res =>{
                this.props.history.push('/telemetryStreams');
            });
        }else{
            TelemetryStreamService.updateTelemetryStream(telemetryStream).then( res => {
                this.props.history.push('/telemetryStreams');
            });
        }
    }
    
    changestreamNameHandler= (event) => {
        this.setState({streamName: event.target.value});
    }
    changeretentionDaysHandler= (event) => {
        this.setState({retentionDays: event.target.value});
    }
    changeQosHandler= (event) => {
        this.setState({qos: event.target.value});
    }

    cancel(){
        this.props.history.push('/telemetryStreams');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add TelemetryStream</h3>
        }else{
            return <h3 className="text-center">Update TelemetryStream</h3>
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
                                            <label> streamName:&emsp; </label>
                                                <input placeholder="streamName" name="streamName" className="form-control" value={this.state.streamName} onChange={this.changestreamNameHandler}/>

                                            <label> retentionDays:&emsp; </label>
                                                <input type="number" placeholder="retentionDays" name="retentionDays" className="form-control" value={this.state.retentionDays} onChange={this.changeretentionDaysHandler}/>

                                            <label> Qos:&emsp; </label>
                                                <select value={this.state.qos} onChange={this.changeQosHandler}>
                      <option name="Qos" className="form-control" >
                          AtMostOnce
                      </option>
                      <option name="Qos" className="form-control" >
                          AtLeastOnce
                      </option>
                      <option name="Qos" className="form-control" >
                          ExactlyOnce
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateTelemetryStream}>Save</button>
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

export default CreateTelemetryStreamComponent
