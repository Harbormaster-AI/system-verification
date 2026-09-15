import React, { Component } from 'react'
import UsageRecordService from '../services/UsageRecordService';

class CreateUsageRecordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                periodStart: '',
                periodEnd: '',
                messagesSent: '',
                dataVolumeMB: ''
        }
        this.changeperiodStartHandler = this.changeperiodStartHandler.bind(this);
        this.changeperiodEndHandler = this.changeperiodEndHandler.bind(this);
        this.changemessagesSentHandler = this.changemessagesSentHandler.bind(this);
        this.changedataVolumeMBHandler = this.changedataVolumeMBHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
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
    }
    saveOrUpdateUsageRecord = (e) => {
        e.preventDefault();
        let usageRecord = {
                usageRecordId: this.state.id,
                periodStart: this.state.periodStart,
                periodEnd: this.state.periodEnd,
                messagesSent: this.state.messagesSent,
                dataVolumeMB: this.state.dataVolumeMB
            };
        console.log('usageRecord => ' + JSON.stringify(usageRecord));

        // step 5
        if(this.state.id === '_add'){
            usageRecord.usageRecordId=''
            UsageRecordService.createUsageRecord(usageRecord).then(res =>{
                this.props.history.push('/usageRecords');
            });
        }else{
            UsageRecordService.updateUsageRecord(usageRecord).then( res => {
                this.props.history.push('/usageRecords');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add UsageRecord</h3>
        }else{
            return <h3 className="text-center">Update UsageRecord</h3>
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
                                            <label> periodStart:&emsp; </label>
                                                <input type="date" placeholder="periodStart" name="periodStart" className="form-control" value={this.state.periodStart} onChange={this.changeperiodStartHandler}/>

                                            <label> periodEnd:&emsp; </label>
                                                <input type="date" placeholder="periodEnd" name="periodEnd" className="form-control" value={this.state.periodEnd} onChange={this.changeperiodEndHandler}/>

                                            <label> messagesSent:&emsp; </label>
                                                <input type="number" placeholder="messagesSent" name="messagesSent" className="form-control" value={this.state.messagesSent} onChange={this.changemessagesSentHandler}/>

                                            <label> dataVolumeMB:&emsp; </label>
                                                <input type="number" placeholder="dataVolumeMB" name="dataVolumeMB" className="form-control" value={this.state.dataVolumeMB} onChange={this.changedataVolumeMBHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateUsageRecord}>Save</button>
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

export default CreateUsageRecordComponent
