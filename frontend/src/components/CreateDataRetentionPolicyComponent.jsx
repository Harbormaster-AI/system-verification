import React, { Component } from 'react'
import DataRetentionPolicyService from '../services/DataRetentionPolicyService';

class CreateDataRetentionPolicyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                retentionDays: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeretentionDaysHandler = this.changeretentionDaysHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            DataRetentionPolicyService.getDataRetentionPolicyById(this.state.id).then( (res) =>{
                let dataRetentionPolicy = res.data;
                this.setState({
                    name: dataRetentionPolicy.name,
                    retentionDays: dataRetentionPolicy.retentionDays
                });
            });
        }        
    }
    saveOrUpdateDataRetentionPolicy = (e) => {
        e.preventDefault();
        let dataRetentionPolicy = {
                dataRetentionPolicyId: this.state.id,
                name: this.state.name,
                retentionDays: this.state.retentionDays
            };
        console.log('dataRetentionPolicy => ' + JSON.stringify(dataRetentionPolicy));

        // step 5
        if(this.state.id === '_add'){
            dataRetentionPolicy.dataRetentionPolicyId=''
            DataRetentionPolicyService.createDataRetentionPolicy(dataRetentionPolicy).then(res =>{
                this.props.history.push('/dataRetentionPolicys');
            });
        }else{
            DataRetentionPolicyService.updateDataRetentionPolicy(dataRetentionPolicy).then( res => {
                this.props.history.push('/dataRetentionPolicys');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add DataRetentionPolicy</h3>
        }else{
            return <h3 className="text-center">Update DataRetentionPolicy</h3>
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
                                            <label> name:&emsp; </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> retentionDays:&emsp; </label>
                                                <input type="number" placeholder="retentionDays" name="retentionDays" className="form-control" value={this.state.retentionDays} onChange={this.changeretentionDaysHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateDataRetentionPolicy}>Save</button>
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

export default CreateDataRetentionPolicyComponent
