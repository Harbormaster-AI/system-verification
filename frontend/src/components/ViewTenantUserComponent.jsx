import React, { Component } from 'react'
import TenantUserService from '../services/TenantUserService'

class ViewTenantUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            tenantUser: {}
        }
    }

    componentDidMount(){
        TenantUserService.getTenantUserById(this.state.id).then( res => {
            this.setState({tenantUser: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View TenantUser Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> firstName:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.tenantUser.firstName }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> lastName:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.tenantUser.lastName }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> email:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.tenantUser.email }</div>
                        </div>
                        <div className = "row">
                            <div className = "col" style={{textAlign:"right"}}><label> Role:&emsp; </label></div>
                            <div className = "col" style={{textAlign:"left"}}> { this.state.tenantUser.role }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewTenantUserComponent
