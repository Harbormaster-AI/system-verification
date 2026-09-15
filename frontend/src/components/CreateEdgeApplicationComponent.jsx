import React, { Component } from 'react'
import EdgeApplicationService from '../services/EdgeApplicationService';

class CreateEdgeApplicationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                version: '',
                image: '',
                status: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeversionHandler = this.changeversionHandler.bind(this);
        this.changeimageHandler = this.changeimageHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EdgeApplicationService.getEdgeApplicationById(this.state.id).then( (res) =>{
                let edgeApplication = res.data;
                this.setState({
                    name: edgeApplication.name,
                    version: edgeApplication.version,
                    image: edgeApplication.image,
                    status: edgeApplication.status
                });
            });
        }        
    }
    saveOrUpdateEdgeApplication = (e) => {
        e.preventDefault();
        let edgeApplication = {
                edgeApplicationId: this.state.id,
                name: this.state.name,
                version: this.state.version,
                image: this.state.image,
                status: this.state.status
            };
        console.log('edgeApplication => ' + JSON.stringify(edgeApplication));

        // step 5
        if(this.state.id === '_add'){
            edgeApplication.edgeApplicationId=''
            EdgeApplicationService.createEdgeApplication(edgeApplication).then(res =>{
                this.props.history.push('/edgeApplications');
            });
        }else{
            EdgeApplicationService.updateEdgeApplication(edgeApplication).then( res => {
                this.props.history.push('/edgeApplications');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeversionHandler= (event) => {
        this.setState({version: event.target.value});
    }
    changeimageHandler= (event) => {
        this.setState({image: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    cancel(){
        this.props.history.push('/edgeApplications');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add EdgeApplication</h3>
        }else{
            return <h3 className="text-center">Update EdgeApplication</h3>
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

                                            <label> version:&emsp; </label>
                                                <input placeholder="version" name="version" className="form-control" value={this.state.version} onChange={this.changeversionHandler}/>

                                            <label> image:&emsp; </label>
                                                <input placeholder="image" name="image" className="form-control" value={this.state.image} onChange={this.changeimageHandler}/>

                                            <label> Status:&emsp; </label>
                                                <select value={this.state.status} onChange={this.changeStatusHandler}>
                      <option name="Status" className="form-control" >
                          Pending
                      </option>
                      <option name="Status" className="form-control" >
                          Deploying
                      </option>
                      <option name="Status" className="form-control" >
                          Running
                      </option>
                      <option name="Status" className="form-control" >
                          Failed
                      </option>
                      <option name="Status" className="form-control" >
                          Stopped
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateEdgeApplication}>Save</button>
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

export default CreateEdgeApplicationComponent
