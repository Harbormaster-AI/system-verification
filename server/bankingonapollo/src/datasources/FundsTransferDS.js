const { DataSource } = require('apollo-datasource');
const AccountAPI = require('./AccountDS');
const ExternalAccountAPI = require('./ExternalAccountDS');
const CustomerAPI = require('./CustomerDS');
const TransactionAPI = require('./TransactionDS');

class FundsTransferAPI extends DataSource {

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
  // find a FundsTransfer
  //********************************************************************
  async find( id ) {
    return await this.store.fundsTransfer.findOne({ where: {id} });
  }

  //********************************************************************
  // add a FundsTransfer
  //********************************************************************
  async add( { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } ) {
    return await this.store.fundsTransfer.create( { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } );
  }

  //********************************************************************
  // update a FundsTransfer
  //********************************************************************
  async update( { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status, id } ) {
	await this.store.fundsTransfer.update( { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a FundsTransfer by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.fundsTransfer.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all FundsTransfer
  //********************************************************************
  async findAll() {
    return await this.store.fundsTransfer.findAll();
  }


  //********************************************************************
  // adds a SourceAccount on a FundsTransfer
  //returns this FundsTransfer
  //********************************************************************
  async addSourceAccount( fundsTransferId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: fundsTransferId}).then(fundsTransfer => {
    		  new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status  } ).then(account => {
    			  fundsTransfer.setSourceAccount(account).then(() => {
				        resolve( fundsTransfer );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created sourceAccount to SourceAccount 
  // on a FundsTransfer
  //returns this FundsTransfer
  //********************************************************************
  async assignToSourceAccount( fundsTransferId, sourceAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(fundsTransferId).then(fundsTransfer => {
	    	new AccountAPI({store: this.store}).find( sourceAccountId ).then(account => {
    	        fundsTransfer.setSourceAccount(account);
    	       resolve(fundsTransfer);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a SourceAccount on a FundsTransfer by setting it to null
  //returns this FundsTransfer
  //********************************************************************				
  async unassignSourceAccount( fundsTransferId ) {
    return new Promise((resolve, reject) => {
	    this.find(fundsTransferId).then(fundsTransfer => {
    	    fundsTransfer.setSourceAccount(null);
    	    resolve(fundsTransfer);
        })
    })
  }
		

  //********************************************************************
  // adds a DestinationAccount on a FundsTransfer
  //returns this FundsTransfer
  //********************************************************************
  async addDestinationAccount( fundsTransferId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: fundsTransferId}).then(fundsTransfer => {
    		  new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status  } ).then(account => {
    			  fundsTransfer.setDestinationAccount(account).then(() => {
				        resolve( fundsTransfer );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created destinationAccount to DestinationAccount 
  // on a FundsTransfer
  //returns this FundsTransfer
  //********************************************************************
  async assignToDestinationAccount( fundsTransferId, destinationAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(fundsTransferId).then(fundsTransfer => {
	    	new AccountAPI({store: this.store}).find( destinationAccountId ).then(account => {
    	        fundsTransfer.setDestinationAccount(account);
    	       resolve(fundsTransfer);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a DestinationAccount on a FundsTransfer by setting it to null
  //returns this FundsTransfer
  //********************************************************************				
  async unassignDestinationAccount( fundsTransferId ) {
    return new Promise((resolve, reject) => {
	    this.find(fundsTransferId).then(fundsTransfer => {
    	    fundsTransfer.setDestinationAccount(null);
    	    resolve(fundsTransfer);
        })
    })
  }
		

  //********************************************************************
  // adds a ExternalBeneficiary on a FundsTransfer
  //returns this FundsTransfer
  //********************************************************************
  async addExternalBeneficiary( fundsTransferId, { name, iban, accountNumber, bic, bankName, country } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: fundsTransferId}).then(fundsTransfer => {
    		  new ExternalAccountAPI({store: this.store}).add( { name, iban, accountNumber, bic, bankName, country  } ).then(externalAccount => {
    			  fundsTransfer.setExternalBeneficiary(externalAccount).then(() => {
				        resolve( fundsTransfer );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created externalBeneficiary to ExternalBeneficiary 
  // on a FundsTransfer
  //returns this FundsTransfer
  //********************************************************************
  async assignToExternalBeneficiary( fundsTransferId, externalBeneficiaryId ) {
    return new Promise((resolve, reject) => {
	    this.find(fundsTransferId).then(fundsTransfer => {
	    	new ExternalAccountAPI({store: this.store}).find( externalBeneficiaryId ).then(externalAccount => {
    	        fundsTransfer.setExternalBeneficiary(externalAccount);
    	       resolve(fundsTransfer);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a ExternalBeneficiary on a FundsTransfer by setting it to null
  //returns this FundsTransfer
  //********************************************************************				
  async unassignExternalBeneficiary( fundsTransferId ) {
    return new Promise((resolve, reject) => {
	    this.find(fundsTransferId).then(fundsTransfer => {
    	    fundsTransfer.setExternalBeneficiary(null);
    	    resolve(fundsTransfer);
        })
    })
  }
		

  //********************************************************************
  // adds a InitiatedBy on a FundsTransfer
  //returns this FundsTransfer
  //********************************************************************
  async addInitiatedBy( fundsTransferId, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: fundsTransferId}).then(fundsTransfer => {
    		  new CustomerAPI({store: this.store}).add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus  } ).then(customer => {
    			  fundsTransfer.setInitiatedBy(customer).then(() => {
				        resolve( fundsTransfer );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created initiatedBy to InitiatedBy 
  // on a FundsTransfer
  //returns this FundsTransfer
  //********************************************************************
  async assignToInitiatedBy( fundsTransferId, initiatedById ) {
    return new Promise((resolve, reject) => {
	    this.find(fundsTransferId).then(fundsTransfer => {
	    	new CustomerAPI({store: this.store}).find( initiatedById ).then(customer => {
    	        fundsTransfer.setInitiatedBy(customer);
    	       resolve(fundsTransfer);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a InitiatedBy on a FundsTransfer by setting it to null
  //returns this FundsTransfer
  //********************************************************************				
  async unassignInitiatedBy( fundsTransferId ) {
    return new Promise((resolve, reject) => {
	    this.find(fundsTransferId).then(fundsTransfer => {
    	    fundsTransfer.setInitiatedBy(null);
    	    resolve(fundsTransfer);
        })
    })
  }
		


  //********************************************************************
  // adds a Transaction as the Transactions by first creating it 
  //returns this FundsTransfer
  //********************************************************************				
  async addToTransactions( fundsTransferId, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ) {
	return new Promise((resolve, reject) => {
		this.find(fundsTransferId).then(fundsTransfer => {
		    new TransactionAPI({store: this.store}).add( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then(transaction => {
		    	fundsTransfer.addToTransactions(fundsTransfer).then(() => {
			        resolve( fundsTransfer );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more transactionsIds as a Transactions 
  // to a FundsTransfer
  //returns this FundsTransfer
  //********************************************************************				
  async assignToTransactions( fundsTransferId, transactionsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(fundsTransfer => {
			var transactionApi = new TransactionAPI({store: this.store});
			fundsTransfer.setTransactions([]).then((fundsTransfer) => {			
				transactionsIds.forEach(function (transactionId, index) {
					transactionApi.find({id: transactionId}).then( foundTransaction => {
						fundsTransfer.addToTransactions(foundTransaction);
					})
				})
				resolve(fundsTransfer);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a FundsTransfer
  //********************************************************************
  async saveHelper( transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status )  {
    return await this.update( transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable fundsTransfer
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = FundsTransferAPI;
