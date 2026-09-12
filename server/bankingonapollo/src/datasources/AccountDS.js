const { DataSource } = require('apollo-datasource');
const BankAPI = require('./BankDS');
const BranchAPI = require('./BranchDS');
const BankingProductAPI = require('./BankingProductDS');
const CustomerAPI = require('./CustomerDS');
const TransactionAPI = require('./TransactionDS');
const AccountStatementAPI = require('./AccountStatementDS');
const StandingInstructionAPI = require('./StandingInstructionDS');
const FeeChargeAPI = require('./FeeChargeDS');

class AccountAPI extends DataSource {

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
  // find a Account
  //********************************************************************
  async find( id ) {
    return await this.store.account.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Account
  //********************************************************************
  async add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
    return await this.store.account.create( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } );
  }

  //********************************************************************
  // update a Account
  //********************************************************************
  async update( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status, id } ) {
	await this.store.account.update( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Account by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.account.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Account
  //********************************************************************
  async findAll() {
    return await this.store.account.findAll();
  }


  //********************************************************************
  // adds a Bank on a Account
  //returns this Account
  //********************************************************************
  async addBank( accountId, { name, legalName, swiftBic, headquartersCountry, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: accountId}).then(account => {
    		  new BankAPI({store: this.store}).add( { name, legalName, swiftBic, headquartersCountry, website  } ).then(bank => {
    			  account.setBank(bank).then(() => {
				        resolve( account );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created bank to Bank 
  // on a Account
  //returns this Account
  //********************************************************************
  async assignToBank( accountId, bankId ) {
    return new Promise((resolve, reject) => {
	    this.find(accountId).then(account => {
	    	new BankAPI({store: this.store}).find( bankId ).then(bank => {
    	        account.setBank(bank);
    	       resolve(account);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Bank on a Account by setting it to null
  //returns this Account
  //********************************************************************				
  async unassignBank( accountId ) {
    return new Promise((resolve, reject) => {
	    this.find(accountId).then(account => {
    	    account.setBank(null);
    	    resolve(account);
        })
    })
  }
		

  //********************************************************************
  // adds a Branch on a Account
  //returns this Account
  //********************************************************************
  async addBranch( accountId, { name, branchCode, address, phone, openingHours } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: accountId}).then(account => {
    		  new BranchAPI({store: this.store}).add( { name, branchCode, address, phone, openingHours  } ).then(branch => {
    			  account.setBranch(branch).then(() => {
				        resolve( account );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created branch to Branch 
  // on a Account
  //returns this Account
  //********************************************************************
  async assignToBranch( accountId, branchId ) {
    return new Promise((resolve, reject) => {
	    this.find(accountId).then(account => {
	    	new BranchAPI({store: this.store}).find( branchId ).then(branch => {
    	        account.setBranch(branch);
    	       resolve(account);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Branch on a Account by setting it to null
  //returns this Account
  //********************************************************************				
  async unassignBranch( accountId ) {
    return new Promise((resolve, reject) => {
	    this.find(accountId).then(account => {
    	    account.setBranch(null);
    	    resolve(account);
        })
    })
  }
		

  //********************************************************************
  // adds a Product on a Account
  //returns this Account
  //********************************************************************
  async addProduct( accountId, { productCode, name, description, ProductCategory } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: accountId}).then(account => {
    		  new BankingProductAPI({store: this.store}).add( { productCode, name, description, ProductCategory  } ).then(bankingProduct => {
    			  account.setProduct(bankingProduct).then(() => {
				        resolve( account );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created product to Product 
  // on a Account
  //returns this Account
  //********************************************************************
  async assignToProduct( accountId, productId ) {
    return new Promise((resolve, reject) => {
	    this.find(accountId).then(account => {
	    	new BankingProductAPI({store: this.store}).find( productId ).then(bankingProduct => {
    	        account.setProduct(bankingProduct);
    	       resolve(account);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Product on a Account by setting it to null
  //returns this Account
  //********************************************************************				
  async unassignProduct( accountId ) {
    return new Promise((resolve, reject) => {
	    this.find(accountId).then(account => {
    	    account.setProduct(null);
    	    resolve(account);
        })
    })
  }
		


  //********************************************************************
  // adds a Customer as the Owners by first creating it 
  //returns this Account
  //********************************************************************				
  async addToOwners( accountId, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
	return new Promise((resolve, reject) => {
		this.find(accountId).then(account => {
		    new CustomerAPI({store: this.store}).add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ).then(customer => {
		    	account.addToOwners(account).then(() => {
			        resolve( account );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more ownersIds as a Owners 
  // to a Account
  //returns this Account
  //********************************************************************				
  async assignToOwners( accountId, ownersIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(account => {
			var customerApi = new CustomerAPI({store: this.store});
			account.setOwners([]).then((account) => {			
				ownersIds.forEach(function (customerId, index) {
					customerApi.find({id: customerId}).then( foundCustomer => {
						account.addToOwners(foundCustomer);
					})
				})
				resolve(account);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a Transaction as the Transactions by first creating it 
  //returns this Account
  //********************************************************************				
  async addToTransactions( accountId, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ) {
	return new Promise((resolve, reject) => {
		this.find(accountId).then(account => {
		    new TransactionAPI({store: this.store}).add( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then(transaction => {
		    	account.addToTransactions(account).then(() => {
			        resolve( account );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more transactionsIds as a Transactions 
  // to a Account
  //returns this Account
  //********************************************************************				
  async assignToTransactions( accountId, transactionsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(account => {
			var transactionApi = new TransactionAPI({store: this.store});
			account.setTransactions([]).then((account) => {			
				transactionsIds.forEach(function (transactionId, index) {
					transactionApi.find({id: transactionId}).then( foundTransaction => {
						account.addToTransactions(foundTransaction);
					})
				})
				resolve(account);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a AccountStatement as the Statements by first creating it 
  //returns this Account
  //********************************************************************				
  async addToStatements( accountId, { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod } ) {
	return new Promise((resolve, reject) => {
		this.find(accountId).then(account => {
		    new AccountStatementAPI({store: this.store}).add( { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod } ).then(accountStatement => {
		    	account.addToStatements(account).then(() => {
			        resolve( account );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more statementsIds as a Statements 
  // to a Account
  //returns this Account
  //********************************************************************				
  async assignToStatements( accountId, statementsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(account => {
			var accountStatementApi = new AccountStatementAPI({store: this.store});
			account.setStatements([]).then((account) => {			
				statementsIds.forEach(function (accountStatementId, index) {
					accountStatementApi.find({id: accountStatementId}).then( foundAccountStatement => {
						account.addToStatements(foundAccountStatement);
					})
				})
				resolve(account);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a StandingInstruction as the StandingInstructions by first creating it 
  //returns this Account
  //********************************************************************				
  async addToStandingInstructions( accountId, { instructionId, amount, nextExecutionDate, Frequency, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(accountId).then(account => {
		    new StandingInstructionAPI({store: this.store}).add( { instructionId, amount, nextExecutionDate, Frequency, Status } ).then(standingInstruction => {
		    	account.addToStandingInstructions(account).then(() => {
			        resolve( account );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more standingInstructionsIds as a StandingInstructions 
  // to a Account
  //returns this Account
  //********************************************************************				
  async assignToStandingInstructions( accountId, standingInstructionsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(account => {
			var standingInstructionApi = new StandingInstructionAPI({store: this.store});
			account.setStandingInstructions([]).then((account) => {			
				standingInstructionsIds.forEach(function (standingInstructionId, index) {
					standingInstructionApi.find({id: standingInstructionId}).then( foundStandingInstruction => {
						account.addToStandingInstructions(foundStandingInstruction);
					})
				})
				resolve(account);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a FeeCharge as the FeeCharges by first creating it 
  //returns this Account
  //********************************************************************				
  async addToFeeCharges( accountId, { feeCode, amount, appliedOn, FeeType } ) {
	return new Promise((resolve, reject) => {
		this.find(accountId).then(account => {
		    new FeeChargeAPI({store: this.store}).add( { feeCode, amount, appliedOn, FeeType } ).then(feeCharge => {
		    	account.addToFeeCharges(account).then(() => {
			        resolve( account );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more feeChargesIds as a FeeCharges 
  // to a Account
  //returns this Account
  //********************************************************************				
  async assignToFeeCharges( accountId, feeChargesIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(account => {
			var feeChargeApi = new FeeChargeAPI({store: this.store});
			account.setFeeCharges([]).then((account) => {			
				feeChargesIds.forEach(function (feeChargeId, index) {
					feeChargeApi.find({id: feeChargeId}).then( foundFeeCharge => {
						account.addToFeeCharges(foundFeeCharge);
					})
				})
				resolve(account);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a Account
  //********************************************************************
  async saveHelper( accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status )  {
    return await this.update( accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable account
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = AccountAPI;
