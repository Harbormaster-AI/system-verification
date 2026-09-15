import React, { Component } from 'react'
import AlertRuleService from '../services/AlertRuleService'

class ListAlertRuleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                alertRules: []
        }
        this.addAlertRule = this.addAlertRule.bind(this);
        this.editAlertRule = this.editAlertRule.bind(this);
        this.deleteAlertRule = this.deleteAlertRule.bind(this);
    }

    deleteAlertRule(id){
        AlertRuleService.deleteAlertRule(id).then( res => {
            this.setState({alertRules: this.state.alertRules.filter(alertRule => alertRule.alertRuleId !== id)});
        });
    }
    viewAlertRule(id){
        this.props.history.push(`/view-alertRule/${id}`);
    }
    editAlertRule(id){
        this.props.history.push(`/add-alertRule/${id}`);
    }

    componentDidMount(){
        AlertRuleService.getAlertRules().then((res) => {
            this.setState({ alertRules: res.data});
        });
    }

    addAlertRule(){
        this.props.history.push('/add-alertRule/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">AlertRule List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addAlertRule}> Add AlertRule</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> Expression </th>
                                    <th> Severity </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.alertRules.map(
                                        alertRule => 
                                        <tr key = {alertRule.alertRuleId}>
                                             <td> { alertRule.name } </td>
                                             <td> { alertRule.expression } </td>
                                             <td> { alertRule.severity } </td>
                                             <td>
                                                 <button onClick={ () => this.editAlertRule(alertRule.alertRuleId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAlertRule(alertRule.alertRuleId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewAlertRule(alertRule.alertRuleId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListAlertRuleComponent
