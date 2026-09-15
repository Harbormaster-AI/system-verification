import React, { Component } from 'react'
import TwinTemplateService from '../services/TwinTemplateService'

class ListTwinTemplateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                twinTemplates: []
        }
        this.addTwinTemplate = this.addTwinTemplate.bind(this);
        this.editTwinTemplate = this.editTwinTemplate.bind(this);
        this.deleteTwinTemplate = this.deleteTwinTemplate.bind(this);
    }

    deleteTwinTemplate(id){
        TwinTemplateService.deleteTwinTemplate(id).then( res => {
            this.setState({twinTemplates: this.state.twinTemplates.filter(twinTemplate => twinTemplate.twinTemplateId !== id)});
        });
    }
    viewTwinTemplate(id){
        this.props.history.push(`/view-twinTemplate/${id}`);
    }
    editTwinTemplate(id){
        this.props.history.push(`/add-twinTemplate/${id}`);
    }

    componentDidMount(){
        TwinTemplateService.getTwinTemplates().then((res) => {
            this.setState({ twinTemplates: res.data});
        });
    }

    addTwinTemplate(){
        this.props.history.push('/add-twinTemplate/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">TwinTemplate List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addTwinTemplate}> Add TwinTemplate</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> SchemaUri </th>
                                    <th> Version </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.twinTemplates.map(
                                        twinTemplate => 
                                        <tr key = {twinTemplate.twinTemplateId}>
                                             <td> { twinTemplate.name } </td>
                                             <td> { twinTemplate.schemaUri } </td>
                                             <td> { twinTemplate.version } </td>
                                             <td>
                                                 <button onClick={ () => this.editTwinTemplate(twinTemplate.twinTemplateId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTwinTemplate(twinTemplate.twinTemplateId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewTwinTemplate(twinTemplate.twinTemplateId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListTwinTemplateComponent
