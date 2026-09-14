import React, { Component } from 'react'
import ThirdPartyProviderService from '../services/ThirdPartyProviderService'

class ListThirdPartyProviderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                thirdPartyProviders: []
        }
        this.addThirdPartyProvider = this.addThirdPartyProvider.bind(this);
        this.editThirdPartyProvider = this.editThirdPartyProvider.bind(this);
        this.deleteThirdPartyProvider = this.deleteThirdPartyProvider.bind(this);
    }

    deleteThirdPartyProvider(id){
        ThirdPartyProviderService.deleteThirdPartyProvider(id).then( res => {
            this.setState({thirdPartyProviders: this.state.thirdPartyProviders.filter(thirdPartyProvider => thirdPartyProvider.thirdPartyProviderId !== id)});
        });
    }
    viewThirdPartyProvider(id){
        this.props.history.push(`/view-thirdPartyProvider/${id}`);
    }
    editThirdPartyProvider(id){
        this.props.history.push(`/add-thirdPartyProvider/${id}`);
    }

    componentDidMount(){
        ThirdPartyProviderService.getThirdPartyProviders().then((res) => {
            this.setState({ thirdPartyProviders: res.data});
        });
    }

    addThirdPartyProvider(){
        this.props.history.push('/add-thirdPartyProvider/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">ThirdPartyProvider List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addThirdPartyProvider}> Add ThirdPartyProvider</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> RegistrationId </th>
                                    <th> Website </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.thirdPartyProviders.map(
                                        thirdPartyProvider => 
                                        <tr key = {thirdPartyProvider.thirdPartyProviderId}>
                                             <td> { thirdPartyProvider.name } </td>
                                             <td> { thirdPartyProvider.registrationId } </td>
                                             <td> { thirdPartyProvider.website } </td>
                                             <td>
                                                 <button onClick={ () => this.editThirdPartyProvider(thirdPartyProvider.thirdPartyProviderId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteThirdPartyProvider(thirdPartyProvider.thirdPartyProviderId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewThirdPartyProvider(thirdPartyProvider.thirdPartyProviderId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListThirdPartyProviderComponent
