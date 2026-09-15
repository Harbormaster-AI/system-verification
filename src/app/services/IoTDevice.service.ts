
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {IoTDevice} from '../models/IoTDevice';
import {DeviceModelService} from '../services/DeviceModel.service';
import {TenantService} from '../services/Tenant.service';
import {SiteService} from '../services/Site.service';
import {RoomService} from '../services/Room.service';
import {GatewayService} from '../services/Gateway.service';
import {SensorInstanceService} from '../services/SensorInstance.service';
import {ActuatorInstanceService} from '../services/ActuatorInstance.service';
import {DeviceCertificateService} from '../services/DeviceCertificate.service';
import {DigitalTwinService} from '../services/DigitalTwin.service';
import {TelemetryStreamService} from '../services/TelemetryStream.service';
import {CommandInvocationService} from '../services/CommandInvocation.service';
import {AlertService} from '../services/Alert.service';
import {ProvisioningRecordService} from '../services/ProvisioningRecord.service';
import {DeviceGroupService} from '../services/DeviceGroup.service';
import {NetworkProfileService} from '../services/NetworkProfile.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class IoTDeviceService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	ioTDevice : IoTDevice;

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
	// add a IoTDevice
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addIoTDevice(deviceId, serialNumber, lastSeen, firmwareVersion, DeviceModel, Tenant, Site, Room, Gateway, Sensors, Actuators, Certificates, DigitalTwin, TelemetryStreams, CommandInvocations, Alerts, ProvisioningRecord, DeviceGroups, NetworkProfiles, Status, PowerSource) : Observable<any> {
		const uri_ = this.apiUrl + '/IoTDevice/create';
		const obj = {
			      		deviceId: deviceId,
      		serialNumber: serialNumber,
      		lastSeen: lastSeen,
      		firmwareVersion: firmwareVersion,
      		DeviceModel: DeviceModel != null && DeviceModel.length > 0 ? DeviceModel : null,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Site: Site != null && Site.length > 0 ? Site : null,
      		Room: Room != null && Room.length > 0 ? Room : null,
      		Gateway: Gateway != null && Gateway.length > 0 ? Gateway : null,
      		Sensors: Sensors != null && Sensors.length > 0 ? Sensors : null,
      		Actuators: Actuators != null && Actuators.length > 0 ? Actuators : null,
      		Certificates: Certificates != null && Certificates.length > 0 ? Certificates : null,
      		DigitalTwin: DigitalTwin != null && DigitalTwin.length > 0 ? DigitalTwin : null,
      		TelemetryStreams: TelemetryStreams != null && TelemetryStreams.length > 0 ? TelemetryStreams : null,
      		CommandInvocations: CommandInvocations != null && CommandInvocations.length > 0 ? CommandInvocations : null,
      		Alerts: Alerts != null && Alerts.length > 0 ? Alerts : null,
      		ProvisioningRecord: ProvisioningRecord != null && ProvisioningRecord.length > 0 ? ProvisioningRecord : null,
      		DeviceGroups: DeviceGroups != null && DeviceGroups.length > 0 ? DeviceGroups : null,
      		NetworkProfiles: NetworkProfiles != null && NetworkProfiles.length > 0 ? NetworkProfiles : null,
      		Status: Status,
			PowerSource: PowerSource
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateIoTDevice(deviceId, serialNumber, lastSeen, firmwareVersion, DeviceModel, Tenant, Site, Room, Gateway, Sensors, Actuators, Certificates, DigitalTwin, TelemetryStreams, CommandInvocations, Alerts, ProvisioningRecord, DeviceGroups, NetworkProfiles, Status, PowerSource, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/IoTDevice/update/' + id;
		const obj = {
				      		deviceId: deviceId,
      		serialNumber: serialNumber,
      		lastSeen: lastSeen,
      		firmwareVersion: firmwareVersion,
      		DeviceModel: DeviceModel != null && DeviceModel.length > 0 ? DeviceModel : null,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Site: Site != null && Site.length > 0 ? Site : null,
      		Room: Room != null && Room.length > 0 ? Room : null,
      		Gateway: Gateway != null && Gateway.length > 0 ? Gateway : null,
      		Sensors: Sensors != null && Sensors.length > 0 ? Sensors : null,
      		Actuators: Actuators != null && Actuators.length > 0 ? Actuators : null,
      		Certificates: Certificates != null && Certificates.length > 0 ? Certificates : null,
      		DigitalTwin: DigitalTwin != null && DigitalTwin.length > 0 ? DigitalTwin : null,
      		TelemetryStreams: TelemetryStreams != null && TelemetryStreams.length > 0 ? TelemetryStreams : null,
      		CommandInvocations: CommandInvocations != null && CommandInvocations.length > 0 ? CommandInvocations : null,
      		Alerts: Alerts != null && Alerts.length > 0 ? Alerts : null,
      		ProvisioningRecord: ProvisioningRecord != null && ProvisioningRecord.length > 0 ? ProvisioningRecord : null,
      		DeviceGroups: DeviceGroups != null && DeviceGroups.length > 0 ? DeviceGroups : null,
      		NetworkProfiles: NetworkProfiles != null && NetworkProfiles.length > 0 ? NetworkProfiles : null,
      		Status: Status,
			PowerSource: PowerSource
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteIoTDevice(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/IoTDevice/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a IoTDevice
	// returns the results untouched as an Observable IoTDevice
	// IoTDevice model
	// delegates via URI
	//********************************************************************
	getIoTDevice(id) : Observable<IoTDevice> {
		const uri_ = this.apiUrl + '/IoTDevice/load/' + id;

		return this.http.get<IoTDevice>(uri_);
	}
	
	//********************************************************************
	// gets all IoTDevice
	// returns the results untouched as JSON representation of an
	// Observable array of IoTDevice models
	// delegates via URI
	//********************************************************************
	getIoTDevices() : Observable<IoTDevice[]> {
		const uri_ = this.apiUrl + '/IoTDevice/';

		return this
			.http.get<IoTDevice[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a DeviceModel on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDeviceModel( ioTDeviceId, _deviceModelId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// get the DeviceModel from storage
	var tmp 	= new DeviceModelService(this.http).getDeviceModel(_deviceModelId);

	// assign the DeviceModel
	this.ioTDevice.deviceModel = tmp;

	// save the IoTDevice
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a DeviceModel on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDeviceModel( ioTDeviceId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// assign DeviceModel to null
	this.ioTDevice.deviceModel = null;

	// save the IoTDevice
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Tenant on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( ioTDeviceId, _tenantId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.ioTDevice.tenant = tmp;

	// save the IoTDevice
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( ioTDeviceId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// assign Tenant to null
	this.ioTDevice.tenant = null;

	// save the IoTDevice
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Site on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignSite( ioTDeviceId, _siteId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// get the Site from storage
	var tmp 	= new SiteService(this.http).getSite(_siteId);

	// assign the Site
	this.ioTDevice.site = tmp;

	// save the IoTDevice
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Site on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignSite( ioTDeviceId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// assign Site to null
	this.ioTDevice.site = null;

	// save the IoTDevice
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Room on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignRoom( ioTDeviceId, _roomId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// get the Room from storage
	var tmp 	= new RoomService(this.http).getRoom(_roomId);

	// assign the Room
	this.ioTDevice.room = tmp;

	// save the IoTDevice
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Room on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignRoom( ioTDeviceId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// assign Room to null
	this.ioTDevice.room = null;

	// save the IoTDevice
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Gateway on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignGateway( ioTDeviceId, _gatewayId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// get the Gateway from storage
	var tmp 	= new GatewayService(this.http).getGateway(_gatewayId);

	// assign the Gateway
	this.ioTDevice.gateway = tmp;

	// save the IoTDevice
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Gateway on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignGateway( ioTDeviceId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// assign Gateway to null
	this.ioTDevice.gateway = null;

	// save the IoTDevice
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a DigitalTwin on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDigitalTwin( ioTDeviceId, _digitalTwinId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// get the DigitalTwin from storage
	var tmp 	= new DigitalTwinService(this.http).getDigitalTwin(_digitalTwinId);

	// assign the DigitalTwin
	this.ioTDevice.digitalTwin = tmp;

	// save the IoTDevice
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a DigitalTwin on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDigitalTwin( ioTDeviceId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// assign DigitalTwin to null
	this.ioTDevice.digitalTwin = null;

	// save the IoTDevice
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a ProvisioningRecord on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignProvisioningRecord( ioTDeviceId, _provisioningRecordId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// get the ProvisioningRecord from storage
	var tmp 	= new ProvisioningRecordService(this.http).getProvisioningRecord(_provisioningRecordId);

	// assign the ProvisioningRecord
	this.ioTDevice.provisioningRecord = tmp;

	// save the IoTDevice
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a ProvisioningRecord on a IoTDevice
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignProvisioningRecord( ioTDeviceId ): Observable<any> {

		// get the IoTDevice from storage
		this.loadHelper( ioTDeviceId );

	// assign ProvisioningRecord to null
	this.ioTDevice.provisioningRecord = null;

	// save the IoTDevice
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more sensorsIds as a Sensors
	// to a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addSensors( ioTDeviceId, sensorsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );

	// split on a comma with no spaces
	var idList = sensorsIds.split(',')

	// iterate over array of sensors ids
	idList.forEach(function (id) {
		// read the SensorInstance
		var sensorInstance = new SensorInstanceService(this.http).getSensorInstance(id);
		// add the SensorInstance if not already assigned
		if ( this.ioTDevice.sensors.indexOf(sensorInstance) == -1 )
		this.ioTDevice.sensors.push(sensorInstance);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more sensorsIds as a Sensors
	// from a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeSensors( ioTDeviceId, sensorsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );


	// split on a comma with no spaces
	var idList 					= sensorsIds.split(',');
	var sensors 	= this.ioTDevice.sensors;

	if ( sensors != null && sensorsIds != null ) {

		// iterate over array of sensors ids
		sensors.forEach(function (obj) {
			if ( sensorsIds.indexOf(obj._id) > -1 ) {
				// remove the SensorInstance
				this.ioTDevice.sensors.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more actuatorsIds as a Actuators
	// to a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addActuators( ioTDeviceId, actuatorsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );

	// split on a comma with no spaces
	var idList = actuatorsIds.split(',')

	// iterate over array of actuators ids
	idList.forEach(function (id) {
		// read the ActuatorInstance
		var actuatorInstance = new ActuatorInstanceService(this.http).getActuatorInstance(id);
		// add the ActuatorInstance if not already assigned
		if ( this.ioTDevice.actuators.indexOf(actuatorInstance) == -1 )
		this.ioTDevice.actuators.push(actuatorInstance);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more actuatorsIds as a Actuators
	// from a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeActuators( ioTDeviceId, actuatorsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );


	// split on a comma with no spaces
	var idList 					= actuatorsIds.split(',');
	var actuators 	= this.ioTDevice.actuators;

	if ( actuators != null && actuatorsIds != null ) {

		// iterate over array of actuators ids
		actuators.forEach(function (obj) {
			if ( actuatorsIds.indexOf(obj._id) > -1 ) {
				// remove the ActuatorInstance
				this.ioTDevice.actuators.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more certificatesIds as a Certificates
	// to a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addCertificates( ioTDeviceId, certificatesIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );

	// split on a comma with no spaces
	var idList = certificatesIds.split(',')

	// iterate over array of certificates ids
	idList.forEach(function (id) {
		// read the DeviceCertificate
		var deviceCertificate = new DeviceCertificateService(this.http).getDeviceCertificate(id);
		// add the DeviceCertificate if not already assigned
		if ( this.ioTDevice.certificates.indexOf(deviceCertificate) == -1 )
		this.ioTDevice.certificates.push(deviceCertificate);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more certificatesIds as a Certificates
	// from a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeCertificates( ioTDeviceId, certificatesIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );


	// split on a comma with no spaces
	var idList 					= certificatesIds.split(',');
	var certificates 	= this.ioTDevice.certificates;

	if ( certificates != null && certificatesIds != null ) {

		// iterate over array of certificates ids
		certificates.forEach(function (obj) {
			if ( certificatesIds.indexOf(obj._id) > -1 ) {
				// remove the DeviceCertificate
				this.ioTDevice.certificates.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more telemetryStreamsIds as a TelemetryStreams
	// to a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addTelemetryStreams( ioTDeviceId, telemetryStreamsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );

	// split on a comma with no spaces
	var idList = telemetryStreamsIds.split(',')

	// iterate over array of telemetryStreams ids
	idList.forEach(function (id) {
		// read the TelemetryStream
		var telemetryStream = new TelemetryStreamService(this.http).getTelemetryStream(id);
		// add the TelemetryStream if not already assigned
		if ( this.ioTDevice.telemetryStreams.indexOf(telemetryStream) == -1 )
		this.ioTDevice.telemetryStreams.push(telemetryStream);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more telemetryStreamsIds as a TelemetryStreams
	// from a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeTelemetryStreams( ioTDeviceId, telemetryStreamsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );


	// split on a comma with no spaces
	var idList 					= telemetryStreamsIds.split(',');
	var telemetryStreams 	= this.ioTDevice.telemetryStreams;

	if ( telemetryStreams != null && telemetryStreamsIds != null ) {

		// iterate over array of telemetryStreams ids
		telemetryStreams.forEach(function (obj) {
			if ( telemetryStreamsIds.indexOf(obj._id) > -1 ) {
				// remove the TelemetryStream
				this.ioTDevice.telemetryStreams.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more commandInvocationsIds as a CommandInvocations
	// to a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addCommandInvocations( ioTDeviceId, commandInvocationsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );

	// split on a comma with no spaces
	var idList = commandInvocationsIds.split(',')

	// iterate over array of commandInvocations ids
	idList.forEach(function (id) {
		// read the CommandInvocation
		var commandInvocation = new CommandInvocationService(this.http).getCommandInvocation(id);
		// add the CommandInvocation if not already assigned
		if ( this.ioTDevice.commandInvocations.indexOf(commandInvocation) == -1 )
		this.ioTDevice.commandInvocations.push(commandInvocation);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more commandInvocationsIds as a CommandInvocations
	// from a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeCommandInvocations( ioTDeviceId, commandInvocationsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );


	// split on a comma with no spaces
	var idList 					= commandInvocationsIds.split(',');
	var commandInvocations 	= this.ioTDevice.commandInvocations;

	if ( commandInvocations != null && commandInvocationsIds != null ) {

		// iterate over array of commandInvocations ids
		commandInvocations.forEach(function (obj) {
			if ( commandInvocationsIds.indexOf(obj._id) > -1 ) {
				// remove the CommandInvocation
				this.ioTDevice.commandInvocations.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more alertsIds as a Alerts
	// to a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addAlerts( ioTDeviceId, alertsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );

	// split on a comma with no spaces
	var idList = alertsIds.split(',')

	// iterate over array of alerts ids
	idList.forEach(function (id) {
		// read the Alert
		var alert = new AlertService(this.http).getAlert(id);
		// add the Alert if not already assigned
		if ( this.ioTDevice.alerts.indexOf(alert) == -1 )
		this.ioTDevice.alerts.push(alert);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more alertsIds as a Alerts
	// from a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeAlerts( ioTDeviceId, alertsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );


	// split on a comma with no spaces
	var idList 					= alertsIds.split(',');
	var alerts 	= this.ioTDevice.alerts;

	if ( alerts != null && alertsIds != null ) {

		// iterate over array of alerts ids
		alerts.forEach(function (obj) {
			if ( alertsIds.indexOf(obj._id) > -1 ) {
				// remove the Alert
				this.ioTDevice.alerts.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more deviceGroupsIds as a DeviceGroups
	// to a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addDeviceGroups( ioTDeviceId, deviceGroupsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );

	// split on a comma with no spaces
	var idList = deviceGroupsIds.split(',')

	// iterate over array of deviceGroups ids
	idList.forEach(function (id) {
		// read the DeviceGroup
		var deviceGroup = new DeviceGroupService(this.http).getDeviceGroup(id);
		// add the DeviceGroup if not already assigned
		if ( this.ioTDevice.deviceGroups.indexOf(deviceGroup) == -1 )
		this.ioTDevice.deviceGroups.push(deviceGroup);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more deviceGroupsIds as a DeviceGroups
	// from a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeDeviceGroups( ioTDeviceId, deviceGroupsIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );


	// split on a comma with no spaces
	var idList 					= deviceGroupsIds.split(',');
	var deviceGroups 	= this.ioTDevice.deviceGroups;

	if ( deviceGroups != null && deviceGroupsIds != null ) {

		// iterate over array of deviceGroups ids
		deviceGroups.forEach(function (obj) {
			if ( deviceGroupsIds.indexOf(obj._id) > -1 ) {
				// remove the DeviceGroup
				this.ioTDevice.deviceGroups.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more networkProfilesIds as a NetworkProfiles
	// to a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addNetworkProfiles( ioTDeviceId, networkProfilesIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );

	// split on a comma with no spaces
	var idList = networkProfilesIds.split(',')

	// iterate over array of networkProfiles ids
	idList.forEach(function (id) {
		// read the NetworkProfile
		var networkProfile = new NetworkProfileService(this.http).getNetworkProfile(id);
		// add the NetworkProfile if not already assigned
		if ( this.ioTDevice.networkProfiles.indexOf(networkProfile) == -1 )
		this.ioTDevice.networkProfiles.push(networkProfile);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more networkProfilesIds as a NetworkProfiles
	// from a IoTDevice
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeNetworkProfiles( ioTDeviceId, networkProfilesIds ): Observable<any> {

		// get the IoTDevice
		this.loadHelper( ioTDeviceId );


	// split on a comma with no spaces
	var idList 					= networkProfilesIds.split(',');
	var networkProfiles 	= this.ioTDevice.networkProfiles;

	if ( networkProfiles != null && networkProfilesIds != null ) {

		// iterate over array of networkProfiles ids
		networkProfiles.forEach(function (obj) {
			if ( networkProfilesIds.indexOf(obj._id) > -1 ) {
				// remove the NetworkProfile
				this.ioTDevice.networkProfiles.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a IoTDevice
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/IoTDevice/update/' + this.ioTDevice;

	return  this.http.post(uri_, this.ioTDevice );
}

	//********************************************************************
	// loadHelper - internal helper to load a IoTDevice
	//********************************************************************	
	loadHelper( id ) {
		this.getIoTDevice(id)
			.subscribe((res : IoTDevice) => {
				this.ioTDevice = res;
			});
	}
}