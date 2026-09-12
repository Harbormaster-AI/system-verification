import React, { Component } from 'react'
import BranchService from '../services/BranchService'

class ViewBranchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            branch: {}
        }
    }

    componentDidMount(){
        BranchService.getBranchById(this.state.id).then( res => {
            this.setState({branch: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Branch Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.branch.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> branchCode:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.branch.branchCode }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> address:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.branch.address }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> phone:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.branch.phone }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> openingHours:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.branch.openingHours }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewBranchComponent
