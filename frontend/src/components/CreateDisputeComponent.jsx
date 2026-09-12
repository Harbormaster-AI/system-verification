import React, { Component } from 'react'
import DisputeService from '../services/DisputeService';

class CreateDisputeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                disputeReference: '',
                raisedOn: '',
                reason: '',
                status: ''
        }
        this.changedisputeReferenceHandler = this.changedisputeReferenceHandler.bind(this);
        this.changeraisedOnHandler = this.changeraisedOnHandler.bind(this);
        this.changereasonHandler = this.changereasonHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            DisputeService.getDisputeById(this.state.id).then( (res) =>{
                let dispute = res.data;
                this.setState({
                    disputeReference: dispute.disputeReference,
                    raisedOn: dispute.raisedOn,
                    reason: dispute.reason,
                    status: dispute.status
                });
            });
        }        
    }
    saveOrUpdateDispute = (e) => {
        e.preventDefault();
        let dispute = {
                disputeId: this.state.id,
                disputeReference: this.state.disputeReference,
                raisedOn: this.state.raisedOn,
                reason: this.state.reason,
                status: this.state.status
            };
        console.log('dispute => ' + JSON.stringify(dispute));

        // step 5
        if(this.state.id === '_add'){
            dispute.disputeId=''
            DisputeService.createDispute(dispute).then(res =>{
                this.props.history.push('/disputes');
            });
        }else{
            DisputeService.updateDispute(dispute).then( res => {
                this.props.history.push('/disputes');
            });
        }
    }
    
    changedisputeReferenceHandler= (event) => {
        this.setState({disputeReference: event.target.value});
    }
    changeraisedOnHandler= (event) => {
        this.setState({raisedOn: event.target.value});
    }
    changereasonHandler= (event) => {
        this.setState({reason: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/disputes');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Dispute</h3>
        }else{
            return <h3 className="text-center">Update Dispute</h3>
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
                                            <label> disputeReference:&emsp; </label>
                                                <input placeholder="disputeReference" name="disputeReference" className="form-control" value={this.state.disputeReference} onChange={this.changedisputeReferenceHandler}/>

                                            <label> raisedOn:&emsp; </label>
                                                <input type="date" placeholder="raisedOn" name="raisedOn" className="form-control" value={this.state.raisedOn} onChange={this.changeraisedOnHandler}/>

                                            <label> reason:&emsp; </label>
                                                <input placeholder="reason" name="reason" className="form-control" value={this.state.reason} onChange={this.changereasonHandler}/>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Open
                      </option>
                      <option name="Status" className="form-control" >
                          UnderReview
                      </option>
                      <option name="Status" className="form-control" >
                          Resolved
                      </option>
                      <option name="Status" className="form-control" >
                          Rejected
                      </option>
                      <option name="Status" className="form-control" >
                          Withdrawn
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateDispute}>Save</button>
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

export default CreateDisputeComponent
