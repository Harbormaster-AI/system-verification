import React, { Component } from 'react'
import TwinTemplateService from '../services/TwinTemplateService'

class ViewTwinTemplateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            twinTemplate: {}
        }
    }

    componentDidMount(){
        TwinTemplateService.getTwinTemplateById(this.state.id).then( res => {
            this.setState({twinTemplate: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View TwinTemplate Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.twinTemplate.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> schemaUri:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.twinTemplate.schemaUri }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> version:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.twinTemplate.version }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewTwinTemplateComponent
