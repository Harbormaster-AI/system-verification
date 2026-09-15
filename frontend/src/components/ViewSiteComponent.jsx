import React, { Component } from 'react'
import SiteService from '../services/SiteService'

class ViewSiteComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            site: {}
        }
    }

    componentDidMount(){
        SiteService.getSiteById(this.state.id).then( res => {
            this.setState({site: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Site Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> name:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.site.name }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> address:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.site.address }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> timezone:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.site.timezone }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> latitude:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.site.latitude }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> longitude:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.site.longitude }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSiteComponent
