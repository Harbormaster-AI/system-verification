import React, { Component } from 'react'
import FeeChargeService from '../services/FeeChargeService'

class ViewFeeChargeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            feeCharge: {}
        }
    }

    componentDidMount(){
        FeeChargeService.getFeeChargeById(this.state.id).then( res => {
            this.setState({feeCharge: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View FeeCharge Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> feeCode:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.feeCharge.feeCode }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> amount:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.feeCharge.amount }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> appliedOn:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.feeCharge.appliedOn }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> FeeType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.feeCharge.feeType }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewFeeChargeComponent
