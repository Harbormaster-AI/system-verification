import React, { Component } from 'react'
import SiteService from '../services/SiteService'

class ListSiteComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                sites: []
        }
        this.addSite = this.addSite.bind(this);
        this.editSite = this.editSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
    }

    deleteSite(id){
        SiteService.deleteSite(id).then( res => {
            this.setState({sites: this.state.sites.filter(site => site.siteId !== id)});
        });
    }
    viewSite(id){
        this.props.history.push(`/view-site/${id}`);
    }
    editSite(id){
        this.props.history.push(`/add-site/${id}`);
    }

    componentDidMount(){
        SiteService.getSites().then((res) => {
            this.setState({ sites: res.data});
        });
    }

    addSite(){
        this.props.history.push('/add-site/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Site List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addSite}> Add Site</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> Address </th>
                                    <th> Timezone </th>
                                    <th> Latitude </th>
                                    <th> Longitude </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sites.map(
                                        site => 
                                        <tr key = {site.siteId}>
                                             <td> { site.name } </td>
                                             <td> { site.address } </td>
                                             <td> { site.timezone } </td>
                                             <td> { site.latitude } </td>
                                             <td> { site.longitude } </td>
                                             <td>
                                                 <button onClick={ () => this.editSite(site.siteId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSite(site.siteId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewSite(site.siteId)} className="btn btn-outline-info btn-sm">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListSiteComponent
