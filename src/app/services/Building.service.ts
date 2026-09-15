
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Building} from '../models/Building';
import {SiteService} from '../services/Site.service';
import {FloorService} from '../services/Floor.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class BuildingService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	building : Building;

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
	// add a Building
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addBuilding(name, Site, Floors) : Observable<any> {
		const uri_ = this.apiUrl + '/Building/create';
		const obj = {
			      		name: name,
      		Site: Site != null && Site.length > 0 ? Site : null,
			Floors: Floors != null && Floors.length > 0 ? Floors : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a Building
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateBuilding(name, Site, Floors, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/Building/update/' + id;
		const obj = {
				      		name: name,
      		Site: Site != null && Site.length > 0 ? Site : null,
			Floors: Floors != null && Floors.length > 0 ? Floors : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a Building
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteBuilding(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/Building/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a Building
	// returns the results untouched as an Observable Building
	// Building model
	// delegates via URI
	//********************************************************************
	getBuilding(id) : Observable<Building> {
		const uri_ = this.apiUrl + '/Building/load/' + id;

		return this.http.get<Building>(uri_);
	}
	
	//********************************************************************
	// gets all Building
	// returns the results untouched as JSON representation of an
	// Observable array of Building models
	// delegates via URI
	//********************************************************************
	getBuildings() : Observable<Building[]> {
		const uri_ = this.apiUrl + '/Building/';

		return this
			.http.get<Building[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Site on a Building
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignSite( buildingId, _siteId ): Observable<any> {

		// get the Building from storage
		this.loadHelper( buildingId );

	// get the Site from storage
	var tmp 	= new SiteService(this.http).getSite(_siteId);

	// assign the Site
	this.building.site = tmp;

	// save the Building
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Site on a Building
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignSite( buildingId ): Observable<any> {

		// get the Building from storage
		this.loadHelper( buildingId );

	// assign Site to null
	this.building.site = null;

	// save the Building
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more floorsIds as a Floors
	// to a Building
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addFloors( buildingId, floorsIds ): Observable<any> {

		// get the Building
		this.loadHelper( buildingId );

	// split on a comma with no spaces
	var idList = floorsIds.split(',')

	// iterate over array of floors ids
	idList.forEach(function (id) {
		// read the Floor
		var floor = new FloorService(this.http).getFloor(id);
		// add the Floor if not already assigned
		if ( this.building.floors.indexOf(floor) == -1 )
		this.building.floors.push(floor);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more floorsIds as a Floors
	// from a Building
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeFloors( buildingId, floorsIds ): Observable<any> {

		// get the Building
		this.loadHelper( buildingId );


	// split on a comma with no spaces
	var idList 					= floorsIds.split(',');
	var floors 	= this.building.floors;

	if ( floors != null && floorsIds != null ) {

		// iterate over array of floors ids
		floors.forEach(function (obj) {
			if ( floorsIds.indexOf(obj._id) > -1 ) {
				// remove the Floor
				this.building.floors.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a Building
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/Building/update/' + this.building;

	return  this.http.post(uri_, this.building );
}

	//********************************************************************
	// loadHelper - internal helper to load a Building
	//********************************************************************	
	loadHelper( id ) {
		this.getBuilding(id)
			.subscribe((res : Building) => {
				this.building = res;
			});
	}
}