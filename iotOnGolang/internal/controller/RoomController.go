package controller

import (
    RoomDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to RoomDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Room model
	//----------------------------------------------------------------------------
	data := model.Room{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Room model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Room data access object to create
	//----------------------------------------------------------------------------
	requestResult := RoomDAO.CreateRoom( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to RoomDAO to find the relevant Room
//----------------------------------------------------------------------------
func get(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Room data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := RoomDAO.GetRoom(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to RoomDAO for database read of all Rooms
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Room data access object to get all
	//----------------------------------------------------------------------------
	requestResult := RoomDAO.GetAllRoom()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to RoomDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Room model
	//----------------------------------------------------------------------------
	var data = model.Room{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Room model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Room data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := RoomDAO.UpdateRoom(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to RoomDAO for database deletion
//----------------------------------------------------------------------------
func delete(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Room data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := RoomDAO.DeleteRoom(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Floor on a Room
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignFloor(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	roomId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	floorId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Room DAO
	//----------------------------------------------------------------------------
	requestResult := RoomDAO.AssignFloorToRoom(roomId, floorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Floor on a Room
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignFloor( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	roomId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Room DAO
	//----------------------------------------------------------------------------
	requestResult := RoomDAO.UnassignFloorFromRoom(roomId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more devicesIds as a Devices to a Room
	//----------------------------------------------------------------------------
func addToDevices(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	roomId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	devicesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Room DAO
	//----------------------------------------------------------------------------
	requestResult := RoomDAO.AddDevicesToRoom(roomId, devicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more devicesIds as a Devices from a Room
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromDevices(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	roomId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	devicesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Room DAO
	//----------------------------------------------------------------------------
	requestResult := RoomDAO.RemoveDevicesFromRoom(roomId, devicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more gatewaysIds as a Gateways to a Room
	//----------------------------------------------------------------------------
func addToGateways(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	roomId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	gatewaysIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Room DAO
	//----------------------------------------------------------------------------
	requestResult := RoomDAO.AddGatewaysToRoom(roomId, gatewaysIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more gatewaysIds as a Gateways from a Room
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromGateways(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	roomId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	gatewaysIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Room DAO
	//----------------------------------------------------------------------------
	requestResult := RoomDAO.RemoveGatewaysFromRoom(roomId, gatewaysIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
