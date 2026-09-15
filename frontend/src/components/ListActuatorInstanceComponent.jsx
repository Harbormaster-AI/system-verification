import React, { Component } from 'react'
import ActuatorInstanceService from '../services/ActuatorInstanceService'

class ListActuatorInstanceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                actuatorInstances: []
        }
        this.addActuatorInstance = this.addActuatorInstance.bind(this);
        this.editActuatorInstance = this.editActuatorInstance.bind(this);
        this.deleteActuatorInstance = this.deleteActuatorInstance.bind(this);
    }

    deleteActuatorInstance(id){
        ActuatorInstanceService.deleteActuatorInstance(id).then( res => {
            this.setState({actuatorInstances: this.state.actuatorInstances.filter(actuatorInstance => actuatorInstance.actuatorInstanceId !== id)});
        });
    }
    viewActuatorInstance(id){
        this.props.history.push(`/view-actuatorInstance/${id}`);
    }
    editActuatorInstance(id){
        this.props.history.push(`/add-actuatorInstance/${id}`);
    }

    componentDidMount(){
        ActuatorInstanceService.getActuatorInstances().then((res) => {
            this.setState({ actuatorInstances: res.data});
        });
    }

    addActuatorInstance(){
        this.props.history.push('/add-actuatorInstance/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">ActuatorInstance List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addActuatorInstance}> Add ActuatorInstance</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> CommandTopic </th>
                                    <th> ActuatorType </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.actuatorInstances.map(
                                        actuatorInstance => 
                                        <tr key = {actuatorInstance.actuatorInstanceId}>
                                             <td> { actuatorInstance.name } </td>
                                             <td> { actuatorInstance.commandTopic } </td>
                                             <td> { actuatorInstance.actuatorType } </td>
                                             <td>
                                                 <button onClick={ () => this.editActuatorInstance(actuatorInstance.actuatorInstanceId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteActuatorInstance(actuatorInstance.actuatorInstanceId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewActuatorInstance(actuatorInstance.actuatorInstanceId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListActuatorInstanceComponent
