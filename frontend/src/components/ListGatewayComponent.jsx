import React, { Component } from 'react'
import GatewayService from '../services/GatewayService'

class ListGatewayComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                gateways: []
        }
        this.addGateway = this.addGateway.bind(this);
        this.editGateway = this.editGateway.bind(this);
        this.deleteGateway = this.deleteGateway.bind(this);
    }

    deleteGateway(id){
        GatewayService.deleteGateway(id).then( res => {
            this.setState({gateways: this.state.gateways.filter(gateway => gateway.gatewayId !== id)});
        });
    }
    viewGateway(id){
        this.props.history.push(`/view-gateway/${id}`);
    }
    editGateway(id){
        this.props.history.push(`/add-gateway/${id}`);
    }

    componentDidMount(){
        GatewayService.getGateways().then((res) => {
            this.setState({ gateways: res.data});
        });
    }

    addGateway(){
        this.props.history.push('/add-gateway/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Gateway List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addGateway}> Add Gateway</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> SoftwareVersion </th>
                                    <th> Status </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.gateways.map(
                                        gateway => 
                                        <tr key = {gateway.gatewayId}>
                                             <td> { gateway.softwareVersion } </td>
                                             <td> { gateway.status } </td>
                                             <td>
                                                 <button onClick={ () => this.editGateway(gateway.gatewayId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteGateway(gateway.gatewayId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewGateway(gateway.gatewayId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListGatewayComponent
