import React, { Component } from 'react'
import FloorService from '../services/FloorService'

class ViewFloorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            floor: {}
        }
    }

    componentDidMount(){
        FloorService.getFloorById(this.state.id).then( res => {
            this.setState({floor: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Floor Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.floor.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> level:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.floor.level }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewFloorComponent
