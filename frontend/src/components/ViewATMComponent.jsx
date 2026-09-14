import React, { Component } from 'react'
import ATMService from '../services/ATMService'

class ViewATMComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            aTM: {}
        }
    }

    componentDidMount(){
        ATMService.getATMById(this.state.id).then( res => {
            this.setState({aTM: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View ATM Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> terminalId:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.aTM.terminalId }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> location:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.aTM.location }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.aTM.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewATMComponent
