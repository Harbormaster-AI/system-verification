import React, { Component } from 'react'
import GatewayService from '../services/GatewayService';

class UpdateGatewayComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                softwareVersion: '',
                status: ''
        }
        this.updateGateway = this.updateGateway.bind(this);

        this.changesoftwareVersionHandler = this.changesoftwareVersionHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
        GatewayService.getGatewayById(this.state.id).then( (res) =>{
            let gateway = res.data;
            this.setState({
                softwareVersion: gateway.softwareVersion,
                status: gateway.status
            });
        });
    }

    updateGateway = (e) => {
        e.preventDefault();
        let gateway = {
            gatewayId: this.state.id,
            softwareVersion: this.state.softwareVersion,
            status: this.state.status
        };
        console.log('gateway => ' + JSON.stringify(gateway));
        console.log('id => ' + JSON.stringify(this.state.id));
        GatewayService.updateGateway(gateway).then( res => {
            this.props.history.push('/gateways');
        });
    }

    changesoftwareVersionHandler= (event) => {
        this.setState({softwareVersion: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/gateways');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Gateway</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> softwareVersion: </label>
                                                <input placeholder="softwareVersion" name="softwareVersion" className="form-control" value={this.state.softwareVersion} onChange={this.changesoftwareVersionHandler}/>

                                            <label> Status: </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Provisioning
                      </option>
                      <option name="Status" className="form-control" >
                          Active
                      </option>
                      <option name="Status" className="form-control" >
                          Suspended
                      </option>
                      <option name="Status" className="form-control" >
                          Offline
                      </option>
                      <option name="Status" className="form-control" >
                          Decommissioned
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateGateway}>Save</button>
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

export default UpdateGatewayComponent
