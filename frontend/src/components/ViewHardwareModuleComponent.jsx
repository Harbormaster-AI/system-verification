import React, { Component } from 'react'
import HardwareModuleService from '../services/HardwareModuleService'

class ViewHardwareModuleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            hardwareModule: {}
        }
    }

    componentDidMount(){
        HardwareModuleService.getHardwareModuleById(this.state.id).then( res => {
            this.setState({hardwareModule: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View HardwareModule Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> moduleCode:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.hardwareModule.moduleCode }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> datasheetUri:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.hardwareModule.datasheetUri }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> ModuleType:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.hardwareModule.moduleType }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewHardwareModuleComponent
