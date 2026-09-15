import React, { Component } from 'react'
import AlertService from '../services/AlertService';

class CreateAlertComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                raisedAt: '',
                clearedAt: '',
                message: '',
                status: ''
        }
        this.changeraisedAtHandler = this.changeraisedAtHandler.bind(this);
        this.changeclearedAtHandler = this.changeclearedAtHandler.bind(this);
        this.changemessageHandler = this.changemessageHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            AlertService.getAlertById(this.state.id).then( (res) =>{
                let alert = res.data;
                this.setState({
                    raisedAt: alert.raisedAt,
                    clearedAt: alert.clearedAt,
                    message: alert.message,
                    status: alert.status
                });
            });
        }        
    }
    saveOrUpdateAlert = (e) => {
        e.preventDefault();
        let alert = {
                alertId: this.state.id,
                raisedAt: this.state.raisedAt,
                clearedAt: this.state.clearedAt,
                message: this.state.message,
                status: this.state.status
            };
        console.log('alert => ' + JSON.stringify(alert));

        // step 5
        if(this.state.id === '_add'){
            alert.alertId=''
            AlertService.createAlert(alert).then(res =>{
                this.props.history.push('/alerts');
            });
        }else{
            AlertService.updateAlert(alert).then( res => {
                this.props.history.push('/alerts');
            });
        }
    }
    
    changeraisedAtHandler= (event) => {
        this.setState({raisedAt: event.target.value});
    }
    changeclearedAtHandler= (event) => {
        this.setState({clearedAt: event.target.value});
    }
    changemessageHandler= (event) => {
        this.setState({message: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/alerts');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Alert</h3>
        }else{
            return <h3 className="text-center">Update Alert</h3>
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
                                            <label> raisedAt:&emsp; </label>
                                                <input type="time" placeholder="raisedAt" name="raisedAt" className="form-control" value={this.state.raisedAt} onChange={this.changeraisedAtHandler}/>

                                            <label> clearedAt:&emsp; </label>
                                                <input type="time" placeholder="clearedAt" name="clearedAt" className="form-control" value={this.state.clearedAt} onChange={this.changeclearedAtHandler}/>

                                            <label> message:&emsp; </label>
                                                <input placeholder="message" name="message" className="form-control" value={this.state.message} onChange={this.changemessageHandler}/>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Open
                      </option>
                      <option name="Status" className="form-control" >
                          Acknowledged
                      </option>
                      <option name="Status" className="form-control" >
                          Resolved
                      </option>
                      <option name="Status" className="form-control" >
                          Suppressed
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateAlert}>Save</button>
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

export default CreateAlertComponent
