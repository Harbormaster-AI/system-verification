package controller

import (
    AssetAllocationSliceDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to AssetAllocationSliceDAO for database creation
//----------------------------------------------------------------------------
func CreateAssetAllocationSlice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty AssetAllocationSlice model
	//----------------------------------------------------------------------------
	data := model.AssetAllocationSlice{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a AssetAllocationSlice model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the AssetAllocationSlice data access object to create
	//----------------------------------------------------------------------------
	requestResult := AssetAllocationSliceDAO.CreateAssetAllocationSlice( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to AssetAllocationSliceDAO to find the relevant AssetAllocationSlice
//----------------------------------------------------------------------------
func GetAssetAllocationSlice(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the AssetAllocationSlice data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AssetAllocationSliceDAO.GetAssetAllocationSlice(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to AssetAllocationSliceDAO for database read of all AssetAllocationSlices
//----------------------------------------------------------------------------
func GetAllAssetAllocationSlice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the AssetAllocationSlice data access object to get all
	//----------------------------------------------------------------------------
	requestResult := AssetAllocationSliceDAO.GetAllAssetAllocationSlice()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to AssetAllocationSliceDAO for database save
//----------------------------------------------------------------------------
func UpdateAssetAllocationSlice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty AssetAllocationSlice model
	//----------------------------------------------------------------------------
	var data = model.AssetAllocationSlice{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a AssetAllocationSlice model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the AssetAllocationSlice data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AssetAllocationSliceDAO.UpdateAssetAllocationSlice(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to AssetAllocationSliceDAO for database deletion
//----------------------------------------------------------------------------
func DeleteAssetAllocationSlice(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the AssetAllocationSlice data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := AssetAllocationSliceDAO.DeleteAssetAllocationSlice(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a ModelPortfolio on a AssetAllocationSlice
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignModelPortfolioToAssetAllocationSlice(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	assetAllocationSliceId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	modelPortfolioId,_ := strconv.ParseUint( vars["modelPortfolioId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the AssetAllocationSlice DAO
	//----------------------------------------------------------------------------
	requestResult := AssetAllocationSliceDAO.AssignModelPortfolioToAssetAllocationSlice(assetAllocationSliceId, modelPortfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a ModelPortfolio on a AssetAllocationSlice
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignModelPortfolioFromAssetAllocationSlice( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	assetAllocationSliceId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the AssetAllocationSlice DAO
	//----------------------------------------------------------------------------
	requestResult := AssetAllocationSliceDAO.UnassignModelPortfolioFromAssetAllocationSlice(assetAllocationSliceId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


