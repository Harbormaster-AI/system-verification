import React, { Component } from 'react'
import EdgeApplicationService from '../services/EdgeApplicationService'

class ViewEdgeApplicationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            edgeApplication: {}
        }
    }

    componentDidMount(){
        EdgeApplicationService.getEdgeApplicationById(this.state.id).then( res => {
            this.setState({edgeApplication: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View EdgeApplication Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.edgeApplication.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> version:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.edgeApplication.version }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> image:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.edgeApplication.image }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Status:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.edgeApplication.status }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewEdgeApplicationComponent
