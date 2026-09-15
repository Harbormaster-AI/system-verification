import React, { Component } from 'react'
import SoftwareUpdateExecutionService from '../services/SoftwareUpdateExecutionService'

class ListSoftwareUpdateExecutionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                softwareUpdateExecutions: []
        }
        this.addSoftwareUpdateExecution = this.addSoftwareUpdateExecution.bind(this);
        this.editSoftwareUpdateExecution = this.editSoftwareUpdateExecution.bind(this);
        this.deleteSoftwareUpdateExecution = this.deleteSoftwareUpdateExecution.bind(this);
    }

    deleteSoftwareUpdateExecution(id){
        SoftwareUpdateExecutionService.deleteSoftwareUpdateExecution(id).then( res => {
            this.setState({softwareUpdateExecutions: this.state.softwareUpdateExecutions.filter(softwareUpdateExecution => softwareUpdateExecution.softwareUpdateExecutionId !== id)});
        });
    }
    viewSoftwareUpdateExecution(id){
        this.props.history.push(`/view-softwareUpdateExecution/${id}`);
    }
    editSoftwareUpdateExecution(id){
        this.props.history.push(`/add-softwareUpdateExecution/${id}`);
    }

    componentDidMount(){
        SoftwareUpdateExecutionService.getSoftwareUpdateExecutions().then((res) => {
            this.setState({ softwareUpdateExecutions: res.data});
        });
    }

    addSoftwareUpdateExecution(){
        this.props.history.push('/add-softwareUpdateExecution/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">SoftwareUpdateExecution List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addSoftwareUpdateExecution}> Add SoftwareUpdateExecution</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> StartedAt </th>
                                    <th> CompletedAt </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.softwareUpdateExecutions.map(
                                        softwareUpdateExecution => 
                                        <tr key = {softwareUpdateExecution.softwareUpdateExecutionId}>
                                             <td> { softwareUpdateExecution.startedAt } </td>
                                             <td> { softwareUpdateExecution.completedAt } </td>
                                             <td> { softwareUpdateExecution.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editSoftwareUpdateExecution(softwareUpdateExecution.softwareUpdateExecutionId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSoftwareUpdateExecution(softwareUpdateExecution.softwareUpdateExecutionId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewSoftwareUpdateExecution(softwareUpdateExecution.softwareUpdateExecutionId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListSoftwareUpdateExecutionComponent
