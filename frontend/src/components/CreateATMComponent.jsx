import React, { Component } from 'react'
import ATMService from '../services/ATMService';

class CreateATMComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                terminalId: '',
                location: '',
                status: ''
        }
        this.changeterminalIdHandler = this.changeterminalIdHandler.bind(this);
        this.changelocationHandler = this.changelocationHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ATMService.getATMById(this.state.id).then( (res) =>{
                let aTM = res.data;
                this.setState({
                    terminalId: aTM.terminalId,
                    location: aTM.location,
                    status: aTM.status
                });
            });
        }        
    }
    saveOrUpdateATM = (e) => {
        e.preventDefault();
        let aTM = {
                aTMId: this.state.id,
                terminalId: this.state.terminalId,
                location: this.state.location,
                status: this.state.status
            };
        console.log('aTM => ' + JSON.stringify(aTM));

        // step 5
        if(this.state.id === '_add'){
            aTM.aTMId=''
            ATMService.createATM(aTM).then(res =>{
                this.props.history.push('/aTMs');
            });
        }else{
            ATMService.updateATM(aTM).then( res => {
                this.props.history.push('/aTMs');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add ATM</h3>
        }else{
            return <h3 className="text-center">Update ATM</h3>
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
                                            <label> terminalId:&emsp; </label>
                                                <input placeholder="terminalId" name="terminalId" className="form-control" value={this.state.terminalId} onChange={this.changeterminalIdHandler}/>

                                            <label> location:&emsp; </label>
                                                <input placeholder="location" name="location" className="form-control" value={this.state.location} onChange={this.changelocationHandler}/>

                                            <label> Status:&emsp; </label>
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

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateATM}>Save</button>
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

export default CreateATMComponent
