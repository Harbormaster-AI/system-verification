import React, { Component } from 'react'
import ProvisioningRecordService from '../services/ProvisioningRecordService';

class UpdateProvisioningRecordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                enrolledAt: '',
                provisioningService: '',
                method: '',
                status: ''
        }
        this.updateProvisioningRecord = this.updateProvisioningRecord.bind(this);

        this.changeenrolledAtHandler = this.changeenrolledAtHandler.bind(this);
        this.changeprovisioningServiceHandler = this.changeprovisioningServiceHandler.bind(this);
        this.changeMethodHandler = this.changeMethodHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    componentDidMount(){
        ProvisioningRecordService.getProvisioningRecordById(this.state.id).then( (res) =>{
            let provisioningRecord = res.data;
            this.setState({
                enrolledAt: provisioningRecord.enrolledAt,
                provisioningService: provisioningRecord.provisioningService,
                method: provisioningRecord.method,
                status: provisioningRecord.status
            });
        });
    }

    updateProvisioningRecord = (e) => {
        e.preventDefault();
        let provisioningRecord = {
            provisioningRecordId: this.state.id,
            enrolledAt: this.state.enrolledAt,
            provisioningService: this.state.provisioningService,
            method: this.state.method,
            status: this.state.status
        };
        console.log('provisioningRecord => ' + JSON.stringify(provisioningRecord));
        console.log('id => ' + JSON.stringify(this.state.id));
        ProvisioningRecordService.updateProvisioningRecord(provisioningRecord).then( res => {
            this.props.history.push('/provisioningRecords');
        });
    }

    changeenrolledAtHandler= (event) => {
        this.setState({enrolledAt: event.target.value});
    }
    changeprovisioningServiceHandler= (event) => {
        this.setState({provisioningService: event.target.value});
    }
    changeMethodHandler= (event) => {
        this.setState({method: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/provisioningRecords');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update ProvisioningRecord</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> enrolledAt: </label>
                                                <input type="time" placeholder="enrolledAt" name="enrolledAt" className="form-control" value={this.state.enrolledAt} onChange={this.changeenrolledAtHandler}/>

                                            <label> provisioningService: </label>
                                                <input placeholder="provisioningService" name="provisioningService" className="form-control" value={this.state.provisioningService} onChange={this.changeprovisioningServiceHandler}/>

                                            <label> Method: </label>
                                                <select value={this.state.method} onChange={this.changeMethodHandler}>
                      <option name="Method" className="form-control" >
                          Manual
                      </option>
                      <option name="Method" className="form-control" >
                          JITP
                      </option>
                      <option name="Method" className="form-control" >
                          JITR
                      </option>
                      <option name="Method" className="form-control" >
                          Bulk
                      </option>
                      <option name="Method" className="form-control" >
                          ZeroTouch
                      </option>
                    </select>

                                            <label> Status: </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Pending
                      </option>
                      <option name="Status" className="form-control" >
                          Enrolled
                      </option>
                      <option name="Status" className="form-control" >
                          Failed
                      </option>
                      <option name="Status" className="form-control" >
                          Revoked
                      </option>
                    </select>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateProvisioningRecord}>Save</button>
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

export default UpdateProvisioningRecordComponent
