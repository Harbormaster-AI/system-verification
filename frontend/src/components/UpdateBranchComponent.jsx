import React, { Component } from 'react'
import BranchService from '../services/BranchService';

class UpdateBranchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                name: '',
                branchCode: '',
                address: '',
                phone: '',
                openingHours: ''
        }
        this.updateBranch = this.updateBranch.bind(this);

        this.changenameHandler = this.changenameHandler.bind(this);
        this.changebranchCodeHandler = this.changebranchCodeHandler.bind(this);
        this.changeaddressHandler = this.changeaddressHandler.bind(this);
        this.changephoneHandler = this.changephoneHandler.bind(this);
        this.changeopeningHoursHandler = this.changeopeningHoursHandler.bind(this);
    }

    componentDidMount(){
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

    updateBranch = (e) => {
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
        console.log('id => ' + JSON.stringify(this.state.id));
        BranchService.updateBranch(branch).then( res => {
            this.props.history.push('/branchs');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Branch</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> name: </label>
                                                <input placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.changenameHandler}/>

                                            <label> branchCode: </label>
                                                <input placeholder="branchCode" name="branchCode" className="form-control" value={this.state.branchCode} onChange={this.changebranchCodeHandler}/>

                                            <label> address: </label>
                                                <input placeholder="address" name="address" className="form-control" value={this.state.address} onChange={this.changeaddressHandler}/>

                                            <label> phone: </label>
                                                <input placeholder="phone" name="phone" className="form-control" value={this.state.phone} onChange={this.changephoneHandler}/>

                                            <label> openingHours: </label>
                                                <input placeholder="openingHours" name="openingHours" className="form-control" value={this.state.openingHours} onChange={this.changeopeningHoursHandler}/>

                                        </div>
                                        <button className="btn btn-success" onClick={this.updateBranch}>Save</button>
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

export default UpdateBranchComponent
