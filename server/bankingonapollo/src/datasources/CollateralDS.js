const { DataSource } = require('apollo-datasource');
const LoanAccountAPI = require('./LoanAccountDS');

class CollateralAPI extends DataSource {

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
  // find a Collateral
  //********************************************************************
  async find( id ) {
    return await this.store.collateral.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Collateral
  //********************************************************************
  async add( { appraisedValue, description, location, CollateralType } ) {
    return await this.store.collateral.create( { appraisedValue, description, location, CollateralType } );
  }

  //********************************************************************
  // update a Collateral
  //********************************************************************
  async update( { appraisedValue, description, location, CollateralType, id } ) {
	await this.store.collateral.update( { appraisedValue, description, location, CollateralType }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Collateral by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.collateral.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Collateral
  //********************************************************************
  async findAll() {
    return await this.store.collateral.findAll();
  }


  //********************************************************************
  // adds a LoanAccount on a Collateral
  //returns this Collateral
  //********************************************************************
  async addLoanAccount( collateralId, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: collateralId}).then(collateral => {
    		  new LoanAccountAPI({store: this.store}).add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status  } ).then(loanAccount => {
    			  collateral.setLoanAccount(loanAccount).then(() => {
				        resolve( collateral );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created loanAccount to LoanAccount 
  // on a Collateral
  //returns this Collateral
  //********************************************************************
  async assignToLoanAccount( collateralId, loanAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(collateralId).then(collateral => {
	    	new LoanAccountAPI({store: this.store}).find( loanAccountId ).then(loanAccount => {
    	        collateral.setLoanAccount(loanAccount);
    	       resolve(collateral);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a LoanAccount on a Collateral by setting it to null
  //returns this Collateral
  //********************************************************************				
  async unassignLoanAccount( collateralId ) {
    return new Promise((resolve, reject) => {
	    this.find(collateralId).then(collateral => {
    	    collateral.setLoanAccount(null);
    	    resolve(collateral);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a Collateral
  //********************************************************************
  async saveHelper( appraisedValue, description, location, CollateralType )  {
    return await this.update( appraisedValue, description, location, CollateralType );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable collateral
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = CollateralAPI;
