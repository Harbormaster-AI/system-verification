const { DataSource } = require('apollo-datasource');
const CustomerAPI = require('./CustomerDS');
const BankAPI = require('./BankDS');
const AccountAPI = require('./AccountDS');
const ThirdPartyProviderAPI = require('./ThirdPartyProviderDS');

class ConsentAPI extends DataSource {

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
  // find a Consent
  //********************************************************************
  async find( id ) {
    return await this.store.consent.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Consent
  //********************************************************************
  async add( { grantedOn, expiresOn, ConsentType, Status } ) {
    return await this.store.consent.create( { grantedOn, expiresOn, ConsentType, Status } );
  }

  //********************************************************************
  // update a Consent
  //********************************************************************
  async update( { grantedOn, expiresOn, ConsentType, Status, id } ) {
	await this.store.consent.update( { grantedOn, expiresOn, ConsentType, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Consent by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.consent.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Consent
  //********************************************************************
  async findAll() {
    return await this.store.consent.findAll();
  }


  //********************************************************************
  // adds a Customer on a Consent
  //returns this Consent
  //********************************************************************
  async addCustomer( consentId, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: consentId}).then(consent => {
    		  new CustomerAPI({store: this.store}).add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus  } ).then(customer => {
    			  consent.setCustomer(customer).then(() => {
				        resolve( consent );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created customer to Customer 
  // on a Consent
  //returns this Consent
  //********************************************************************
  async assignToCustomer( consentId, customerId ) {
    return new Promise((resolve, reject) => {
	    this.find(consentId).then(consent => {
	    	new CustomerAPI({store: this.store}).find( customerId ).then(customer => {
    	        consent.setCustomer(customer);
    	       resolve(consent);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Customer on a Consent by setting it to null
  //returns this Consent
  //********************************************************************				
  async unassignCustomer( consentId ) {
    return new Promise((resolve, reject) => {
	    this.find(consentId).then(consent => {
    	    consent.setCustomer(null);
    	    resolve(consent);
        })
    })
  }
		

  //********************************************************************
  // adds a Bank on a Consent
  //returns this Consent
  //********************************************************************
  async addBank( consentId, { name, legalName, swiftBic, headquartersCountry, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: consentId}).then(consent => {
    		  new BankAPI({store: this.store}).add( { name, legalName, swiftBic, headquartersCountry, website  } ).then(bank => {
    			  consent.setBank(bank).then(() => {
				        resolve( consent );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created bank to Bank 
  // on a Consent
  //returns this Consent
  //********************************************************************
  async assignToBank( consentId, bankId ) {
    return new Promise((resolve, reject) => {
	    this.find(consentId).then(consent => {
	    	new BankAPI({store: this.store}).find( bankId ).then(bank => {
    	        consent.setBank(bank);
    	       resolve(consent);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Bank on a Consent by setting it to null
  //returns this Consent
  //********************************************************************				
  async unassignBank( consentId ) {
    return new Promise((resolve, reject) => {
	    this.find(consentId).then(consent => {
    	    consent.setBank(null);
    	    resolve(consent);
        })
    })
  }
		

  //********************************************************************
  // adds a ThirdPartyProvider on a Consent
  //returns this Consent
  //********************************************************************
  async addThirdPartyProvider( consentId, { name, registrationId, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: consentId}).then(consent => {
    		  new ThirdPartyProviderAPI({store: this.store}).add( { name, registrationId, website  } ).then(thirdPartyProvider => {
    			  consent.setThirdPartyProvider(thirdPartyProvider).then(() => {
				        resolve( consent );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created thirdPartyProvider to ThirdPartyProvider 
  // on a Consent
  //returns this Consent
  //********************************************************************
  async assignToThirdPartyProvider( consentId, thirdPartyProviderId ) {
    return new Promise((resolve, reject) => {
	    this.find(consentId).then(consent => {
	    	new ThirdPartyProviderAPI({store: this.store}).find( thirdPartyProviderId ).then(thirdPartyProvider => {
    	        consent.setThirdPartyProvider(thirdPartyProvider);
    	       resolve(consent);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a ThirdPartyProvider on a Consent by setting it to null
  //returns this Consent
  //********************************************************************				
  async unassignThirdPartyProvider( consentId ) {
    return new Promise((resolve, reject) => {
	    this.find(consentId).then(consent => {
    	    consent.setThirdPartyProvider(null);
    	    resolve(consent);
        })
    })
  }
		


  //********************************************************************
  // adds a Account as the AuthorizedAccounts by first creating it 
  //returns this Consent
  //********************************************************************				
  async addToAuthorizedAccounts( consentId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(consentId).then(consent => {
		    new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then(account => {
		    	consent.addToAuthorizedAccounts(consent).then(() => {
			        resolve( consent );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more authorizedAccountsIds as a AuthorizedAccounts 
  // to a Consent
  //returns this Consent
  //********************************************************************				
  async assignToAuthorizedAccounts( consentId, authorizedAccountsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(consent => {
			var accountApi = new AccountAPI({store: this.store});
			consent.setAuthorizedAccounts([]).then((consent) => {			
				authorizedAccountsIds.forEach(function (accountId, index) {
					accountApi.find({id: accountId}).then( foundAccount => {
						consent.addToAuthorizedAccounts(foundAccount);
					})
				})
				resolve(consent);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a Consent
  //********************************************************************
  async saveHelper( grantedOn, expiresOn, ConsentType, Status )  {
    return await this.update( grantedOn, expiresOn, ConsentType, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable consent
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = ConsentAPI;
