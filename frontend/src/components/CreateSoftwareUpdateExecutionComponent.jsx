import React, { Component } from 'react'
import SoftwareUpdateExecutionService from '../services/SoftwareUpdateExecutionService';

class CreateSoftwareUpdateExecutionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                startedAt: '',
                completedAt: '',
                status: ''
        }
        this.changestartedAtHandler = this.changestartedAtHandler.bind(this);
        this.changecompletedAtHandler = this.changecompletedAtHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            SoftwareUpdateExecutionService.getSoftwareUpdateExecutionById(this.state.id).then( (res) =>{
                let softwareUpdateExecution = res.data;
                this.setState({
                    startedAt: softwareUpdateExecution.startedAt,
                    completedAt: softwareUpdateExecution.completedAt,
                    status: softwareUpdateExecution.status
                });
            });
        }        
    }
    saveOrUpdateSoftwareUpdateExecution = (e) => {
        e.preventDefault();
        let softwareUpdateExecution = {
                softwareUpdateExecutionId: this.state.id,
                startedAt: this.state.startedAt,
                completedAt: this.state.completedAt,
                status: this.state.status
            };
        console.log('softwareUpdateExecution => ' + JSON.stringify(softwareUpdateExecution));

        // step 5
        if(this.state.id === '_add'){
            softwareUpdateExecution.softwareUpdateExecutionId=''
            SoftwareUpdateExecutionService.createSoftwareUpdateExecution(softwareUpdateExecution).then(res =>{
                this.props.history.push('/softwareUpdateExecutions');
            });
        }else{
            SoftwareUpdateExecutionService.updateSoftwareUpdateExecution(softwareUpdateExecution).then( res => {
                this.props.history.push('/softwareUpdateExecutions');
            });
        }
    }
    
    changestartedAtHandler= (event) => {
        this.setState({startedAt: event.target.value});
    }
    changecompletedAtHandler= (event) => {
        this.setState({completedAt: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/softwareUpdateExecutions');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add SoftwareUpdateExecution</h3>
        }else{
            return <h3 className="text-center">Update SoftwareUpdateExecution</h3>
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
                                            <label> startedAt:&emsp; </label>
                                                <input type="time" placeholder="startedAt" name="startedAt" className="form-control" value={this.state.startedAt} onChange={this.changestartedAtHandler}/>

                                            <label> completedAt:&emsp; </label>
                                                <input type="time" placeholder="completedAt" name="completedAt" className="form-control" value={this.state.completedAt} onChange={this.changecompletedAtHandler}/>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Downloading
                      </option>
                      <option name="Status" className="form-control" >
                          Installing
                      </option>
                      <option name="Status" className="form-control" >
                          Rebooting
                      </option>
                      <option name="Status" className="form-control" >
                          Success
                      </option>
                      <option name="Status" className="form-control" >
                          Failure
                      </option>
                      <option name="Status" className="form-control" >
                          Deferred
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateSoftwareUpdateExecution}>Save</button>
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

export default CreateSoftwareUpdateExecutionComponent
