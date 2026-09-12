const { DataSource } = require('apollo-datasource');
const AccountAPI = require('./AccountDS');
const LoanAccountAPI = require('./LoanAccountDS');

class FeeChargeAPI extends DataSource {

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
  // find a FeeCharge
  //********************************************************************
  async find( id ) {
    return await this.store.feeCharge.findOne({ where: {id} });
  }

  //********************************************************************
  // add a FeeCharge
  //********************************************************************
  async add( { feeCode, amount, appliedOn, FeeType } ) {
    return await this.store.feeCharge.create( { feeCode, amount, appliedOn, FeeType } );
  }

  //********************************************************************
  // update a FeeCharge
  //********************************************************************
  async update( { feeCode, amount, appliedOn, FeeType, id } ) {
	await this.store.feeCharge.update( { feeCode, amount, appliedOn, FeeType }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a FeeCharge by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.feeCharge.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all FeeCharge
  //********************************************************************
  async findAll() {
    return await this.store.feeCharge.findAll();
  }


  //********************************************************************
  // adds a Account on a FeeCharge
  //returns this FeeCharge
  //********************************************************************
  async addAccount( feeChargeId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: feeChargeId}).then(feeCharge => {
    		  new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status  } ).then(account => {
    			  feeCharge.setAccount(account).then(() => {
				        resolve( feeCharge );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created account to Account 
  // on a FeeCharge
  //returns this FeeCharge
  //********************************************************************
  async assignToAccount( feeChargeId, accountId ) {
    return new Promise((resolve, reject) => {
	    this.find(feeChargeId).then(feeCharge => {
	    	new AccountAPI({store: this.store}).find( accountId ).then(account => {
    	        feeCharge.setAccount(account);
    	       resolve(feeCharge);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Account on a FeeCharge by setting it to null
  //returns this FeeCharge
  //********************************************************************				
  async unassignAccount( feeChargeId ) {
    return new Promise((resolve, reject) => {
	    this.find(feeChargeId).then(feeCharge => {
    	    feeCharge.setAccount(null);
    	    resolve(feeCharge);
        })
    })
  }
		

  //********************************************************************
  // adds a LoanAccount on a FeeCharge
  //returns this FeeCharge
  //********************************************************************
  async addLoanAccount( feeChargeId, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: feeChargeId}).then(feeCharge => {
    		  new LoanAccountAPI({store: this.store}).add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status  } ).then(loanAccount => {
    			  feeCharge.setLoanAccount(loanAccount).then(() => {
				        resolve( feeCharge );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created loanAccount to LoanAccount 
  // on a FeeCharge
  //returns this FeeCharge
  //********************************************************************
  async assignToLoanAccount( feeChargeId, loanAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(feeChargeId).then(feeCharge => {
	    	new LoanAccountAPI({store: this.store}).find( loanAccountId ).then(loanAccount => {
    	        feeCharge.setLoanAccount(loanAccount);
    	       resolve(feeCharge);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a LoanAccount on a FeeCharge by setting it to null
  //returns this FeeCharge
  //********************************************************************				
  async unassignLoanAccount( feeChargeId ) {
    return new Promise((resolve, reject) => {
	    this.find(feeChargeId).then(feeCharge => {
    	    feeCharge.setLoanAccount(null);
    	    resolve(feeCharge);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a FeeCharge
  //********************************************************************
  async saveHelper( feeCode, amount, appliedOn, FeeType )  {
    return await this.update( feeCode, amount, appliedOn, FeeType );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable feeCharge
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = FeeChargeAPI;
