import React, { Component } from 'react'
import StandingInstructionService from '../services/StandingInstructionService'

class ListStandingInstructionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                standingInstructions: []
        }
        this.addStandingInstruction = this.addStandingInstruction.bind(this);
        this.editStandingInstruction = this.editStandingInstruction.bind(this);
        this.deleteStandingInstruction = this.deleteStandingInstruction.bind(this);
    }

    deleteStandingInstruction(id){
        StandingInstructionService.deleteStandingInstruction(id).then( res => {
            this.setState({standingInstructions: this.state.standingInstructions.filter(standingInstruction => standingInstruction.standingInstructionId !== id)});
        });
    }
    viewStandingInstruction(id){
        this.props.history.push(`/view-standingInstruction/${id}`);
    }
    editStandingInstruction(id){
        this.props.history.push(`/add-standingInstruction/${id}`);
    }

    componentDidMount(){
        StandingInstructionService.getStandingInstructions().then((res) => {
            this.setState({ standingInstructions: res.data});
        });
    }

    addStandingInstruction(){
        this.props.history.push('/add-standingInstruction/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">StandingInstruction List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addStandingInstruction}> Add StandingInstruction</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> InstructionId </th>
                                    <th> Amount </th>
                                    <th> NextExecutionDate </th>
                                    <th> Frequency </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.standingInstructions.map(
                                        standingInstruction => 
                                        <tr key = {standingInstruction.standingInstructionId}>
                                             <td> { standingInstruction.instructionId } </td>
                                             <td> { standingInstruction.amount } </td>
                                             <td> { standingInstruction.nextExecutionDate } </td>
                                             <td> { standingInstruction.frequency } </td>
                                             <td> { standingInstruction.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editStandingInstruction(standingInstruction.standingInstructionId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStandingInstruction(standingInstruction.standingInstructionId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewStandingInstruction(standingInstruction.standingInstructionId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListStandingInstructionComponent
