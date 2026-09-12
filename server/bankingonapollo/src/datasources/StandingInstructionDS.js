const { DataSource } = require('apollo-datasource');
const AccountAPI = require('./AccountDS');
const ExternalAccountAPI = require('./ExternalAccountDS');

class StandingInstructionAPI extends DataSource {

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
  // find a StandingInstruction
  //********************************************************************
  async find( id ) {
    return await this.store.standingInstruction.findOne({ where: {id} });
  }

  //********************************************************************
  // add a StandingInstruction
  //********************************************************************
  async add( { instructionId, amount, nextExecutionDate, Frequency, Status } ) {
    return await this.store.standingInstruction.create( { instructionId, amount, nextExecutionDate, Frequency, Status } );
  }

  //********************************************************************
  // update a StandingInstruction
  //********************************************************************
  async update( { instructionId, amount, nextExecutionDate, Frequency, Status, id } ) {
	await this.store.standingInstruction.update( { instructionId, amount, nextExecutionDate, Frequency, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a StandingInstruction by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.standingInstruction.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all StandingInstruction
  //********************************************************************
  async findAll() {
    return await this.store.standingInstruction.findAll();
  }


  //********************************************************************
  // adds a Account on a StandingInstruction
  //returns this StandingInstruction
  //********************************************************************
  async addAccount( standingInstructionId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: standingInstructionId}).then(standingInstruction => {
    		  new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status  } ).then(account => {
    			  standingInstruction.setAccount(account).then(() => {
				        resolve( standingInstruction );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created account to Account 
  // on a StandingInstruction
  //returns this StandingInstruction
  //********************************************************************
  async assignToAccount( standingInstructionId, accountId ) {
    return new Promise((resolve, reject) => {
	    this.find(standingInstructionId).then(standingInstruction => {
	    	new AccountAPI({store: this.store}).find( accountId ).then(account => {
    	        standingInstruction.setAccount(account);
    	       resolve(standingInstruction);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Account on a StandingInstruction by setting it to null
  //returns this StandingInstruction
  //********************************************************************				
  async unassignAccount( standingInstructionId ) {
    return new Promise((resolve, reject) => {
	    this.find(standingInstructionId).then(standingInstruction => {
    	    standingInstruction.setAccount(null);
    	    resolve(standingInstruction);
        })
    })
  }
		

  //********************************************************************
  // adds a Beneficiary on a StandingInstruction
  //returns this StandingInstruction
  //********************************************************************
  async addBeneficiary( standingInstructionId, { name, iban, accountNumber, bic, bankName, country } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: standingInstructionId}).then(standingInstruction => {
    		  new ExternalAccountAPI({store: this.store}).add( { name, iban, accountNumber, bic, bankName, country  } ).then(externalAccount => {
    			  standingInstruction.setBeneficiary(externalAccount).then(() => {
				        resolve( standingInstruction );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created beneficiary to Beneficiary 
  // on a StandingInstruction
  //returns this StandingInstruction
  //********************************************************************
  async assignToBeneficiary( standingInstructionId, beneficiaryId ) {
    return new Promise((resolve, reject) => {
	    this.find(standingInstructionId).then(standingInstruction => {
	    	new ExternalAccountAPI({store: this.store}).find( beneficiaryId ).then(externalAccount => {
    	        standingInstruction.setBeneficiary(externalAccount);
    	       resolve(standingInstruction);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Beneficiary on a StandingInstruction by setting it to null
  //returns this StandingInstruction
  //********************************************************************				
  async unassignBeneficiary( standingInstructionId ) {
    return new Promise((resolve, reject) => {
	    this.find(standingInstructionId).then(standingInstruction => {
    	    standingInstruction.setBeneficiary(null);
    	    resolve(standingInstruction);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a StandingInstruction
  //********************************************************************
  async saveHelper( instructionId, amount, nextExecutionDate, Frequency, Status )  {
    return await this.update( instructionId, amount, nextExecutionDate, Frequency, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable standingInstruction
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = StandingInstructionAPI;
