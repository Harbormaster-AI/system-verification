import React, { Component } from 'react'
import CollateralService from '../services/CollateralService'

class ViewCollateralComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            collateral: {}
        }
    }

    componentDidMount(){
        CollateralService.getCollateralById(this.state.id).then( res => {
            this.setState({collateral: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Collateral Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> appraisedValue:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.collateral.appraisedValue }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> description:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.collateral.description }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> location:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.collateral.location }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> CollateralType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.collateral.collateralType }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewCollateralComponent
