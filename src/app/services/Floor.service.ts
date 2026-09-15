
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Floor} from '../models/Floor';
import {BuildingService} from '../services/Building.service';
import {RoomService} from '../services/Room.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class FloorService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	floor : Floor;

	//********************************************************************
	// Catch all for the return value of a service call
	//********************************************************************
	result: any;

	//********************************************************************
	// sole constructor, injected with the HttpClient
	//********************************************************************
	constructor(private http: HttpClient) {
		super();
	}

		//********************************************************************
	// add a Floor
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addFloor(name, level, Building, Rooms) : Observable<any> {
		const uri_ = this.apiUrl + '/Floor/create';
		const obj = {
			      		name: name,
      		level: level,
      		Building: Building != null && Building.length > 0 ? Building : null,
			Rooms: Rooms != null && Rooms.length > 0 ? Rooms : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a Floor
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateFloor(name, level, Building, Rooms, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/Floor/update/' + id;
		const obj = {
				      		name: name,
      		level: level,
      		Building: Building != null && Building.length > 0 ? Building : null,
			Rooms: Rooms != null && Rooms.length > 0 ? Rooms : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a Floor
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteFloor(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/Floor/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a Floor
	// returns the results untouched as an Observable Floor
	// Floor model
	// delegates via URI
	//********************************************************************
	getFloor(id) : Observable<Floor> {
		const uri_ = this.apiUrl + '/Floor/load/' + id;

		return this.http.get<Floor>(uri_);
	}
	
	//********************************************************************
	// gets all Floor
	// returns the results untouched as JSON representation of an
	// Observable array of Floor models
	// delegates via URI
	//********************************************************************
	getFloors() : Observable<Floor[]> {
		const uri_ = this.apiUrl + '/Floor/';

		return this
			.http.get<Floor[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Building on a Floor
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignBuilding( floorId, _buildingId ): Observable<any> {

		// get the Floor from storage
		this.loadHelper( floorId );

	// get the Building from storage
	var tmp 	= new BuildingService(this.http).getBuilding(_buildingId);

	// assign the Building
	this.floor.building = tmp;

	// save the Floor
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Building on a Floor
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignBuilding( floorId ): Observable<any> {

		// get the Floor from storage
		this.loadHelper( floorId );

	// assign Building to null
	this.floor.building = null;

	// save the Floor
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more roomsIds as a Rooms
	// to a Floor
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addRooms( floorId, roomsIds ): Observable<any> {

		// get the Floor
		this.loadHelper( floorId );

	// split on a comma with no spaces
	var idList = roomsIds.split(',')

	// iterate over array of rooms ids
	idList.forEach(function (id) {
		// read the Room
		var room = new RoomService(this.http).getRoom(id);
		// add the Room if not already assigned
		if ( this.floor.rooms.indexOf(room) == -1 )
		this.floor.rooms.push(room);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more roomsIds as a Rooms
	// from a Floor
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeRooms( floorId, roomsIds ): Observable<any> {

		// get the Floor
		this.loadHelper( floorId );


	// split on a comma with no spaces
	var idList 					= roomsIds.split(',');
	var rooms 	= this.floor.rooms;

	if ( rooms != null && roomsIds != null ) {

		// iterate over array of rooms ids
		rooms.forEach(function (obj) {
			if ( roomsIds.indexOf(obj._id) > -1 ) {
				// remove the Room
				this.floor.rooms.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a Floor
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/Floor/update/' + this.floor;

	return  this.http.post(uri_, this.floor );
}

	//********************************************************************
	// loadHelper - internal helper to load a Floor
	//********************************************************************	
	loadHelper( id ) {
		this.getFloor(id)
			.subscribe((res : Floor) => {
				this.floor = res;
			});
	}
}