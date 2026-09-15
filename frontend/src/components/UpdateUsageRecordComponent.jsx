import React, { Component } from 'react'
import UsageRecordService from '../services/UsageRecordService';

class UpdateUsageRecordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                periodStart: '',
                periodEnd: '',
                messagesSent: '',
                dataVolumeMB: ''
        }
        this.updateUsageRecord = this.updateUsageRecord.bind(this);

        this.changeperiodStartHandler = this.changeperiodStartHandler.bind(this);
        this.changeperiodEndHandler = this.changeperiodEndHandler.bind(this);
        this.changemessagesSentHandler = this.changemessagesSentHandler.bind(this);
        this.changedataVolumeMBHandler = this.changedataVolumeMBHandler.bind(this);
    }

    componentDidMount(){
        UsageRecordService.getUsageRecordById(this.state.id).then( (res) =>{
            let usageRecord = res.data;
            this.setState({
                periodStart: usageRecord.periodStart,
                periodEnd: usageRecord.periodEnd,
                messagesSent: usageRecord.messagesSent,
                dataVolumeMB: usageRecord.dataVolumeMB
            });
        });
    }

    updateUsageRecord = (e) => {
        e.preventDefault();
        let usageRecord = {
            usageRecordId: this.state.id,
            periodStart: this.state.periodStart,
            periodEnd: this.state.periodEnd,
            messagesSent: this.state.messagesSent,
            dataVolumeMB: this.state.dataVolumeMB
        };
        console.log('usageRecord => ' + JSON.stringify(usageRecord));
        console.log('id => ' + JSON.stringify(this.state.id));
        UsageRecordService.updateUsageRecord(usageRecord).then( res => {
            this.props.history.push('/usageRecords');
        });
    }

    changeperiodStartHandler= (event) => {
        this.setState({periodStart: event.target.value});
    }
    changeperiodEndHandler= (event) => {
        this.setState({periodEnd: event.target.value});
    }
    changemessagesSentHandler= (event) => {
        this.setState({messagesSent: event.target.value});
    }
    changedataVolumeMBHandler= (event) => {
        this.setState({dataVolumeMB: event.target.value});
    }

    cancel(){
        this.props.history.push('/usageRecords');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update UsageRecord</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> periodStart: </label>
                                                <input type="date" placeholder="periodStart" name="periodStart" className="form-control" value={this.state.periodStart} onChange={this.changeperiodStartHandler}/>

                                            <label> periodEnd: </label>
                                                <input type="date" placeholder="periodEnd" name="periodEnd" className="form-control" value={this.state.periodEnd} onChange={this.changeperiodEndHandler}/>

                                            <label> messagesSent: </label>
                                                <input type="number" placeholder="messagesSent" name="messagesSent" className="form-control" value={this.state.messagesSent} onChange={this.changemessagesSentHandler}/>

                                            <label> dataVolumeMB: </label>
                                                <input type="number" placeholder="dataVolumeMB" name="dataVolumeMB" className="form-control" value={this.state.dataVolumeMB} onChange={this.changedataVolumeMBHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateUsageRecord}>Save</button>
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

export default UpdateUsageRecordComponent
