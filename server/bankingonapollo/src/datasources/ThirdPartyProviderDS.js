const { DataSource } = require('apollo-datasource');
const BankAPI = require('./BankDS');
const ConsentAPI = require('./ConsentDS');

class ThirdPartyProviderAPI extends DataSource {

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
  // find a ThirdPartyProvider
  //********************************************************************
  async find( id ) {
    return await this.store.thirdPartyProvider.findOne({ where: {id} });
  }

  //********************************************************************
  // add a ThirdPartyProvider
  //********************************************************************
  async add( { name, registrationId, website } ) {
    return await this.store.thirdPartyProvider.create( { name, registrationId, website } );
  }

  //********************************************************************
  // update a ThirdPartyProvider
  //********************************************************************
  async update( { name, registrationId, website, id } ) {
	await this.store.thirdPartyProvider.update( { name, registrationId, website }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a ThirdPartyProvider by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.thirdPartyProvider.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all ThirdPartyProvider
  //********************************************************************
  async findAll() {
    return await this.store.thirdPartyProvider.findAll();
  }


  //********************************************************************
  // adds a Bank on a ThirdPartyProvider
  //returns this ThirdPartyProvider
  //********************************************************************
  async addBank( thirdPartyProviderId, { name, legalName, swiftBic, headquartersCountry, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: thirdPartyProviderId}).then(thirdPartyProvider => {
    		  new BankAPI({store: this.store}).add( { name, legalName, swiftBic, headquartersCountry, website  } ).then(bank => {
    			  thirdPartyProvider.setBank(bank).then(() => {
				        resolve( thirdPartyProvider );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created bank to Bank 
  // on a ThirdPartyProvider
  //returns this ThirdPartyProvider
  //********************************************************************
  async assignToBank( thirdPartyProviderId, bankId ) {
    return new Promise((resolve, reject) => {
	    this.find(thirdPartyProviderId).then(thirdPartyProvider => {
	    	new BankAPI({store: this.store}).find( bankId ).then(bank => {
    	        thirdPartyProvider.setBank(bank);
    	       resolve(thirdPartyProvider);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Bank on a ThirdPartyProvider by setting it to null
  //returns this ThirdPartyProvider
  //********************************************************************				
  async unassignBank( thirdPartyProviderId ) {
    return new Promise((resolve, reject) => {
	    this.find(thirdPartyProviderId).then(thirdPartyProvider => {
    	    thirdPartyProvider.setBank(null);
    	    resolve(thirdPartyProvider);
        })
    })
  }
		


  //********************************************************************
  // adds a Consent as the Consents by first creating it 
  //returns this ThirdPartyProvider
  //********************************************************************				
  async addToConsents( thirdPartyProviderId, { grantedOn, expiresOn, ConsentType, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(thirdPartyProviderId).then(thirdPartyProvider => {
		    new ConsentAPI({store: this.store}).add( { grantedOn, expiresOn, ConsentType, Status } ).then(consent => {
		    	thirdPartyProvider.addToConsents(thirdPartyProvider).then(() => {
			        resolve( thirdPartyProvider );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more consentsIds as a Consents 
  // to a ThirdPartyProvider
  //returns this ThirdPartyProvider
  //********************************************************************				
  async assignToConsents( thirdPartyProviderId, consentsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(thirdPartyProvider => {
			var consentApi = new ConsentAPI({store: this.store});
			thirdPartyProvider.setConsents([]).then((thirdPartyProvider) => {			
				consentsIds.forEach(function (consentId, index) {
					consentApi.find({id: consentId}).then( foundConsent => {
						thirdPartyProvider.addToConsents(foundConsent);
					})
				})
				resolve(thirdPartyProvider);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a ThirdPartyProvider
  //********************************************************************
  async saveHelper( name, registrationId, website )  {
    return await this.update( name, registrationId, website );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable thirdPartyProvider
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = ThirdPartyProviderAPI;
