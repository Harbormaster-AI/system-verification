import React, { Component } from 'react'
import CollateralService from '../services/CollateralService'

class ListCollateralComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                collaterals: []
        }
        this.addCollateral = this.addCollateral.bind(this);
        this.editCollateral = this.editCollateral.bind(this);
        this.deleteCollateral = this.deleteCollateral.bind(this);
    }

    deleteCollateral(id){
        CollateralService.deleteCollateral(id).then( res => {
            this.setState({collaterals: this.state.collaterals.filter(collateral => collateral.collateralId !== id)});
        });
    }
    viewCollateral(id){
        this.props.history.push(`/view-collateral/${id}`);
    }
    editCollateral(id){
        this.props.history.push(`/add-collateral/${id}`);
    }

    componentDidMount(){
        CollateralService.getCollaterals().then((res) => {
            this.setState({ collaterals: res.data});
        });
    }

    addCollateral(){
        this.props.history.push('/add-collateral/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Collateral List</h2>
                 <div className = "row">
                    <button className="btn btn-primary btn-sm" onClick={this.addCollateral}> Add Collateral</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> AppraisedValue </th>
                                    <th> Description </th>
                                    <th> Location </th>
                                    <th> CollateralType </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.collaterals.map(
                                        collateral => 
                                        <tr key = {collateral.collateralId}>
                                             <td> { collateral.appraisedValue } </td>
                                             <td> { collateral.description } </td>
                                             <td> { collateral.location } </td>
                                             <td> { collateral.collateralType } </td>
                                             <td>
                                                 <button onClick={ () => this.editCollateral(collateral.collateralId)} className="btn btn-outlie-info btn-sm">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCollateral(collateral.collateralId)} className="btn btn-danger btn-sm">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCollateral(collateral.collateralId)} className="btn btn-outline-info btn-sm">View </button>
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

export default ListCollateralComponent
