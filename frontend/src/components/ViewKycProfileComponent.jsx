import React, { Component } from 'react'
import KycProfileService from '../services/KycProfileService'

class ViewKycProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            kycProfile: {}
        }
    }

    componentDidMount(){
        KycProfileService.getKycProfileById(this.state.id).then( res => {
            this.setState({kycProfile: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View KycProfile Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> profileId:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.kycProfile.profileId }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> lastReviewedOn:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.kycProfile.lastReviewedOn }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.kycProfile.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewKycProfileComponent
