
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Room} from '../models/Room';
import {FloorService} from '../services/Floor.service';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {GatewayService} from '../services/Gateway.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class RoomService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	room : Room;

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
	// add a Room
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addRoom(name, Floor, Devices, Gateways) : Observable<any> {
		const uri_ = this.apiUrl + '/Room/create';
		const obj = {
			      		name: name,
      		Floor: Floor != null && Floor.length > 0 ? Floor : null,
      		Devices: Devices != null && Devices.length > 0 ? Devices : null,
			Gateways: Gateways != null && Gateways.length > 0 ? Gateways : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a Room
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateRoom(name, Floor, Devices, Gateways, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/Room/update/' + id;
		const obj = {
				      		name: name,
      		Floor: Floor != null && Floor.length > 0 ? Floor : null,
      		Devices: Devices != null && Devices.length > 0 ? Devices : null,
			Gateways: Gateways != null && Gateways.length > 0 ? Gateways : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a Room
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteRoom(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/Room/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a Room
	// returns the results untouched as an Observable Room
	// Room model
	// delegates via URI
	//********************************************************************
	getRoom(id) : Observable<Room> {
		const uri_ = this.apiUrl + '/Room/load/' + id;

		return this.http.get<Room>(uri_);
	}
	
	//********************************************************************
	// gets all Room
	// returns the results untouched as JSON representation of an
	// Observable array of Room models
	// delegates via URI
	//********************************************************************
	getRooms() : Observable<Room[]> {
		const uri_ = this.apiUrl + '/Room/';

		return this
			.http.get<Room[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Floor on a Room
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignFloor( roomId, _floorId ): Observable<any> {

		// get the Room from storage
		this.loadHelper( roomId );

	// get the Floor from storage
	var tmp 	= new FloorService(this.http).getFloor(_floorId);

	// assign the Floor
	this.room.floor = tmp;

	// save the Room
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Floor on a Room
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignFloor( roomId ): Observable<any> {

		// get the Room from storage
		this.loadHelper( roomId );

	// assign Floor to null
	this.room.floor = null;

	// save the Room
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more devicesIds as a Devices
	// to a Room
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addDevices( roomId, devicesIds ): Observable<any> {

		// get the Room
		this.loadHelper( roomId );

	// split on a comma with no spaces
	var idList = devicesIds.split(',')

	// iterate over array of devices ids
	idList.forEach(function (id) {
		// read the IoTDevice
		var ioTDevice = new IoTDeviceService(this.http).getIoTDevice(id);
		// add the IoTDevice if not already assigned
		if ( this.room.devices.indexOf(ioTDevice) == -1 )
		this.room.devices.push(ioTDevice);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more devicesIds as a Devices
	// from a Room
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeDevices( roomId, devicesIds ): Observable<any> {

		// get the Room
		this.loadHelper( roomId );


	// split on a comma with no spaces
	var idList 					= devicesIds.split(',');
	var devices 	= this.room.devices;

	if ( devices != null && devicesIds != null ) {

		// iterate over array of devices ids
		devices.forEach(function (obj) {
			if ( devicesIds.indexOf(obj._id) > -1 ) {
				// remove the IoTDevice
				this.room.devices.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more gatewaysIds as a Gateways
	// to a Room
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addGateways( roomId, gatewaysIds ): Observable<any> {

		// get the Room
		this.loadHelper( roomId );

	// split on a comma with no spaces
	var idList = gatewaysIds.split(',')

	// iterate over array of gateways ids
	idList.forEach(function (id) {
		// read the Gateway
		var gateway = new GatewayService(this.http).getGateway(id);
		// add the Gateway if not already assigned
		if ( this.room.gateways.indexOf(gateway) == -1 )
		this.room.gateways.push(gateway);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more gatewaysIds as a Gateways
	// from a Room
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeGateways( roomId, gatewaysIds ): Observable<any> {

		// get the Room
		this.loadHelper( roomId );


	// split on a comma with no spaces
	var idList 					= gatewaysIds.split(',');
	var gateways 	= this.room.gateways;

	if ( gateways != null && gatewaysIds != null ) {

		// iterate over array of gateways ids
		gateways.forEach(function (obj) {
			if ( gatewaysIds.indexOf(obj._id) > -1 ) {
				// remove the Gateway
				this.room.gateways.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a Room
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/Room/update/' + this.room;

	return  this.http.post(uri_, this.room );
}

	//********************************************************************
	// loadHelper - internal helper to load a Room
	//********************************************************************	
	loadHelper( id ) {
		this.getRoom(id)
			.subscribe((res : Room) => {
				this.room = res;
			});
	}
}