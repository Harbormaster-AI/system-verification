import React, { Component } from 'react'
import AlertService from '../services/AlertService'

class ListAlertComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                alerts: []
        }
        this.addAlert = this.addAlert.bind(this);
        this.editAlert = this.editAlert.bind(this);
        this.deleteAlert = this.deleteAlert.bind(this);
    }

    deleteAlert(id){
        AlertService.deleteAlert(id).then( res => {
            this.setState({alerts: this.state.alerts.filter(alert => alert.alertId !== id)});
        });
    }
    viewAlert(id){
        this.props.history.push(`/view-alert/${id}`);
    }
    editAlert(id){
        this.props.history.push(`/add-alert/${id}`);
    }

    componentDidMount(){
        AlertService.getAlerts().then((res) => {
            this.setState({ alerts: res.data});
        });
    }

    addAlert(){
        this.props.history.push('/add-alert/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Alert List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addAlert}> Add Alert</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> RaisedAt </th>
                                    <th> ClearedAt </th>
                                    <th> Message </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.alerts.map(
                                        alert => 
                                        <tr key = {alert.alertId}>
                                             <td> { alert.raisedAt } </td>
                                             <td> { alert.clearedAt } </td>
                                             <td> { alert.message } </td>
                                             <td> { alert.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editAlert(alert.alertId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAlert(alert.alertId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewAlert(alert.alertId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListAlertComponent
