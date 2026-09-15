import React, { Component } from 'react'
import DeviceGroupService from '../services/DeviceGroupService'

class ViewDeviceGroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            deviceGroup: {}
        }
    }

    componentDidMount(){
        DeviceGroupService.getDeviceGroupById(this.state.id).then( res => {
            this.setState({deviceGroup: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View DeviceGroup Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceGroup.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> criteria:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceGroup.criteria }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewDeviceGroupComponent
