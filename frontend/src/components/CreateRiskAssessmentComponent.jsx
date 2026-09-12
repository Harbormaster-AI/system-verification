import React, { Component } from 'react'
import RiskAssessmentService from '../services/RiskAssessmentService';

class CreateRiskAssessmentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                score: '',
                assessedOn: '',
                rating: ''
        }
        this.changescoreHandler = this.changescoreHandler.bind(this);
        this.changeassessedOnHandler = this.changeassessedOnHandler.bind(this);
        this.changeRatingHandler = this.changeRatingHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            RiskAssessmentService.getRiskAssessmentById(this.state.id).then( (res) =>{
                let riskAssessment = res.data;
                this.setState({
                    score: riskAssessment.score,
                    assessedOn: riskAssessment.assessedOn,
                    rating: riskAssessment.rating
                });
            });
        }        
    }
    saveOrUpdateRiskAssessment = (e) => {
        e.preventDefault();
        let riskAssessment = {
                riskAssessmentId: this.state.id,
                score: this.state.score,
                assessedOn: this.state.assessedOn,
                rating: this.state.rating
            };
        console.log('riskAssessment => ' + JSON.stringify(riskAssessment));

        // step 5
        if(this.state.id === '_add'){
            riskAssessment.riskAssessmentId=''
            RiskAssessmentService.createRiskAssessment(riskAssessment).then(res =>{
                this.props.history.push('/riskAssessments');
            });
        }else{
            RiskAssessmentService.updateRiskAssessment(riskAssessment).then( res => {
                this.props.history.push('/riskAssessments');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add RiskAssessment</h3>
        }else{
            return <h3 className="text-center">Update RiskAssessment</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> score:&emsp; </label>
                                                <input type="number" placeholder="score" name="score" className="form-control" value={this.state.score} onChange={this.changescoreHandler}/>

                                            <label> assessedOn:&emsp; </label>
                                                <input type="date" placeholder="assessedOn" name="assessedOn" className="form-control" value={this.state.assessedOn} onChange={this.changeassessedOnHandler}/>

                                            <label> Rating:&emsp; </label>
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

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateRiskAssessment}>Save</button>
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

export default CreateRiskAssessmentComponent
