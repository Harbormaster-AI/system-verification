import React, { Component } from 'react'
import CollateralService from '../services/CollateralService';

class CreateCollateralComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                appraisedValue: '',
                description: '',
                location: '',
                collateralType: ''
        }
        this.changeappraisedValueHandler = this.changeappraisedValueHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.changelocationHandler = this.changelocationHandler.bind(this);
        this.changeCollateralTypeHandler = this.changeCollateralTypeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            CollateralService.getCollateralById(this.state.id).then( (res) =>{
                let collateral = res.data;
                this.setState({
                    appraisedValue: collateral.appraisedValue,
                    description: collateral.description,
                    location: collateral.location,
                    collateralType: collateral.collateralType
                });
            });
        }        
    }
    saveOrUpdateCollateral = (e) => {
        e.preventDefault();
        let collateral = {
                collateralId: this.state.id,
                appraisedValue: this.state.appraisedValue,
                description: this.state.description,
                location: this.state.location,
                collateralType: this.state.collateralType
            };
        console.log('collateral => ' + JSON.stringify(collateral));

        // step 5
        if(this.state.id === '_add'){
            collateral.collateralId=''
            CollateralService.createCollateral(collateral).then(res =>{
                this.props.history.push('/collaterals');
            });
        }else{
            CollateralService.updateCollateral(collateral).then( res => {
                this.props.history.push('/collaterals');
            });
        }
    }
    
    changeappraisedValueHandler= (event) => {
        this.setState({appraisedValue: event.target.value});
    }
    changedescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
    changelocationHandler= (event) => {
        this.setState({location: event.target.value});
    }
    changeCollateralTypeHandler= (event) => {
        this.setState({collateralType: event.target.value});
    }

    cancel(){
        this.props.history.push('/collaterals');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Collateral</h3>
        }else{
            return <h3 className="text-center">Update Collateral</h3>
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
                                            <label> appraisedValue:&emsp; </label>
                                                <input placeholder="appraisedValue" name="appraisedValue" className="form-control" value={this.state.appraisedValue} onChange={this.changeappraisedValueHandler}/>

                                            <label> description:&emsp; </label>
                                                <input placeholder="description" name="description" className="form-control" value={this.state.description} onChange={this.changedescriptionHandler}/>

                                            <label> location:&emsp; </label>
                                                <input placeholder="location" name="location" className="form-control" value={this.state.location} onChange={this.changelocationHandler}/>

                                            <label> CollateralType:&emsp; </label>
                                                <select value={this.state.collateralType} onChange={this.changeCollateralTypeHandler}>
                      <option name="CollateralType" className="form-control" >
                          RealEstate
                      </option>
                      <option name="CollateralType" className="form-control" >
                          Vehicle
                      </option>
                      <option name="CollateralType" className="form-control" >
                          Cash
                      </option>
                      <option name="CollateralType" className="form-control" >
                          Securities
                      </option>
                      <option name="CollateralType" className="form-control" >
                          Guarantee
                      </option>
                      <option name="CollateralType" className="form-control" >
                          Equipment
                      </option>
                    </select>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateCollateral}>Save</button>
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

export default CreateCollateralComponent
