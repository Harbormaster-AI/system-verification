import React, { Component } from 'react'
import SimCardService from '../services/SimCardService'

class ViewSimCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            simCard: {}
        }
    }

    componentDidMount(){
        SimCardService.getSimCardById(this.state.id).then( res => {
            this.setState({simCard: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View SimCard Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> iccid:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.simCard.iccid }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> imsi:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.simCard.imsi }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> carrier:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.simCard.carrier }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.simCard.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSimCardComponent
