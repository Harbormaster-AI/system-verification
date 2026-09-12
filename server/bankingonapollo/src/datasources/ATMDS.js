const { DataSource } = require('apollo-datasource');
const BranchAPI = require('./BranchDS');

class ATMAPI extends DataSource {

	//********************************************************************
	// general holder 
	//********************************************************************

	constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

    //********************************************************************
  // find a ATM
  //********************************************************************
  async find( id ) {
    return await this.store.aTM.findOne({ where: {id} });
  }

  //********************************************************************
  // add a ATM
  //********************************************************************
  async add( { terminalId, location, Status } ) {
    return await this.store.aTM.create( { terminalId, location, Status } );
  }

  //********************************************************************
  // update a ATM
  //********************************************************************
  async update( { terminalId, location, Status, id } ) {
	await this.store.aTM.update( { terminalId, location, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a ATM by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.aTM.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all ATM
  //********************************************************************
  async findAll() {
    return await this.store.aTM.findAll();
  }


  //********************************************************************
  // adds a Branch on a ATM
  //returns this ATM
  //********************************************************************
  async addBranch( aTMId, { name, branchCode, address, phone, openingHours } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: aTMId}).then(aTM => {
    		  new BranchAPI({store: this.store}).add( { name, branchCode, address, phone, openingHours  } ).then(branch => {
    			  aTM.setBranch(branch).then(() => {
				        resolve( aTM );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created branch to Branch 
  // on a ATM
  //returns this ATM
  //********************************************************************
  async assignToBranch( aTMId, branchId ) {
    return new Promise((resolve, reject) => {
	    this.find(aTMId).then(aTM => {
	    	new BranchAPI({store: this.store}).find( branchId ).then(branch => {
    	        aTM.setBranch(branch);
    	       resolve(aTM);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Branch on a ATM by setting it to null
  //returns this ATM
  //********************************************************************				
  async unassignBranch( aTMId ) {
    return new Promise((resolve, reject) => {
	    this.find(aTMId).then(aTM => {
    	    aTM.setBranch(null);
    	    resolve(aTM);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a ATM
  //********************************************************************
  async saveHelper( terminalId, location, Status )  {
    return await this.update( terminalId, location, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable aTM
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = ATMAPI;
