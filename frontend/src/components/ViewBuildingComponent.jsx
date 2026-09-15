import React, { Component } from 'react'
import BuildingService from '../services/BuildingService'

class ViewBuildingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            building: {}
        }
    }

    componentDidMount(){
        BuildingService.getBuildingById(this.state.id).then( res => {
            this.setState({building: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Building Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.building.name }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewBuildingComponent
