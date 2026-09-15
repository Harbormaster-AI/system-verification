import React, { Component } from 'react'
import DeviceVendorService from '../services/DeviceVendorService'

class ViewDeviceVendorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            deviceVendor: {}
        }
    }

    componentDidMount(){
        DeviceVendorService.getDeviceVendorById(this.state.id).then( res => {
            this.setState({deviceVendor: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View DeviceVendor Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceVendor.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> legalName:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceVendor.legalName }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> headquartersCountry:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceVendor.headquartersCountry }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> website:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.deviceVendor.website }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewDeviceVendorComponent
