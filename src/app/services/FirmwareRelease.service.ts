
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {FirmwareRelease} from '../models/FirmwareRelease';
import {DeviceModelService} from '../services/DeviceModel.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class FirmwareReleaseService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	firmwareRelease : FirmwareRelease;

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
	// add a FirmwareRelease
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addFirmwareRelease(version, releaseDate, releaseNotes, checksum, DeviceModel) : Observable<any> {
		const uri_ = this.apiUrl + '/FirmwareRelease/create';
		const obj = {
			      		version: version,
      		releaseDate: releaseDate,
      		releaseNotes: releaseNotes,
      		checksum: checksum,
			DeviceModel: DeviceModel != null && DeviceModel.length > 0 ? DeviceModel : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a FirmwareRelease
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateFirmwareRelease(version, releaseDate, releaseNotes, checksum, DeviceModel, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/FirmwareRelease/update/' + id;
		const obj = {
				      		version: version,
      		releaseDate: releaseDate,
      		releaseNotes: releaseNotes,
      		checksum: checksum,
			DeviceModel: DeviceModel != null && DeviceModel.length > 0 ? DeviceModel : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a FirmwareRelease
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteFirmwareRelease(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/FirmwareRelease/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a FirmwareRelease
	// returns the results untouched as an Observable FirmwareRelease
	// FirmwareRelease model
	// delegates via URI
	//********************************************************************
	getFirmwareRelease(id) : Observable<FirmwareRelease> {
		const uri_ = this.apiUrl + '/FirmwareRelease/load/' + id;

		return this.http.get<FirmwareRelease>(uri_);
	}
	
	//********************************************************************
	// gets all FirmwareRelease
	// returns the results untouched as JSON representation of an
	// Observable array of FirmwareRelease models
	// delegates via URI
	//********************************************************************
	getFirmwareReleases() : Observable<FirmwareRelease[]> {
		const uri_ = this.apiUrl + '/FirmwareRelease/';

		return this
			.http.get<FirmwareRelease[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a DeviceModel on a FirmwareRelease
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDeviceModel( firmwareReleaseId, _deviceModelId ): Observable<any> {

		// get the FirmwareRelease from storage
		this.loadHelper( firmwareReleaseId );

	// get the DeviceModel from storage
	var tmp 	= new DeviceModelService(this.http).getDeviceModel(_deviceModelId);

	// assign the DeviceModel
	this.firmwareRelease.deviceModel = tmp;

	// save the FirmwareRelease
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a DeviceModel on a FirmwareRelease
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDeviceModel( firmwareReleaseId ): Observable<any> {

		// get the FirmwareRelease from storage
		this.loadHelper( firmwareReleaseId );

	// assign DeviceModel to null
	this.firmwareRelease.deviceModel = null;

	// save the FirmwareRelease
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a FirmwareRelease
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/FirmwareRelease/update/' + this.firmwareRelease;

	return  this.http.post(uri_, this.firmwareRelease );
}

	//********************************************************************
	// loadHelper - internal helper to load a FirmwareRelease
	//********************************************************************	
	loadHelper( id ) {
		this.getFirmwareRelease(id)
			.subscribe((res : FirmwareRelease) => {
				this.firmwareRelease = res;
			});
	}
}