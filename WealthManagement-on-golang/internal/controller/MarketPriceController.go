package controller

import (
    MarketPriceDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to MarketPriceDAO for database creation
//----------------------------------------------------------------------------
func CreateMarketPrice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty MarketPrice model
	//----------------------------------------------------------------------------
	data := model.MarketPrice{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a MarketPrice model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the MarketPrice data access object to create
	//----------------------------------------------------------------------------
	requestResult := MarketPriceDAO.CreateMarketPrice( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to MarketPriceDAO to find the relevant MarketPrice
//----------------------------------------------------------------------------
func GetMarketPrice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Retrieve the parameter from the request using hte mux
	//----------------------------------------------------------------------------
	vars := mux.Vars(r)
	
	//----------------------------------------------------------------------------
	// Locate the value for the ID key
	//----------------------------------------------------------------------------	
	id := vars["id"]
	
	//----------------------------------------------------------------------------
	// Parse the value into an integer if provided as such
	//----------------------------------------------------------------------------	
	ID, err:= strconv.ParseUint(id, 10, 64)
	if err != nil {
		fmt.Println("Error while parsing")
	}
	
	//----------------------------------------------------------------------------
	// Delegate to the MarketPrice data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := MarketPriceDAO.GetMarketPrice(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to MarketPriceDAO for database read of all MarketPrices
//----------------------------------------------------------------------------
func GetAllMarketPrice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the MarketPrice data access object to get all
	//----------------------------------------------------------------------------
	requestResult := MarketPriceDAO.GetAllMarketPrice()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to MarketPriceDAO for database save
//----------------------------------------------------------------------------
func UpdateMarketPrice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty MarketPrice model
	//----------------------------------------------------------------------------
	var data = model.MarketPrice{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a MarketPrice model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the MarketPrice data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := MarketPriceDAO.UpdateMarketPrice(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to MarketPriceDAO for database deletion
//----------------------------------------------------------------------------
func DeleteMarketPrice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Retrieve the parameter from the request using hte mux
	//----------------------------------------------------------------------------
	vars := mux.Vars(r)
	
	//----------------------------------------------------------------------------
	// Locate the value for the ID key
	//----------------------------------------------------------------------------	
	id := vars["id"]

	//----------------------------------------------------------------------------
	// Parse the value into an integer if provided as such
	//----------------------------------------------------------------------------	
	ID, err:= strconv.ParseUint(id, 10, 64)
	if err != nil {
		fmt.Println("Error while parsing")
	}

	//----------------------------------------------------------------------------
	// Delegate to the MarketPrice data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := MarketPriceDAO.DeleteMarketPrice(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Security on a MarketPrice
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignSecurityToMarketPrice(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	marketPriceId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	securityId,_ := strconv.ParseUint( vars["securityId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the MarketPrice DAO
	//----------------------------------------------------------------------------
	requestResult := MarketPriceDAO.AssignSecurityToMarketPrice(marketPriceId, securityId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Security on a MarketPrice
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignSecurityFromMarketPrice( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	marketPriceId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the MarketPrice DAO
	//----------------------------------------------------------------------------
	requestResult := MarketPriceDAO.UnassignSecurityFromMarketPrice(marketPriceId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


