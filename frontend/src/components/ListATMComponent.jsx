import React, { Component } from 'react'
import ATMService from '../services/ATMService'

class ListATMComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                aTMs: []
        }
        this.addATM = this.addATM.bind(this);
        this.editATM = this.editATM.bind(this);
        this.deleteATM = this.deleteATM.bind(this);
    }

    deleteATM(id){
        ATMService.deleteATM(id).then( res => {
            this.setState({aTMs: this.state.aTMs.filter(aTM => aTM.aTMId !== id)});
        });
    }
    viewATM(id){
        this.props.history.push(`/view-aTM/${id}`);
    }
    editATM(id){
        this.props.history.push(`/add-aTM/${id}`);
    }

    componentDidMount(){
        ATMService.getATMs().then((res) => {
            this.setState({ aTMs: res.data});
        });
    }

    addATM(){
        this.props.history.push('/add-aTM/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">ATM List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addATM}> Add ATM</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> TerminalId </th>
                                    <th> Location </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.aTMs.map(
                                        aTM => 
                                        <tr key = {aTM.aTMId}>
                                             <td> { aTM.terminalId } </td>
                                             <td> { aTM.location } </td>
                                             <td> { aTM.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editATM(aTM.aTMId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteATM(aTM.aTMId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewATM(aTM.aTMId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListATMComponent
