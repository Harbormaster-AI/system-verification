import React, { Component } from 'react'
import RiskAssessmentService from '../services/RiskAssessmentService';

class UpdateRiskAssessmentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                score: '',
                assessedOn: '',
                rating: ''
        }
        this.updateRiskAssessment = this.updateRiskAssessment.bind(this);

        this.changescoreHandler = this.changescoreHandler.bind(this);
        this.changeassessedOnHandler = this.changeassessedOnHandler.bind(this);
        this.changeRatingHandler = this.changeRatingHandler.bind(this);
    }

    componentDidMount(){
        RiskAssessmentService.getRiskAssessmentById(this.state.id).then( (res) =>{
            let riskAssessment = res.data;
            this.setState({
                score: riskAssessment.score,
                assessedOn: riskAssessment.assessedOn,
                rating: riskAssessment.rating
            });
        });
    }

    updateRiskAssessment = (e) => {
        e.preventDefault();
        let riskAssessment = {
            riskAssessmentId: this.state.id,
            score: this.state.score,
            assessedOn: this.state.assessedOn,
            rating: this.state.rating
        };
        console.log('riskAssessment => ' + JSON.stringify(riskAssessment));
        console.log('id => ' + JSON.stringify(this.state.id));
        RiskAssessmentService.updateRiskAssessment(riskAssessment).then( res => {
            this.props.history.push('/riskAssessments');
        });
    }

    changescoreHandler= (event) => {
        this.setState({score: event.target.value});
    }
    changeassessedOnHandler= (event) => {
        this.setState({assessedOn: event.target.value});
    }
    changeRatingHandler= (event) => {
        this.setState({rating: event.target.value});
    }

    cancel(){
        this.props.history.push('/riskAssessments');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update RiskAssessment</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> score: </label>
                                                <input type="number" placeholder="score" name="score" className="form-control" value={this.state.score} onChange={this.changescoreHandler}/>

                                            <label> assessedOn: </label>
                                                <input type="date" placeholder="assessedOn" name="assessedOn" className="form-control" value={this.state.assessedOn} onChange={this.changeassessedOnHandler}/>

                                            <label> Rating: </label>
                                                <select value={this.state.rating} onChange={this.changeRatingHandler}>
                      <option name="Rating" className="form-control" >
                          Low
                      </option>
                      <option name="Rating" className="form-control" >
                          Medium
                      </option>
                      <option name="Rating" className="form-control" >
                          High
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateRiskAssessment}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateRiskAssessmentComponent
