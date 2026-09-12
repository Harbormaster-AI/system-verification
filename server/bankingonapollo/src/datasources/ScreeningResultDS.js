const { DataSource } = require('apollo-datasource');
const KycProfileAPI = require('./KycProfileDS');

class ScreeningResultAPI extends DataSource {

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
  // find a ScreeningResult
  //********************************************************************
  async find( id ) {
    return await this.store.screeningResult.findOne({ where: {id} });
  }

  //********************************************************************
  // add a ScreeningResult
  //********************************************************************
  async add( { screeningDate, provider, Outcome } ) {
    return await this.store.screeningResult.create( { screeningDate, provider, Outcome } );
  }

  //********************************************************************
  // update a ScreeningResult
  //********************************************************************
  async update( { screeningDate, provider, Outcome, id } ) {
	await this.store.screeningResult.update( { screeningDate, provider, Outcome }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a ScreeningResult by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.screeningResult.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all ScreeningResult
  //********************************************************************
  async findAll() {
    return await this.store.screeningResult.findAll();
  }


  //********************************************************************
  // adds a KycProfile on a ScreeningResult
  //returns this ScreeningResult
  //********************************************************************
  async addKycProfile( screeningResultId, { profileId, lastReviewedOn, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: screeningResultId}).then(screeningResult => {
    		  new KycProfileAPI({store: this.store}).add( { profileId, lastReviewedOn, Status  } ).then(kycProfile => {
    			  screeningResult.setKycProfile(kycProfile).then(() => {
				        resolve( screeningResult );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created kycProfile to KycProfile 
  // on a ScreeningResult
  //returns this ScreeningResult
  //********************************************************************
  async assignToKycProfile( screeningResultId, kycProfileId ) {
    return new Promise((resolve, reject) => {
	    this.find(screeningResultId).then(screeningResult => {
	    	new KycProfileAPI({store: this.store}).find( kycProfileId ).then(kycProfile => {
    	        screeningResult.setKycProfile(kycProfile);
    	       resolve(screeningResult);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a KycProfile on a ScreeningResult by setting it to null
  //returns this ScreeningResult
  //********************************************************************				
  async unassignKycProfile( screeningResultId ) {
    return new Promise((resolve, reject) => {
	    this.find(screeningResultId).then(screeningResult => {
    	    screeningResult.setKycProfile(null);
    	    resolve(screeningResult);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a ScreeningResult
  //********************************************************************
  async saveHelper( screeningDate, provider, Outcome )  {
    return await this.update( screeningDate, provider, Outcome );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable screeningResult
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = ScreeningResultAPI;
