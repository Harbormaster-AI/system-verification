const { DataSource } = require('apollo-datasource');
const AccountAPI = require('./AccountDS');

class AccountStatementAPI extends DataSource {

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
  // find a AccountStatement
  //********************************************************************
  async find( id ) {
    return await this.store.accountStatement.findOne({ where: {id} });
  }

  //********************************************************************
  // add a AccountStatement
  //********************************************************************
  async add( { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod } ) {
    return await this.store.accountStatement.create( { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod } );
  }

  //********************************************************************
  // update a AccountStatement
  //********************************************************************
  async update( { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod, id } ) {
	await this.store.accountStatement.update( { statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a AccountStatement by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.accountStatement.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all AccountStatement
  //********************************************************************
  async findAll() {
    return await this.store.accountStatement.findAll();
  }


  //********************************************************************
  // adds a Account on a AccountStatement
  //returns this AccountStatement
  //********************************************************************
  async addAccount( accountStatementId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: accountStatementId}).then(accountStatement => {
    		  new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status  } ).then(account => {
    			  accountStatement.setAccount(account).then(() => {
				        resolve( accountStatement );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created account to Account 
  // on a AccountStatement
  //returns this AccountStatement
  //********************************************************************
  async assignToAccount( accountStatementId, accountId ) {
    return new Promise((resolve, reject) => {
	    this.find(accountStatementId).then(accountStatement => {
	    	new AccountAPI({store: this.store}).find( accountId ).then(account => {
    	        accountStatement.setAccount(account);
    	       resolve(accountStatement);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Account on a AccountStatement by setting it to null
  //returns this AccountStatement
  //********************************************************************				
  async unassignAccount( accountStatementId ) {
    return new Promise((resolve, reject) => {
	    this.find(accountStatementId).then(accountStatement => {
    	    accountStatement.setAccount(null);
    	    resolve(accountStatement);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a AccountStatement
  //********************************************************************
  async saveHelper( statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod )  {
    return await this.update( statementNumber, periodStart, periodEnd, openingBalance, closingBalance, DeliveryMethod );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable accountStatement
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = AccountStatementAPI;
