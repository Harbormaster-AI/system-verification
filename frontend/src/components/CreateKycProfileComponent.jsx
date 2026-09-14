import React, { Component } from 'react'
import KycProfileService from '../services/KycProfileService';

class CreateKycProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                profileId: '',
                lastReviewedOn: '',
                status: ''
        }
        this.changeprofileIdHandler = this.changeprofileIdHandler.bind(this);
        this.changelastReviewedOnHandler = this.changelastReviewedOnHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            KycProfileService.getKycProfileById(this.state.id).then( (res) =>{
                let kycProfile = res.data;
                this.setState({
                    profileId: kycProfile.profileId,
                    lastReviewedOn: kycProfile.lastReviewedOn,
                    status: kycProfile.status
                });
            });
        }        
    }
    saveOrUpdateKycProfile = (e) => {
        e.preventDefault();
        let kycProfile = {
                kycProfileId: this.state.id,
                profileId: this.state.profileId,
                lastReviewedOn: this.state.lastReviewedOn,
                status: this.state.status
            };
        console.log('kycProfile => ' + JSON.stringify(kycProfile));

        // step 5
        if(this.state.id === '_add'){
            kycProfile.kycProfileId=''
            KycProfileService.createKycProfile(kycProfile).then(res =>{
                this.props.history.push('/kycProfiles');
            });
        }else{
            KycProfileService.updateKycProfile(kycProfile).then( res => {
                this.props.history.push('/kycProfiles');
            });
        }
    }
    
    changeprofileIdHandler= (event) => {
        this.setState({profileId: event.target.value});
    }
    changelastReviewedOnHandler= (event) => {
        this.setState({lastReviewedOn: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/kycProfiles');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add KycProfile</h3>
        }else{
            return <h3 className="text-center">Update KycProfile</h3>
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
                                            <label> profileId:&emsp; </label>
                                                <input placeholder="profileId" name="profileId" className="form-control" value={this.state.profileId} onChange={this.changeprofileIdHandler}/>

                                            <label> lastReviewedOn:&emsp; </label>
                                                <input type="date" placeholder="lastReviewedOn" name="lastReviewedOn" className="form-control" value={this.state.lastReviewedOn} onChange={this.changelastReviewedOnHandler}/>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Pending
                      </option>
                      <option name="Status" className="form-control" >
                          Verified
                      </option>
                      <option name="Status" className="form-control" >
                          Rejected
                      </option>
                      <option name="Status" className="form-control" >
                          Expired
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateKycProfile}>Save</button>
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

export default CreateKycProfileComponent
