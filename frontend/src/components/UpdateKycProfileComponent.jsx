import React, { Component } from 'react'
import KycProfileService from '../services/KycProfileService';

class UpdateKycProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                profileId: '',
                lastReviewedOn: '',
                status: ''
        }
        this.updateKycProfile = this.updateKycProfile.bind(this);

        this.changeprofileIdHandler = this.changeprofileIdHandler.bind(this);
        this.changelastReviewedOnHandler = this.changelastReviewedOnHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
        KycProfileService.getKycProfileById(this.state.id).then( (res) =>{
            let kycProfile = res.data;
            this.setState({
                profileId: kycProfile.profileId,
                lastReviewedOn: kycProfile.lastReviewedOn,
                status: kycProfile.status
            });
        });
    }

    updateKycProfile = (e) => {
        e.preventDefault();
        let kycProfile = {
            kycProfileId: this.state.id,
            profileId: this.state.profileId,
            lastReviewedOn: this.state.lastReviewedOn,
            status: this.state.status
        };
        console.log('kycProfile => ' + JSON.stringify(kycProfile));
        console.log('id => ' + JSON.stringify(this.state.id));
        KycProfileService.updateKycProfile(kycProfile).then( res => {
            this.props.history.push('/kycProfiles');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update KycProfile</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> profileId: </label>
                                                <input placeholder="profileId" name="profileId" className="form-control" value={this.state.profileId} onChange={this.changeprofileIdHandler}/>

                                            <label> lastReviewedOn: </label>
                                                <input type="date" placeholder="lastReviewedOn" name="lastReviewedOn" className="form-control" value={this.state.lastReviewedOn} onChange={this.changelastReviewedOnHandler}/>

                                            <label> Status: </label>
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
                                        <button className="btn btn-success" onClick={this.updateKycProfile}>Save</button>
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

export default UpdateKycProfileComponent
