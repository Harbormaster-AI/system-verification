import React, { Component } from 'react'
import ScreeningResultService from '../services/ScreeningResultService'

class ListScreeningResultComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                screeningResults: []
        }
        this.addScreeningResult = this.addScreeningResult.bind(this);
        this.editScreeningResult = this.editScreeningResult.bind(this);
        this.deleteScreeningResult = this.deleteScreeningResult.bind(this);
    }

    deleteScreeningResult(id){
        ScreeningResultService.deleteScreeningResult(id).then( res => {
            this.setState({screeningResults: this.state.screeningResults.filter(screeningResult => screeningResult.screeningResultId !== id)});
        });
    }
    viewScreeningResult(id){
        this.props.history.push(`/view-screeningResult/${id}`);
    }
    editScreeningResult(id){
        this.props.history.push(`/add-screeningResult/${id}`);
    }

    componentDidMount(){
        ScreeningResultService.getScreeningResults().then((res) => {
            this.setState({ screeningResults: res.data});
        });
    }

    addScreeningResult(){
        this.props.history.push('/add-screeningResult/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">ScreeningResult List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addScreeningResult}> Add ScreeningResult</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ScreeningDate </th>
                                    <th> Provider </th>
                                    <th> Outcome </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.screeningResults.map(
                                        screeningResult => 
                                        <tr key = {screeningResult.screeningResultId}>
                                             <td> { screeningResult.screeningDate } </td>
                                             <td> { screeningResult.provider } </td>
                                             <td> { screeningResult.outcome } </td>
                                             <td>
                                                 <button onClick={ () => this.editScreeningResult(screeningResult.screeningResultId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteScreeningResult(screeningResult.screeningResultId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewScreeningResult(screeningResult.screeningResultId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListScreeningResultComponent
