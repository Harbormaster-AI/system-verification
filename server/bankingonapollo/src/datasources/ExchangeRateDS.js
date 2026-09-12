const { DataSource } = require('apollo-datasource');
const BankAPI = require('./BankDS');
const FXTradeAPI = require('./FXTradeDS');

class ExchangeRateAPI extends DataSource {

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
  // find a ExchangeRate
  //********************************************************************
  async find( id ) {
    return await this.store.exchangeRate.findOne({ where: {id} });
  }

  //********************************************************************
  // add a ExchangeRate
  //********************************************************************
  async add( { baseCurrency, counterCurrency, rate, asOf, source } ) {
    return await this.store.exchangeRate.create( { baseCurrency, counterCurrency, rate, asOf, source } );
  }

  //********************************************************************
  // update a ExchangeRate
  //********************************************************************
  async update( { baseCurrency, counterCurrency, rate, asOf, source, id } ) {
	await this.store.exchangeRate.update( { baseCurrency, counterCurrency, rate, asOf, source }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a ExchangeRate by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.exchangeRate.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all ExchangeRate
  //********************************************************************
  async findAll() {
    return await this.store.exchangeRate.findAll();
  }


  //********************************************************************
  // adds a Bank on a ExchangeRate
  //returns this ExchangeRate
  //********************************************************************
  async addBank( exchangeRateId, { name, legalName, swiftBic, headquartersCountry, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: exchangeRateId}).then(exchangeRate => {
    		  new BankAPI({store: this.store}).add( { name, legalName, swiftBic, headquartersCountry, website  } ).then(bank => {
    			  exchangeRate.setBank(bank).then(() => {
				        resolve( exchangeRate );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created bank to Bank 
  // on a ExchangeRate
  //returns this ExchangeRate
  //********************************************************************
  async assignToBank( exchangeRateId, bankId ) {
    return new Promise((resolve, reject) => {
	    this.find(exchangeRateId).then(exchangeRate => {
	    	new BankAPI({store: this.store}).find( bankId ).then(bank => {
    	        exchangeRate.setBank(bank);
    	       resolve(exchangeRate);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Bank on a ExchangeRate by setting it to null
  //returns this ExchangeRate
  //********************************************************************				
  async unassignBank( exchangeRateId ) {
    return new Promise((resolve, reject) => {
	    this.find(exchangeRateId).then(exchangeRate => {
    	    exchangeRate.setBank(null);
    	    resolve(exchangeRate);
        })
    })
  }
		


  //********************************************************************
  // adds a FXTrade as the FxTrades by first creating it 
  //returns this ExchangeRate
  //********************************************************************				
  async addToFxTrades( exchangeRateId, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(exchangeRateId).then(exchangeRate => {
		    new FXTradeAPI({store: this.store}).add( { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } ).then(fXTrade => {
		    	exchangeRate.addToFxTrades(exchangeRate).then(() => {
			        resolve( exchangeRate );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more fxTradesIds as a FxTrades 
  // to a ExchangeRate
  //returns this ExchangeRate
  //********************************************************************				
  async assignToFxTrades( exchangeRateId, fxTradesIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(exchangeRate => {
			var fXTradeApi = new FXTradeAPI({store: this.store});
			exchangeRate.setFxTrades([]).then((exchangeRate) => {			
				fxTradesIds.forEach(function (fXTradeId, index) {
					fXTradeApi.find({id: fXTradeId}).then( foundFXTrade => {
						exchangeRate.addToFxTrades(foundFXTrade);
					})
				})
				resolve(exchangeRate);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a ExchangeRate
  //********************************************************************
  async saveHelper( baseCurrency, counterCurrency, rate, asOf, source )  {
    return await this.update( baseCurrency, counterCurrency, rate, asOf, source );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable exchangeRate
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = ExchangeRateAPI;
