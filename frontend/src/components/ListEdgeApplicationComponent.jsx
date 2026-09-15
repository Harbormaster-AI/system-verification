import React, { Component } from 'react'
import EdgeApplicationService from '../services/EdgeApplicationService'

class ListEdgeApplicationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                edgeApplications: []
        }
        this.addEdgeApplication = this.addEdgeApplication.bind(this);
        this.editEdgeApplication = this.editEdgeApplication.bind(this);
        this.deleteEdgeApplication = this.deleteEdgeApplication.bind(this);
    }

    deleteEdgeApplication(id){
        EdgeApplicationService.deleteEdgeApplication(id).then( res => {
            this.setState({edgeApplications: this.state.edgeApplications.filter(edgeApplication => edgeApplication.edgeApplicationId !== id)});
        });
    }
    viewEdgeApplication(id){
        this.props.history.push(`/view-edgeApplication/${id}`);
    }
    editEdgeApplication(id){
        this.props.history.push(`/add-edgeApplication/${id}`);
    }

    componentDidMount(){
        EdgeApplicationService.getEdgeApplications().then((res) => {
            this.setState({ edgeApplications: res.data});
        });
    }

    addEdgeApplication(){
        this.props.history.push('/add-edgeApplication/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">EdgeApplication List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addEdgeApplication}> Add EdgeApplication</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> Version </th>
                                    <th> Image </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.edgeApplications.map(
                                        edgeApplication => 
                                        <tr key = {edgeApplication.edgeApplicationId}>
                                             <td> { edgeApplication.name } </td>
                                             <td> { edgeApplication.version } </td>
                                             <td> { edgeApplication.image } </td>
                                             <td> { edgeApplication.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editEdgeApplication(edgeApplication.edgeApplicationId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEdgeApplication(edgeApplication.edgeApplicationId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEdgeApplication(edgeApplication.edgeApplicationId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListEdgeApplicationComponent
