import React, { Component } from 'react'
import DeviceGroupService from '../services/DeviceGroupService';

class UpdateDeviceGroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                criteria: ''
        }
        this.updateDeviceGroup = this.updateDeviceGroup.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changecriteriaHandler = this.changecriteriaHandler.bind(this);
    }

    componentDidMount(){
        DeviceGroupService.getDeviceGroupById(this.state.id).then( (res) =>{
            let deviceGroup = res.data;
            this.setState({
                name: deviceGroup.name,
                criteria: deviceGroup.criteria
            });
        });
    }

    updateDeviceGroup = (e) => {
        e.preventDefault();
        let deviceGroup = {
            deviceGroupId: this.state.id,
            name: this.state.name,
            criteria: this.state.criteria
        };
        console.log('deviceGroup => ' + JSON.stringify(deviceGroup));
        console.log('id => ' + JSON.stringify(this.state.id));
        DeviceGroupService.updateDeviceGroup(deviceGroup).then( res => {
            this.props.history.push('/deviceGroups');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changecriteriaHandler= (event) => {
        this.setState({criteria: event.target.value});
    }

    cancel(){
        this.props.history.push('/deviceGroups');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update DeviceGroup</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> criteria: </label>
                                                <input placeholder="criteria" name="criteria" className="form-control" value={this.state.criteria} onChange={this.changecriteriaHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateDeviceGroup}>Save</button>
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

export default UpdateDeviceGroupComponent
