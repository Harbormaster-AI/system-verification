import React, { Component } from 'react'
import HardwareModuleService from '../services/HardwareModuleService'

class ListHardwareModuleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                hardwareModules: []
        }
        this.addHardwareModule = this.addHardwareModule.bind(this);
        this.editHardwareModule = this.editHardwareModule.bind(this);
        this.deleteHardwareModule = this.deleteHardwareModule.bind(this);
    }

    deleteHardwareModule(id){
        HardwareModuleService.deleteHardwareModule(id).then( res => {
            this.setState({hardwareModules: this.state.hardwareModules.filter(hardwareModule => hardwareModule.hardwareModuleId !== id)});
        });
    }
    viewHardwareModule(id){
        this.props.history.push(`/view-hardwareModule/${id}`);
    }
    editHardwareModule(id){
        this.props.history.push(`/add-hardwareModule/${id}`);
    }

    componentDidMount(){
        HardwareModuleService.getHardwareModules().then((res) => {
            this.setState({ hardwareModules: res.data});
        });
    }

    addHardwareModule(){
        this.props.history.push('/add-hardwareModule/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">HardwareModule List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addHardwareModule}> Add HardwareModule</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ModuleCode </th>
                                    <th> DatasheetUri </th>
                                    <th> ModuleType </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.hardwareModules.map(
                                        hardwareModule => 
                                        <tr key = {hardwareModule.hardwareModuleId}>
                                             <td> { hardwareModule.moduleCode } </td>
                                             <td> { hardwareModule.datasheetUri } </td>
                                             <td> { hardwareModule.moduleType } </td>
                                             <td>
                                                 <button onClick={ () => this.editHardwareModule(hardwareModule.hardwareModuleId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteHardwareModule(hardwareModule.hardwareModuleId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewHardwareModule(hardwareModule.hardwareModuleId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListHardwareModuleComponent
