import React, { Component } from 'react'
import TwinTemplateService from '../services/TwinTemplateService';

class UpdateTwinTemplateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                schemaUri: '',
                version: ''
        }
        this.updateTwinTemplate = this.updateTwinTemplate.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeschemaUriHandler = this.changeschemaUriHandler.bind(this);
        this.changeversionHandler = this.changeversionHandler.bind(this);
    }

    componentDidMount(){
        TwinTemplateService.getTwinTemplateById(this.state.id).then( (res) =>{
            let twinTemplate = res.data;
            this.setState({
                name: twinTemplate.name,
                schemaUri: twinTemplate.schemaUri,
                version: twinTemplate.version
            });
        });
    }

    updateTwinTemplate = (e) => {
        e.preventDefault();
        let twinTemplate = {
            twinTemplateId: this.state.id,
            name: this.state.name,
            schemaUri: this.state.schemaUri,
            version: this.state.version
        };
        console.log('twinTemplate => ' + JSON.stringify(twinTemplate));
        console.log('id => ' + JSON.stringify(this.state.id));
        TwinTemplateService.updateTwinTemplate(twinTemplate).then( res => {
            this.props.history.push('/twinTemplates');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update TwinTemplate</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> schemaUri: </label>
                                                <input placeholder="schemaUri" name="schemaUri" className="form-control" value={this.state.schemaUri} onChange={this.changeschemaUriHandler}/>

                                            <label> version: </label>
                                                <input placeholder="version" name="version" className="form-control" value={this.state.version} onChange={this.changeversionHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateTwinTemplate}>Save</button>
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

export default UpdateTwinTemplateComponent
