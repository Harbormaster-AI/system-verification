import React, { Component } from 'react'
import DataRetentionPolicyService from '../services/DataRetentionPolicyService';

class UpdateDataRetentionPolicyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                retentionDays: ''
        }
        this.updateDataRetentionPolicy = this.updateDataRetentionPolicy.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeretentionDaysHandler = this.changeretentionDaysHandler.bind(this);
    }

    componentDidMount(){
        DataRetentionPolicyService.getDataRetentionPolicyById(this.state.id).then( (res) =>{
            let dataRetentionPolicy = res.data;
            this.setState({
                name: dataRetentionPolicy.name,
                retentionDays: dataRetentionPolicy.retentionDays
            });
        });
    }

    updateDataRetentionPolicy = (e) => {
        e.preventDefault();
        let dataRetentionPolicy = {
            dataRetentionPolicyId: this.state.id,
            name: this.state.name,
            retentionDays: this.state.retentionDays
        };
        console.log('dataRetentionPolicy => ' + JSON.stringify(dataRetentionPolicy));
        console.log('id => ' + JSON.stringify(this.state.id));
        DataRetentionPolicyService.updateDataRetentionPolicy(dataRetentionPolicy).then( res => {
            this.props.history.push('/dataRetentionPolicys');
        });
    }

    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeretentionDaysHandler= (event) => {
        this.setState({retentionDays: event.target.value});
    }

    cancel(){
        this.props.history.push('/dataRetentionPolicys');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update DataRetentionPolicy</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> retentionDays: </label>
                                                <input type="number" placeholder="retentionDays" name="retentionDays" className="form-control" value={this.state.retentionDays} onChange={this.changeretentionDaysHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateDataRetentionPolicy}>Save</button>
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

export default UpdateDataRetentionPolicyComponent
