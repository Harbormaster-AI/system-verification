import React, { Component } from 'react'
import RiskAssessmentService from '../services/RiskAssessmentService'

class ListRiskAssessmentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                riskAssessments: []
        }
        this.addRiskAssessment = this.addRiskAssessment.bind(this);
        this.editRiskAssessment = this.editRiskAssessment.bind(this);
        this.deleteRiskAssessment = this.deleteRiskAssessment.bind(this);
    }

    deleteRiskAssessment(id){
        RiskAssessmentService.deleteRiskAssessment(id).then( res => {
            this.setState({riskAssessments: this.state.riskAssessments.filter(riskAssessment => riskAssessment.riskAssessmentId !== id)});
        });
    }
    viewRiskAssessment(id){
        this.props.history.push(`/view-riskAssessment/${id}`);
    }
    editRiskAssessment(id){
        this.props.history.push(`/add-riskAssessment/${id}`);
    }

    componentDidMount(){
        RiskAssessmentService.getRiskAssessments().then((res) => {
            this.setState({ riskAssessments: res.data});
        });
    }

    addRiskAssessment(){
        this.props.history.push('/add-riskAssessment/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">RiskAssessment List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addRiskAssessment}> Add RiskAssessment</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Score </th>
                                    <th> AssessedOn </th>
                                    <th> Rating </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.riskAssessments.map(
                                        riskAssessment => 
                                        <tr key = {riskAssessment.riskAssessmentId}>
                                             <td> { riskAssessment.score } </td>
                                             <td> { riskAssessment.assessedOn } </td>
                                             <td> { riskAssessment.rating } </td>
                                             <td>
                                                 <button onClick={ () => this.editRiskAssessment(riskAssessment.riskAssessmentId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteRiskAssessment(riskAssessment.riskAssessmentId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewRiskAssessment(riskAssessment.riskAssessmentId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListRiskAssessmentComponent
