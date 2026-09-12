const { DataSource } = require('apollo-datasource');
const BankAPI = require('./BankDS');
const AccountAPI = require('./AccountDS');
const LoanAccountAPI = require('./LoanAccountDS');
const ATMAPI = require('./ATMDS');

class BranchAPI extends DataSource {

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
  // find a Branch
  //********************************************************************
  async find( id ) {
    return await this.store.branch.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Branch
  //********************************************************************
  async add( { name, branchCode, address, phone, openingHours } ) {
    return await this.store.branch.create( { name, branchCode, address, phone, openingHours } );
  }

  //********************************************************************
  // update a Branch
  //********************************************************************
  async update( { name, branchCode, address, phone, openingHours, id } ) {
	await this.store.branch.update( { name, branchCode, address, phone, openingHours }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Branch by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.branch.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Branch
  //********************************************************************
  async findAll() {
    return await this.store.branch.findAll();
  }


  //********************************************************************
  // adds a Bank on a Branch
  //returns this Branch
  //********************************************************************
  async addBank( branchId, { name, legalName, swiftBic, headquartersCountry, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: branchId}).then(branch => {
    		  new BankAPI({store: this.store}).add( { name, legalName, swiftBic, headquartersCountry, website  } ).then(bank => {
    			  branch.setBank(bank).then(() => {
				        resolve( branch );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created bank to Bank 
  // on a Branch
  //returns this Branch
  //********************************************************************
  async assignToBank( branchId, bankId ) {
    return new Promise((resolve, reject) => {
	    this.find(branchId).then(branch => {
	    	new BankAPI({store: this.store}).find( bankId ).then(bank => {
    	        branch.setBank(bank);
    	       resolve(branch);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Bank on a Branch by setting it to null
  //returns this Branch
  //********************************************************************				
  async unassignBank( branchId ) {
    return new Promise((resolve, reject) => {
	    this.find(branchId).then(branch => {
    	    branch.setBank(null);
    	    resolve(branch);
        })
    })
  }
		


  //********************************************************************
  // adds a Account as the Accounts by first creating it 
  //returns this Branch
  //********************************************************************				
  async addToAccounts( branchId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(branchId).then(branch => {
		    new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then(account => {
		    	branch.addToAccounts(branch).then(() => {
			        resolve( branch );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more accountsIds as a Accounts 
  // to a Branch
  //returns this Branch
  //********************************************************************				
  async assignToAccounts( branchId, accountsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(branch => {
			var accountApi = new AccountAPI({store: this.store});
			branch.setAccounts([]).then((branch) => {			
				accountsIds.forEach(function (accountId, index) {
					accountApi.find({id: accountId}).then( foundAccount => {
						branch.addToAccounts(foundAccount);
					})
				})
				resolve(branch);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a LoanAccount as the LoanAccounts by first creating it 
  //returns this Branch
  //********************************************************************				
  async addToLoanAccounts( branchId, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(branchId).then(branch => {
		    new LoanAccountAPI({store: this.store}).add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then(loanAccount => {
		    	branch.addToLoanAccounts(branch).then(() => {
			        resolve( branch );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more loanAccountsIds as a LoanAccounts 
  // to a Branch
  //returns this Branch
  //********************************************************************				
  async assignToLoanAccounts( branchId, loanAccountsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(branch => {
			var loanAccountApi = new LoanAccountAPI({store: this.store});
			branch.setLoanAccounts([]).then((branch) => {			
				loanAccountsIds.forEach(function (loanAccountId, index) {
					loanAccountApi.find({id: loanAccountId}).then( foundLoanAccount => {
						branch.addToLoanAccounts(foundLoanAccount);
					})
				})
				resolve(branch);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a ATM as the Atms by first creating it 
  //returns this Branch
  //********************************************************************				
  async addToAtms( branchId, { terminalId, location, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(branchId).then(branch => {
		    new ATMAPI({store: this.store}).add( { terminalId, location, Status } ).then(aTM => {
		    	branch.addToAtms(branch).then(() => {
			        resolve( branch );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more atmsIds as a Atms 
  // to a Branch
  //returns this Branch
  //********************************************************************				
  async assignToAtms( branchId, atmsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(branch => {
			var aTMApi = new ATMAPI({store: this.store});
			branch.setAtms([]).then((branch) => {			
				atmsIds.forEach(function (aTMId, index) {
					aTMApi.find({id: aTMId}).then( foundATM => {
						branch.addToAtms(foundATM);
					})
				})
				resolve(branch);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a Branch
  //********************************************************************
  async saveHelper( name, branchCode, address, phone, openingHours )  {
    return await this.update( name, branchCode, address, phone, openingHours );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable branch
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = BranchAPI;
