import React, { Component } from 'react'
import AlertService from '../services/AlertService';

class UpdateAlertComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                raisedAt: '',
                clearedAt: '',
                message: '',
                status: ''
        }
        this.updateAlert = this.updateAlert.bind(this);

        this.changeraisedAtHandler = this.changeraisedAtHandler.bind(this);
        this.changeclearedAtHandler = this.changeclearedAtHandler.bind(this);
        this.changemessageHandler = this.changemessageHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
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

    updateAlert = (e) => {
        e.preventDefault();
        let alert = {
            alertId: this.state.id,
            raisedAt: this.state.raisedAt,
            clearedAt: this.state.clearedAt,
            message: this.state.message,
            status: this.state.status
        };
        console.log('alert => ' + JSON.stringify(alert));
        console.log('id => ' + JSON.stringify(this.state.id));
        AlertService.updateAlert(alert).then( res => {
            this.props.history.push('/alerts');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Alert</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> raisedAt: </label>
                                                <input type="time" placeholder="raisedAt" name="raisedAt" className="form-control" value={this.state.raisedAt} onChange={this.changeraisedAtHandler}/>

                                            <label> clearedAt: </label>
                                                <input type="time" placeholder="clearedAt" name="clearedAt" className="form-control" value={this.state.clearedAt} onChange={this.changeclearedAtHandler}/>

                                            <label> message: </label>
                                                <input placeholder="message" name="message" className="form-control" value={this.state.message} onChange={this.changemessageHandler}/>

                                            <label> Status: </label>
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
                                        <button className="btn btn-success" onClick={this.updateAlert}>Save</button>
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

export default UpdateAlertComponent
