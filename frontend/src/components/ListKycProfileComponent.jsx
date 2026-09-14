import React, { Component } from 'react'
import KycProfileService from '../services/KycProfileService'

class ListKycProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                kycProfiles: []
        }
        this.addKycProfile = this.addKycProfile.bind(this);
        this.editKycProfile = this.editKycProfile.bind(this);
        this.deleteKycProfile = this.deleteKycProfile.bind(this);
    }

    deleteKycProfile(id){
        KycProfileService.deleteKycProfile(id).then( res => {
            this.setState({kycProfiles: this.state.kycProfiles.filter(kycProfile => kycProfile.kycProfileId !== id)});
        });
    }
    viewKycProfile(id){
        this.props.history.push(`/view-kycProfile/${id}`);
    }
    editKycProfile(id){
        this.props.history.push(`/add-kycProfile/${id}`);
    }

    componentDidMount(){
        KycProfileService.getKycProfiles().then((res) => {
            this.setState({ kycProfiles: res.data});
        });
    }

    addKycProfile(){
        this.props.history.push('/add-kycProfile/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">KycProfile List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addKycProfile}> Add KycProfile</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ProfileId </th>
                                    <th> LastReviewedOn </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.kycProfiles.map(
                                        kycProfile => 
                                        <tr key = {kycProfile.kycProfileId}>
                                             <td> { kycProfile.profileId } </td>
                                             <td> { kycProfile.lastReviewedOn } </td>
                                             <td> { kycProfile.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editKycProfile(kycProfile.kycProfileId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteKycProfile(kycProfile.kycProfileId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewKycProfile(kycProfile.kycProfileId)} className="btn btn-outline-info btn-sm">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListKycProfileComponent
