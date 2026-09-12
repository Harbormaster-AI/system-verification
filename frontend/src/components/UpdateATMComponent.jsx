import React, { Component } from 'react'
import ATMService from '../services/ATMService';

class UpdateATMComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                terminalId: '',
                location: '',
                status: ''
        }
        this.updateATM = this.updateATM.bind(this);

        this.changeterminalIdHandler = this.changeterminalIdHandler.bind(this);
        this.changelocationHandler = this.changelocationHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
        ATMService.getATMById(this.state.id).then( (res) =>{
            let aTM = res.data;
            this.setState({
                terminalId: aTM.terminalId,
                location: aTM.location,
                status: aTM.status
            });
        });
    }

    updateATM = (e) => {
        e.preventDefault();
        let aTM = {
            aTMId: this.state.id,
            terminalId: this.state.terminalId,
            location: this.state.location,
            status: this.state.status
        };
        console.log('aTM => ' + JSON.stringify(aTM));
        console.log('id => ' + JSON.stringify(this.state.id));
        ATMService.updateATM(aTM).then( res => {
            this.props.history.push('/aTMs');
        });
    }

    changeterminalIdHandler= (event) => {
        this.setState({terminalId: event.target.value});
    }
    changelocationHandler= (event) => {
        this.setState({location: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/aTMs');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update ATM</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> terminalId: </label>
                                                <input placeholder="terminalId" name="terminalId" className="form-control" value={this.state.terminalId} onChange={this.changeterminalIdHandler}/>

                                            <label> location: </label>
                                                <input placeholder="location" name="location" className="form-control" value={this.state.location} onChange={this.changelocationHandler}/>

                                            <label> Status: </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          InService
                      </option>
                      <option name="Status" className="form-control" >
                          OutOfService
                      </option>
                      <option name="Status" className="form-control" >
                          Maintenance
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateATM}>Save</button>
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

export default UpdateATMComponent
