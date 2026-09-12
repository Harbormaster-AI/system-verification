const { DataSource } = require('apollo-datasource');
const KycProfileAPI = require('./KycProfileDS');

class IdentityDocumentAPI extends DataSource {

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
  // find a IdentityDocument
  //********************************************************************
  async find( id ) {
    return await this.store.identityDocument.findOne({ where: {id} });
  }

  //********************************************************************
  // add a IdentityDocument
  //********************************************************************
  async add( { documentNumber, issuingCountry, expirationDate, DocumentType } ) {
    return await this.store.identityDocument.create( { documentNumber, issuingCountry, expirationDate, DocumentType } );
  }

  //********************************************************************
  // update a IdentityDocument
  //********************************************************************
  async update( { documentNumber, issuingCountry, expirationDate, DocumentType, id } ) {
	await this.store.identityDocument.update( { documentNumber, issuingCountry, expirationDate, DocumentType }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a IdentityDocument by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.identityDocument.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all IdentityDocument
  //********************************************************************
  async findAll() {
    return await this.store.identityDocument.findAll();
  }


  //********************************************************************
  // adds a KycProfile on a IdentityDocument
  //returns this IdentityDocument
  //********************************************************************
  async addKycProfile( identityDocumentId, { profileId, lastReviewedOn, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: identityDocumentId}).then(identityDocument => {
    		  new KycProfileAPI({store: this.store}).add( { profileId, lastReviewedOn, Status  } ).then(kycProfile => {
    			  identityDocument.setKycProfile(kycProfile).then(() => {
				        resolve( identityDocument );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created kycProfile to KycProfile 
  // on a IdentityDocument
  //returns this IdentityDocument
  //********************************************************************
  async assignToKycProfile( identityDocumentId, kycProfileId ) {
    return new Promise((resolve, reject) => {
	    this.find(identityDocumentId).then(identityDocument => {
	    	new KycProfileAPI({store: this.store}).find( kycProfileId ).then(kycProfile => {
    	        identityDocument.setKycProfile(kycProfile);
    	       resolve(identityDocument);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a KycProfile on a IdentityDocument by setting it to null
  //returns this IdentityDocument
  //********************************************************************				
  async unassignKycProfile( identityDocumentId ) {
    return new Promise((resolve, reject) => {
	    this.find(identityDocumentId).then(identityDocument => {
    	    identityDocument.setKycProfile(null);
    	    resolve(identityDocument);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a IdentityDocument
  //********************************************************************
  async saveHelper( documentNumber, issuingCountry, expirationDate, DocumentType )  {
    return await this.update( documentNumber, issuingCountry, expirationDate, DocumentType );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable identityDocument
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = IdentityDocumentAPI;
