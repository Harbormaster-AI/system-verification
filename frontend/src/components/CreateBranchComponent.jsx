import React, { Component } from 'react'
import BranchService from '../services/BranchService';

class CreateBranchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                name: '',
                branchCode: '',
                address: '',
                phone: '',
                openingHours: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changebranchCodeHandler = this.changebranchCodeHandler.bind(this);
        this.changeaddressHandler = this.changeaddressHandler.bind(this);
        this.changephoneHandler = this.changephoneHandler.bind(this);
        this.changeopeningHoursHandler = this.changeopeningHoursHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            BranchService.getBranchById(this.state.id).then( (res) =>{
                let branch = res.data;
                this.setState({
                    name: branch.name,
                    branchCode: branch.branchCode,
                    address: branch.address,
                    phone: branch.phone,
                    openingHours: branch.openingHours
                });
            });
        }        
    }
    saveOrUpdateBranch = (e) => {
        e.preventDefault();
        let branch = {
                branchId: this.state.id,
                name: this.state.name,
                branchCode: this.state.branchCode,
                address: this.state.address,
                phone: this.state.phone,
                openingHours: this.state.openingHours
            };
        console.log('branch => ' + JSON.stringify(branch));

        // step 5
        if(this.state.id === '_add'){
            branch.branchId=''
            BranchService.createBranch(branch).then(res =>{
                this.props.history.push('/branchs');
            });
        }else{
            BranchService.updateBranch(branch).then( res => {
                this.props.history.push('/branchs');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changebranchCodeHandler= (event) => {
        this.setState({branchCode: event.target.value});
    }
    changeaddressHandler= (event) => {
        this.setState({address: event.target.value});
    }
    changephoneHandler= (event) => {
        this.setState({phone: event.target.value});
    }
    changeopeningHoursHandler= (event) => {
        this.setState({openingHours: event.target.value});
    }

    cancel(){
        this.props.history.push('/branchs');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Branch</h3>
        }else{
            return <h3 className="text-center">Update Branch</h3>
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

                                            <label> branchCode:&emsp; </label>
                                                <input placeholder="branchCode" name="branchCode" className="form-control" value={this.state.branchCode} onChange={this.changebranchCodeHandler}/>

                                            <label> address:&emsp; </label>
                                                <input placeholder="address" name="address" className="form-control" value={this.state.address} onChange={this.changeaddressHandler}/>

                                            <label> phone:&emsp; </label>
                                                <input placeholder="phone" name="phone" className="form-control" value={this.state.phone} onChange={this.changephoneHandler}/>

                                            <label> openingHours:&emsp; </label>
                                                <input placeholder="openingHours" name="openingHours" className="form-control" value={this.state.openingHours} onChange={this.changeopeningHoursHandler}/>

                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveOrUpdateBranch}>Save</button>
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

export default CreateBranchComponent
