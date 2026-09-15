import React, { Component } from 'react'
import SimCardService from '../services/SimCardService';

class UpdateSimCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                iccid: '',
                imsi: '',
                carrier: '',
                status: ''
        }
        this.updateSimCard = this.updateSimCard.bind(this);

        this.changeiccidHandler = this.changeiccidHandler.bind(this);
        this.changeimsiHandler = this.changeimsiHandler.bind(this);
        this.changecarrierHandler = this.changecarrierHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
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

    updateSimCard = (e) => {
        e.preventDefault();
        let simCard = {
            simCardId: this.state.id,
            iccid: this.state.iccid,
            imsi: this.state.imsi,
            carrier: this.state.carrier,
            status: this.state.status
        };
        console.log('simCard => ' + JSON.stringify(simCard));
        console.log('id => ' + JSON.stringify(this.state.id));
        SimCardService.updateSimCard(simCard).then( res => {
            this.props.history.push('/simCards');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update SimCard</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> iccid: </label>
                                                <input placeholder="iccid" name="iccid" className="form-control" value={this.state.iccid} onChange={this.changeiccidHandler}/>

                                            <label> imsi: </label>
                                                <input placeholder="imsi" name="imsi" className="form-control" value={this.state.imsi} onChange={this.changeimsiHandler}/>

                                            <label> carrier: </label>
                                                <input placeholder="carrier" name="carrier" className="form-control" value={this.state.carrier} onChange={this.changecarrierHandler}/>

                                            <label> Status: </label>
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
                                        <button className="btn btn-success" onClick={this.updateSimCard}>Save</button>
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

export default UpdateSimCardComponent
