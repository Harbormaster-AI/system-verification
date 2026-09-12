const { DataSource } = require('apollo-datasource');
const CustomerAPI = require('./CustomerDS');
const TransactionAPI = require('./TransactionDS');

class ExternalAccountAPI extends DataSource {

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
  // find a ExternalAccount
  //********************************************************************
  async find( id ) {
    return await this.store.externalAccount.findOne({ where: {id} });
  }

  //********************************************************************
  // add a ExternalAccount
  //********************************************************************
  async add( { name, iban, accountNumber, bic, bankName, country } ) {
    return await this.store.externalAccount.create( { name, iban, accountNumber, bic, bankName, country } );
  }

  //********************************************************************
  // update a ExternalAccount
  //********************************************************************
  async update( { name, iban, accountNumber, bic, bankName, country, id } ) {
	await this.store.externalAccount.update( { name, iban, accountNumber, bic, bankName, country }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a ExternalAccount by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.externalAccount.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all ExternalAccount
  //********************************************************************
  async findAll() {
    return await this.store.externalAccount.findAll();
  }


  //********************************************************************
  // adds a Customer on a ExternalAccount
  //returns this ExternalAccount
  //********************************************************************
  async addCustomer( externalAccountId, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: externalAccountId}).then(externalAccount => {
    		  new CustomerAPI({store: this.store}).add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus  } ).then(customer => {
    			  externalAccount.setCustomer(customer).then(() => {
				        resolve( externalAccount );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created customer to Customer 
  // on a ExternalAccount
  //returns this ExternalAccount
  //********************************************************************
  async assignToCustomer( externalAccountId, customerId ) {
    return new Promise((resolve, reject) => {
	    this.find(externalAccountId).then(externalAccount => {
	    	new CustomerAPI({store: this.store}).find( customerId ).then(customer => {
    	        externalAccount.setCustomer(customer);
    	       resolve(externalAccount);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Customer on a ExternalAccount by setting it to null
  //returns this ExternalAccount
  //********************************************************************				
  async unassignCustomer( externalAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(externalAccountId).then(externalAccount => {
    	    externalAccount.setCustomer(null);
    	    resolve(externalAccount);
        })
    })
  }
		


  //********************************************************************
  // adds a Transaction as the Transactions by first creating it 
  //returns this ExternalAccount
  //********************************************************************				
  async addToTransactions( externalAccountId, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ) {
	return new Promise((resolve, reject) => {
		this.find(externalAccountId).then(externalAccount => {
		    new TransactionAPI({store: this.store}).add( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then(transaction => {
		    	externalAccount.addToTransactions(externalAccount).then(() => {
			        resolve( externalAccount );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more transactionsIds as a Transactions 
  // to a ExternalAccount
  //returns this ExternalAccount
  //********************************************************************				
  async assignToTransactions( externalAccountId, transactionsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(externalAccount => {
			var transactionApi = new TransactionAPI({store: this.store});
			externalAccount.setTransactions([]).then((externalAccount) => {			
				transactionsIds.forEach(function (transactionId, index) {
					transactionApi.find({id: transactionId}).then( foundTransaction => {
						externalAccount.addToTransactions(foundTransaction);
					})
				})
				resolve(externalAccount);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a ExternalAccount
  //********************************************************************
  async saveHelper( name, iban, accountNumber, bic, bankName, country )  {
    return await this.update( name, iban, accountNumber, bic, bankName, country );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable externalAccount
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = ExternalAccountAPI;
