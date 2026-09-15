
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Tenant} from '../models/Tenant';
import {SiteService} from '../services/Site.service';
import {TenantUserService} from '../services/TenantUser.service';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {DataRetentionPolicyService} from '../services/DataRetentionPolicy.service';
import {ConnectivityPlanService} from '../services/ConnectivityPlan.service';
import {SimCardService} from '../services/SimCard.service';
import {MessagingEndpointService} from '../services/MessagingEndpoint.service';
import {AccessPolicyService} from '../services/AccessPolicy.service';
import {DeviceGroupService} from '../services/DeviceGroup.service';
import {AlertRuleService} from '../services/AlertRule.service';
import {MaintenanceTicketService} from '../services/MaintenanceTicket.service';
import {UsageRecordService} from '../services/UsageRecord.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class TenantService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	tenant : Tenant;

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
	// add a Tenant
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addTenant(name, Sites, Users, Devices, DataRetentionPolicies, ConnectivityPlans, SimCards, MessagingEndpoints, AccessPolicies, DeviceGroups, AlertRules, MaintenanceTickets, UsageRecords, TenantType) : Observable<any> {
		const uri_ = this.apiUrl + '/Tenant/create';
		const obj = {
			      		name: name,
      		Sites: Sites != null && Sites.length > 0 ? Sites : null,
      		Users: Users != null && Users.length > 0 ? Users : null,
      		Devices: Devices != null && Devices.length > 0 ? Devices : null,
      		DataRetentionPolicies: DataRetentionPolicies != null && DataRetentionPolicies.length > 0 ? DataRetentionPolicies : null,
      		ConnectivityPlans: ConnectivityPlans != null && ConnectivityPlans.length > 0 ? ConnectivityPlans : null,
      		SimCards: SimCards != null && SimCards.length > 0 ? SimCards : null,
      		MessagingEndpoints: MessagingEndpoints != null && MessagingEndpoints.length > 0 ? MessagingEndpoints : null,
      		AccessPolicies: AccessPolicies != null && AccessPolicies.length > 0 ? AccessPolicies : null,
      		DeviceGroups: DeviceGroups != null && DeviceGroups.length > 0 ? DeviceGroups : null,
      		AlertRules: AlertRules != null && AlertRules.length > 0 ? AlertRules : null,
      		MaintenanceTickets: MaintenanceTickets != null && MaintenanceTickets.length > 0 ? MaintenanceTickets : null,
      		UsageRecords: UsageRecords != null && UsageRecords.length > 0 ? UsageRecords : null,
			TenantType: TenantType
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a Tenant
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateTenant(name, Sites, Users, Devices, DataRetentionPolicies, ConnectivityPlans, SimCards, MessagingEndpoints, AccessPolicies, DeviceGroups, AlertRules, MaintenanceTickets, UsageRecords, TenantType, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/Tenant/update/' + id;
		const obj = {
				      		name: name,
      		Sites: Sites != null && Sites.length > 0 ? Sites : null,
      		Users: Users != null && Users.length > 0 ? Users : null,
      		Devices: Devices != null && Devices.length > 0 ? Devices : null,
      		DataRetentionPolicies: DataRetentionPolicies != null && DataRetentionPolicies.length > 0 ? DataRetentionPolicies : null,
      		ConnectivityPlans: ConnectivityPlans != null && ConnectivityPlans.length > 0 ? ConnectivityPlans : null,
      		SimCards: SimCards != null && SimCards.length > 0 ? SimCards : null,
      		MessagingEndpoints: MessagingEndpoints != null && MessagingEndpoints.length > 0 ? MessagingEndpoints : null,
      		AccessPolicies: AccessPolicies != null && AccessPolicies.length > 0 ? AccessPolicies : null,
      		DeviceGroups: DeviceGroups != null && DeviceGroups.length > 0 ? DeviceGroups : null,
      		AlertRules: AlertRules != null && AlertRules.length > 0 ? AlertRules : null,
      		MaintenanceTickets: MaintenanceTickets != null && MaintenanceTickets.length > 0 ? MaintenanceTickets : null,
      		UsageRecords: UsageRecords != null && UsageRecords.length > 0 ? UsageRecords : null,
			TenantType: TenantType
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a Tenant
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteTenant(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/Tenant/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a Tenant
	// returns the results untouched as an Observable Tenant
	// Tenant model
	// delegates via URI
	//********************************************************************
	getTenant(id) : Observable<Tenant> {
		const uri_ = this.apiUrl + '/Tenant/load/' + id;

		return this.http.get<Tenant>(uri_);
	}
	
	//********************************************************************
	// gets all Tenant
	// returns the results untouched as JSON representation of an
	// Observable array of Tenant models
	// delegates via URI
	//********************************************************************
	getTenants() : Observable<Tenant[]> {
		const uri_ = this.apiUrl + '/Tenant/';

		return this
			.http.get<Tenant[]>(uri_);
	}
	
		
		//********************************************************************
	// adds one or more sitesIds as a Sites
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addSites( tenantId, sitesIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = sitesIds.split(',')

	// iterate over array of sites ids
	idList.forEach(function (id) {
		// read the Site
		var site = new SiteService(this.http).getSite(id);
		// add the Site if not already assigned
		if ( this.tenant.sites.indexOf(site) == -1 )
		this.tenant.sites.push(site);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more sitesIds as a Sites
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeSites( tenantId, sitesIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= sitesIds.split(',');
	var sites 	= this.tenant.sites;

	if ( sites != null && sitesIds != null ) {

		// iterate over array of sites ids
		sites.forEach(function (obj) {
			if ( sitesIds.indexOf(obj._id) > -1 ) {
				// remove the Site
				this.tenant.sites.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more usersIds as a Users
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addUsers( tenantId, usersIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = usersIds.split(',')

	// iterate over array of users ids
	idList.forEach(function (id) {
		// read the TenantUser
		var tenantUser = new TenantUserService(this.http).getTenantUser(id);
		// add the TenantUser if not already assigned
		if ( this.tenant.users.indexOf(tenantUser) == -1 )
		this.tenant.users.push(tenantUser);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more usersIds as a Users
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeUsers( tenantId, usersIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= usersIds.split(',');
	var users 	= this.tenant.users;

	if ( users != null && usersIds != null ) {

		// iterate over array of users ids
		users.forEach(function (obj) {
			if ( usersIds.indexOf(obj._id) > -1 ) {
				// remove the TenantUser
				this.tenant.users.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more devicesIds as a Devices
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addDevices( tenantId, devicesIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = devicesIds.split(',')

	// iterate over array of devices ids
	idList.forEach(function (id) {
		// read the IoTDevice
		var ioTDevice = new IoTDeviceService(this.http).getIoTDevice(id);
		// add the IoTDevice if not already assigned
		if ( this.tenant.devices.indexOf(ioTDevice) == -1 )
		this.tenant.devices.push(ioTDevice);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more devicesIds as a Devices
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeDevices( tenantId, devicesIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= devicesIds.split(',');
	var devices 	= this.tenant.devices;

	if ( devices != null && devicesIds != null ) {

		// iterate over array of devices ids
		devices.forEach(function (obj) {
			if ( devicesIds.indexOf(obj._id) > -1 ) {
				// remove the IoTDevice
				this.tenant.devices.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more dataRetentionPoliciesIds as a DataRetentionPolicies
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addDataRetentionPolicies( tenantId, dataRetentionPoliciesIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = dataRetentionPoliciesIds.split(',')

	// iterate over array of dataRetentionPolicies ids
	idList.forEach(function (id) {
		// read the DataRetentionPolicy
		var dataRetentionPolicy = new DataRetentionPolicyService(this.http).getDataRetentionPolicy(id);
		// add the DataRetentionPolicy if not already assigned
		if ( this.tenant.dataRetentionPolicies.indexOf(dataRetentionPolicy) == -1 )
		this.tenant.dataRetentionPolicies.push(dataRetentionPolicy);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more dataRetentionPoliciesIds as a DataRetentionPolicies
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeDataRetentionPolicies( tenantId, dataRetentionPoliciesIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= dataRetentionPoliciesIds.split(',');
	var dataRetentionPolicies 	= this.tenant.dataRetentionPolicies;

	if ( dataRetentionPolicies != null && dataRetentionPoliciesIds != null ) {

		// iterate over array of dataRetentionPolicies ids
		dataRetentionPolicies.forEach(function (obj) {
			if ( dataRetentionPoliciesIds.indexOf(obj._id) > -1 ) {
				// remove the DataRetentionPolicy
				this.tenant.dataRetentionPolicies.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more connectivityPlansIds as a ConnectivityPlans
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addConnectivityPlans( tenantId, connectivityPlansIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = connectivityPlansIds.split(',')

	// iterate over array of connectivityPlans ids
	idList.forEach(function (id) {
		// read the ConnectivityPlan
		var connectivityPlan = new ConnectivityPlanService(this.http).getConnectivityPlan(id);
		// add the ConnectivityPlan if not already assigned
		if ( this.tenant.connectivityPlans.indexOf(connectivityPlan) == -1 )
		this.tenant.connectivityPlans.push(connectivityPlan);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more connectivityPlansIds as a ConnectivityPlans
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeConnectivityPlans( tenantId, connectivityPlansIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= connectivityPlansIds.split(',');
	var connectivityPlans 	= this.tenant.connectivityPlans;

	if ( connectivityPlans != null && connectivityPlansIds != null ) {

		// iterate over array of connectivityPlans ids
		connectivityPlans.forEach(function (obj) {
			if ( connectivityPlansIds.indexOf(obj._id) > -1 ) {
				// remove the ConnectivityPlan
				this.tenant.connectivityPlans.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more simCardsIds as a SimCards
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addSimCards( tenantId, simCardsIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = simCardsIds.split(',')

	// iterate over array of simCards ids
	idList.forEach(function (id) {
		// read the SimCard
		var simCard = new SimCardService(this.http).getSimCard(id);
		// add the SimCard if not already assigned
		if ( this.tenant.simCards.indexOf(simCard) == -1 )
		this.tenant.simCards.push(simCard);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more simCardsIds as a SimCards
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeSimCards( tenantId, simCardsIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= simCardsIds.split(',');
	var simCards 	= this.tenant.simCards;

	if ( simCards != null && simCardsIds != null ) {

		// iterate over array of simCards ids
		simCards.forEach(function (obj) {
			if ( simCardsIds.indexOf(obj._id) > -1 ) {
				// remove the SimCard
				this.tenant.simCards.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more messagingEndpointsIds as a MessagingEndpoints
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addMessagingEndpoints( tenantId, messagingEndpointsIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = messagingEndpointsIds.split(',')

	// iterate over array of messagingEndpoints ids
	idList.forEach(function (id) {
		// read the MessagingEndpoint
		var messagingEndpoint = new MessagingEndpointService(this.http).getMessagingEndpoint(id);
		// add the MessagingEndpoint if not already assigned
		if ( this.tenant.messagingEndpoints.indexOf(messagingEndpoint) == -1 )
		this.tenant.messagingEndpoints.push(messagingEndpoint);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more messagingEndpointsIds as a MessagingEndpoints
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeMessagingEndpoints( tenantId, messagingEndpointsIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= messagingEndpointsIds.split(',');
	var messagingEndpoints 	= this.tenant.messagingEndpoints;

	if ( messagingEndpoints != null && messagingEndpointsIds != null ) {

		// iterate over array of messagingEndpoints ids
		messagingEndpoints.forEach(function (obj) {
			if ( messagingEndpointsIds.indexOf(obj._id) > -1 ) {
				// remove the MessagingEndpoint
				this.tenant.messagingEndpoints.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more accessPoliciesIds as a AccessPolicies
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addAccessPolicies( tenantId, accessPoliciesIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = accessPoliciesIds.split(',')

	// iterate over array of accessPolicies ids
	idList.forEach(function (id) {
		// read the AccessPolicy
		var accessPolicy = new AccessPolicyService(this.http).getAccessPolicy(id);
		// add the AccessPolicy if not already assigned
		if ( this.tenant.accessPolicies.indexOf(accessPolicy) == -1 )
		this.tenant.accessPolicies.push(accessPolicy);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more accessPoliciesIds as a AccessPolicies
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeAccessPolicies( tenantId, accessPoliciesIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= accessPoliciesIds.split(',');
	var accessPolicies 	= this.tenant.accessPolicies;

	if ( accessPolicies != null && accessPoliciesIds != null ) {

		// iterate over array of accessPolicies ids
		accessPolicies.forEach(function (obj) {
			if ( accessPoliciesIds.indexOf(obj._id) > -1 ) {
				// remove the AccessPolicy
				this.tenant.accessPolicies.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more deviceGroupsIds as a DeviceGroups
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addDeviceGroups( tenantId, deviceGroupsIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = deviceGroupsIds.split(',')

	// iterate over array of deviceGroups ids
	idList.forEach(function (id) {
		// read the DeviceGroup
		var deviceGroup = new DeviceGroupService(this.http).getDeviceGroup(id);
		// add the DeviceGroup if not already assigned
		if ( this.tenant.deviceGroups.indexOf(deviceGroup) == -1 )
		this.tenant.deviceGroups.push(deviceGroup);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more deviceGroupsIds as a DeviceGroups
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeDeviceGroups( tenantId, deviceGroupsIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= deviceGroupsIds.split(',');
	var deviceGroups 	= this.tenant.deviceGroups;

	if ( deviceGroups != null && deviceGroupsIds != null ) {

		// iterate over array of deviceGroups ids
		deviceGroups.forEach(function (obj) {
			if ( deviceGroupsIds.indexOf(obj._id) > -1 ) {
				// remove the DeviceGroup
				this.tenant.deviceGroups.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more alertRulesIds as a AlertRules
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addAlertRules( tenantId, alertRulesIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = alertRulesIds.split(',')

	// iterate over array of alertRules ids
	idList.forEach(function (id) {
		// read the AlertRule
		var alertRule = new AlertRuleService(this.http).getAlertRule(id);
		// add the AlertRule if not already assigned
		if ( this.tenant.alertRules.indexOf(alertRule) == -1 )
		this.tenant.alertRules.push(alertRule);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more alertRulesIds as a AlertRules
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeAlertRules( tenantId, alertRulesIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= alertRulesIds.split(',');
	var alertRules 	= this.tenant.alertRules;

	if ( alertRules != null && alertRulesIds != null ) {

		// iterate over array of alertRules ids
		alertRules.forEach(function (obj) {
			if ( alertRulesIds.indexOf(obj._id) > -1 ) {
				// remove the AlertRule
				this.tenant.alertRules.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more maintenanceTicketsIds as a MaintenanceTickets
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addMaintenanceTickets( tenantId, maintenanceTicketsIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = maintenanceTicketsIds.split(',')

	// iterate over array of maintenanceTickets ids
	idList.forEach(function (id) {
		// read the MaintenanceTicket
		var maintenanceTicket = new MaintenanceTicketService(this.http).getMaintenanceTicket(id);
		// add the MaintenanceTicket if not already assigned
		if ( this.tenant.maintenanceTickets.indexOf(maintenanceTicket) == -1 )
		this.tenant.maintenanceTickets.push(maintenanceTicket);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more maintenanceTicketsIds as a MaintenanceTickets
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeMaintenanceTickets( tenantId, maintenanceTicketsIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= maintenanceTicketsIds.split(',');
	var maintenanceTickets 	= this.tenant.maintenanceTickets;

	if ( maintenanceTickets != null && maintenanceTicketsIds != null ) {

		// iterate over array of maintenanceTickets ids
		maintenanceTickets.forEach(function (obj) {
			if ( maintenanceTicketsIds.indexOf(obj._id) > -1 ) {
				// remove the MaintenanceTicket
				this.tenant.maintenanceTickets.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

		//********************************************************************
	// adds one or more usageRecordsIds as a UsageRecords
	// to a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addUsageRecords( tenantId, usageRecordsIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );

	// split on a comma with no spaces
	var idList = usageRecordsIds.split(',')

	// iterate over array of usageRecords ids
	idList.forEach(function (id) {
		// read the UsageRecord
		var usageRecord = new UsageRecordService(this.http).getUsageRecord(id);
		// add the UsageRecord if not already assigned
		if ( this.tenant.usageRecords.indexOf(usageRecord) == -1 )
		this.tenant.usageRecords.push(usageRecord);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more usageRecordsIds as a UsageRecords
	// from a Tenant
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeUsageRecords( tenantId, usageRecordsIds ): Observable<any> {

		// get the Tenant
		this.loadHelper( tenantId );


	// split on a comma with no spaces
	var idList 					= usageRecordsIds.split(',');
	var usageRecords 	= this.tenant.usageRecords;

	if ( usageRecords != null && usageRecordsIds != null ) {

		// iterate over array of usageRecords ids
		usageRecords.forEach(function (obj) {
			if ( usageRecordsIds.indexOf(obj._id) > -1 ) {
				// remove the UsageRecord
				this.tenant.usageRecords.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a Tenant
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/Tenant/update/' + this.tenant;

	return  this.http.post(uri_, this.tenant );
}

	//********************************************************************
	// loadHelper - internal helper to load a Tenant
	//********************************************************************	
	loadHelper( id ) {
		this.getTenant(id)
			.subscribe((res : Tenant) => {
				this.tenant = res;
			});
	}
}