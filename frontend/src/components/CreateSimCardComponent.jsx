import React, { Component } from 'react'
import SimCardService from '../services/SimCardService';

class CreateSimCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                iccid: '',
                imsi: '',
                carrier: '',
                status: ''
        }
        this.changeiccidHandler = this.changeiccidHandler.bind(this);
        this.changeimsiHandler = this.changeimsiHandler.bind(this);
        this.changecarrierHandler = this.changecarrierHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            SimCardService.getSimCardById(this.state.id).then( (res) =>{
                let simCard = res.data;
                this.setState({
                    iccid: simCard.iccid,
                    imsi: simCard.imsi,
                    carrier: simCard.carrier,
                    status: simCard.status
                });
            });
        }        
    }
    saveOrUpdateSimCard = (e) => {
        e.preventDefault();
        let simCard = {
                simCardId: this.state.id,
                iccid: this.state.iccid,
                imsi: this.state.imsi,
                carrier: this.state.carrier,
                status: this.state.status
            };
        console.log('simCard => ' + JSON.stringify(simCard));

        // step 5
        if(this.state.id === '_add'){
            simCard.simCardId=''
            SimCardService.createSimCard(simCard).then(res =>{
                this.props.history.push('/simCards');
            });
        }else{
            SimCardService.updateSimCard(simCard).then( res => {
                this.props.history.push('/simCards');
            });
        }
    }
    
    changeiccidHandler= (event) => {
        this.setState({iccid: event.target.value});
    }
    changeimsiHandler= (event) => {
        this.setState({imsi: event.target.value});
    }
    changecarrierHandler= (event) => {
        this.setState({carrier: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/simCards');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add SimCard</h3>
        }else{
            return <h3 className="text-center">Update SimCard</h3>
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
                                            <label> iccid:&emsp; </label>
                                                <input placeholder="iccid" name="iccid" className="form-control" value={this.state.iccid} onChange={this.changeiccidHandler}/>

                                            <label> imsi:&emsp; </label>
                                                <input placeholder="imsi" name="imsi" className="form-control" value={this.state.imsi} onChange={this.changeimsiHandler}/>

                                            <label> carrier:&emsp; </label>
                                                <input placeholder="carrier" name="carrier" className="form-control" value={this.state.carrier} onChange={this.changecarrierHandler}/>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Active
                      </option>
                      <option name="Status" className="form-control" >
                          Suspended
                      </option>
                      <option name="Status" className="form-control" >
                          Retired
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateSimCard}>Save</button>
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

export default CreateSimCardComponent
