import React, { Component } from 'react'
import TwinTemplateService from '../services/TwinTemplateService';

class CreateTwinTemplateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                schemaUri: '',
                version: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeschemaUriHandler = this.changeschemaUriHandler.bind(this);
        this.changeversionHandler = this.changeversionHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            TwinTemplateService.getTwinTemplateById(this.state.id).then( (res) =>{
                let twinTemplate = res.data;
                this.setState({
                    name: twinTemplate.name,
                    schemaUri: twinTemplate.schemaUri,
                    version: twinTemplate.version
                });
            });
        }        
    }
    saveOrUpdateTwinTemplate = (e) => {
        e.preventDefault();
        let twinTemplate = {
                twinTemplateId: this.state.id,
                name: this.state.name,
                schemaUri: this.state.schemaUri,
                version: this.state.version
            };
        console.log('twinTemplate => ' + JSON.stringify(twinTemplate));

        // step 5
        if(this.state.id === '_add'){
            twinTemplate.twinTemplateId=''
            TwinTemplateService.createTwinTemplate(twinTemplate).then(res =>{
                this.props.history.push('/twinTemplates');
            });
        }else{
            TwinTemplateService.updateTwinTemplate(twinTemplate).then( res => {
                this.props.history.push('/twinTemplates');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeschemaUriHandler= (event) => {
        this.setState({schemaUri: event.target.value});
    }
    changeversionHandler= (event) => {
        this.setState({version: event.target.value});
    }

    cancel(){
        this.props.history.push('/twinTemplates');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add TwinTemplate</h3>
        }else{
            return <h3 className="text-center">Update TwinTemplate</h3>
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

                                            <label> schemaUri:&emsp; </label>
                                                <input placeholder="schemaUri" name="schemaUri" className="form-control" value={this.state.schemaUri} onChange={this.changeschemaUriHandler}/>

                                            <label> version:&emsp; </label>
                                                <input placeholder="version" name="version" className="form-control" value={this.state.version} onChange={this.changeversionHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateTwinTemplate}>Save</button>
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

export default CreateTwinTemplateComponent
